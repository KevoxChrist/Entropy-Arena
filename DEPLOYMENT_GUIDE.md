# Full-Stack AWS Deployment Guide
## Amplify (Frontend) + EC2 (Backend) + API Gateway (HTTPS)

A general guide for deploying any full-stack JavaScript application where the frontend is static and the backend needs a server.

---

## When To Use This Setup

Use this when you have:
- A frontend framework (React, Vue, Svelte, etc.) that builds to static files
- A backend server (Express, Fastify, etc.) that needs to run continuously
- API calls from frontend to backend

**Key insight**: Amplify only hosts static files. It does NOT run your backend server. You need a separate server (EC2) for that.

---

## Architecture

```
[Browser] → [Amplify - HTTPS] → [API Gateway - HTTPS] → [EC2 - HTTP] → [Database]
     │              │                    │                   │
   User        Static files         Converts to         Your Node.js
              (HTML/JS/CSS)          HTTPS               server
```

---

## Step 1: Prepare Your Frontend Code

Your frontend needs to call different URLs in development vs production.

### 1.1 Create an API config file

```javascript
// client/config/api.js (or wherever makes sense for your project)

// Vite uses import.meta.env, Create React App uses process.env.REACT_APP_
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default API_BASE_URL;
```

### 1.2 Update your API calls

Before:
```javascript
fetch('http://localhost:5000/api/users')
```

After:
```javascript
import API_BASE_URL from './config/api';
fetch(`${API_BASE_URL}/api/users`)
```

### 1.3 Create environment files

`.env.development`:
```
VITE_API_BASE_URL=
```
(Empty string - uses your dev proxy)

`.env.production`:
```
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com
```

### 1.4 Add to .gitignore

```
.env.development
.env.production
```

### 1.5 Set up dev proxy (Vite example)

```javascript
// vite.config.js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Your backend port
        changeOrigin: true,
      }
    }
  }
});
```

---

## Step 2: Prepare Your Backend Code

### 2.1 Configure CORS

```javascript
import cors from 'cors';

app.use(cors({
    origin: function(origin, callback) {
        // Allow all origins for simplicity, or whitelist specific domains
        callback(null, true);
    },
    credentials: true
}));
```

### 2.2 Add a test route

```javascript
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});
```

---

## Step 3: Set Up EC2

### 3.1 Create instance

1. AWS Console → EC2 → Launch Instance
2. Choose Amazon Linux 2023 (free tier eligible)
3. Instance type: t2.micro (free tier)
4. Create/select a key pair (download the .pem file)
5. Security group - Add these inbound rules:
   - SSH (22): "My IP" (more secure) or "Anywhere" (0.0.0.0/0)
   - Custom TCP (5000): "Anywhere" (0.0.0.0/0) - your API needs to be public
   - HTTP (80): "Anywhere" (optional)
   - HTTPS (443): "Anywhere" (optional)

### 3.2 Connect via SSH

```bash
chmod 400 ~/Downloads/your-key.pem
ssh -i ~/Downloads/your-key.pem ec2-user@your-ec2-public-dns
```

### 3.3 Install Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### 3.4 Clone your project

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

### 3.5 Set up PM2 (keeps server running)

```bash
npm install -g pm2
pm2 start server/server.js --name my-app
pm2 save
pm2 startup  # Run the command it outputs
```

### 3.6 Test it

Visit: `http://your-ec2-url:5000/api/test`

---

## Step 4: Set Up API Gateway

**Why?** Amplify is HTTPS. EC2 is HTTP. Browsers block HTTP requests from HTTPS pages ("mixed content"). API Gateway gives you an HTTPS URL.

### 4.1 Create HTTP API

1. AWS Console → API Gateway → Create API
2. Choose **HTTP API** → Build
3. Name it, click Next through all steps, Create

### 4.2 Add catch-all route

1. Routes → Create
2. Method: **ANY**
3. Path: `/{proxy+}`

### 4.3 Add integration

1. Click the route → Create and attach integration
2. Type: **HTTP URI**
3. URL: `http://your-ec2-url:5000/{proxy}`

### 4.4 Get your HTTPS URL

Go to Stages → Copy the Invoke URL:
`https://xxxxxxxx.execute-api.us-east-1.amazonaws.com`

### 4.5 Test it

Visit: `https://your-api-gateway-url/api/test`

---

## Step 5: Deploy Frontend to Amplify

### 5.1 Create app

1. AWS Console → Amplify → Create new app
2. Connect to GitHub
3. Select your repo and branch
4. Configure build settings for your framework

### 5.2 Add environment variable

1. Hosting → Environment variables → Add
2. Key: `VITE_API_BASE_URL` (or `REACT_APP_API_BASE_URL` for CRA)
3. Value: Your API Gateway URL (the HTTPS one)

### 5.3 Deploy

Push to GitHub. Amplify will auto-deploy.

**Important**: After adding env variables, you must trigger a new build:
```bash
git commit --allow-empty -m "Trigger rebuild" && git push
```

or
(READ THIS)
Just make a pull request from another branch and merge it to the branch you deployed with (MAIN) - From Kevin

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| "Network error" | Backend not reachable | Check EC2 is running, security group allows port |
| "blocked:mixed" | HTTPS calling HTTP | Use API Gateway for HTTPS |
| 404 on API calls | Env variable not set | Add to Amplify, trigger rebuild |
| Server stops when closing SSH | Not using PM2 | Set up PM2 (Step 3.5) |
| Can't SSH | Security group | Allow port 22 from your IP |

---

## Updating Your App

### Frontend Changes Only
Just push to GitHub. Amplify auto-deploys.
```bash
git add -A && git commit -m "Your message" && git push
```

### Backend Changes
After pushing to GitHub, you must manually update EC2:

```bash
# 1. SSH into EC2
ssh -i ~/Downloads/your-key.pem ec2-user@your-ec2-url

# 2. Navigate to project
cd your-repo

# 3. Pull latest code
git pull

# 4. Install any new dependencies (if package.json changed)
npm install

# 5. Restart the server
pm2 restart my-app
```

**Important**: PM2 keeps your old code running until you restart it. Always run `pm2 restart` after pulling backend changes.

### Summary of Both Frontend and Backend Changes
1. Push to GitHub (Amplify auto-deploys frontend)
2. SSH into EC2 and run: `cd your-repo && git pull && pm2 restart my-app`

---

## Quick Commands

```bash
# SSH into EC2
ssh -i ~/Downloads/key.pem ec2-user@ec2-url

# Server management
pm2 status          # Check if running
pm2 logs my-app     # View logs
pm2 restart my-app  # Restart after updates

# Trigger Amplify rebuild
git commit --allow-empty -m "Rebuild" && git push
```

---

## Cost (Free Tier - First 12 Months)

- EC2 t2.micro: 750 hours/month free
- API Gateway: 1 million requests/month free
- Amplify: 1000 build minutes/month free

After free tier: ~$10-30/month for small apps
