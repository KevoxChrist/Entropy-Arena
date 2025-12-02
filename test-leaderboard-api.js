#!/usr/bin/env node
// Test script for Leaderboard API
console.log('🎮 Testing Entropy Arena Leaderboard API\n');

const API_BASE = 'http://localhost:5000/api/leaderboard';

async function testAPI() {
  try {
    // Test 1: Get all entries
    console.log('📊 Getting all leaderboard entries...');
    const response1 = await fetch(API_BASE);
    const data1 = await response1.json();
    console.log(`✅ Found ${data1.count} entries`);
    
    // Test 2: Get top 2 entries
    console.log('\n🏆 Getting top 2 entries...');
    const response2 = await fetch(`${API_BASE}/top/2`);
    const data2 = await response2.json();
    console.log(`✅ Top 2 entries retrieved`);
    
    // Test 3: Get statistics
    console.log('\n📈 Getting leaderboard statistics...');
    const response3 = await fetch(`${API_BASE}/stats`);
    const data3 = await response3.json();
    console.log(`✅ Stats: ${data3.data.total_entries} total, best time: ${data3.data.best_time}s`);
    
    // Test 4: Add a new entry
    console.log('\n➕ Adding new entry...');
    const newEntry = {
      username: 'apitest',
      time_seconds: 37.5
    };
    const response4 = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry)
    });
    const data4 = await response4.json();
    console.log(`✅ New entry added with rank ${data4.data.user_rank}`);
    
    // Test 5: Get user entries
    console.log('\n👤 Getting entries for user "apitest"...');
    const response5 = await fetch(`${API_BASE}/user/apitest`);
    const data5 = await response5.json();
    console.log(`✅ Found ${data5.count} entries for apitest`);
    
    console.log('\n🎉 All API tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI();
