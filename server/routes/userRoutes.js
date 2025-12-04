// User Authentication Routes
import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const [existingUser] = await db.execute(
      'SELECT id FROM users WHERE email = ? OR username = ?', 
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email or username' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // Return success response (don't send password hash)
    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: result.insertId,
        username,
        email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Check if user exists
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Update last login (optional)
    await db.execute(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // Return success response (don't send password hash)
    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        is_admin: user.is_admin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// @route   GET /api/auth/user/:id
// @desc    Get user profile
// @access  Public (should be protected in production)
router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [users] = await db.execute(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: users[0]
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching user' 
    });
  }
});

export default router;
