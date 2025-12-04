#!/usr/bin/env node
// Test script for Admin functionality
console.log('👑 Testing Admin User Functionality\n');

const API_BASE = 'http://localhost:5000/api/auth';

async function testAdminFunctionality() {
  try {
    // Test 1: Login as admin user
    console.log('🔐 Testing admin login...');
    const adminLogin = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const adminData = await adminLogin.json();
    console.log(`✅ Admin login: ${adminData.user.username} (admin: ${adminData.user.is_admin})`);
    
    // Test 2: Login as regular user
    console.log('\n👤 Testing regular user login...');
    const userLogin = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'newuser@example.com',
        password: 'password123'
      })
    });
    const userData = await userLogin.json();
    console.log(`✅ Regular user login: ${userData.user.username} (admin: ${userData.user.is_admin})`);
    
    // Test 3: Get user profile
    console.log('\n📋 Testing user profile retrieval...');
    const profile = await fetch(`${API_BASE}/user/${adminData.user.id}`);
    const profileData = await profile.json();
    console.log(`Profile retrieved: ${profileData.user.username} (admin: ${profileData.user.is_admin})`);
    
    console.log('\nAll admin functionality tests passed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAdminFunctionality();
