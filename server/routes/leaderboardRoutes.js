import express from 'express';
import { db } from '../config/db.js';

const router = express.Router();

// @route   GET /api/leaderboard
// @desc    Get all leaderboard entries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [entries] = await db.execute(
      'SELECT id, user_rank, username, time_seconds, recorded_date FROM leaderboard ORDER BY user_rank ASC'
    );

    res.json({
      success: true,
      data: entries,
      count: entries.length
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching leaderboard' 
    });
  }
});

// @route   GET /api/leaderboard/top/:limit
// @desc    Get top N leaderboard entries
// @access  Public
router.get('/top/:limit', async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 10;
    
    // Use template literal for LIMIT since MySQL doesn't support parameterized LIMIT in some versions
    const [entries] = await db.execute(
      `SELECT id, user_rank, username, time_seconds, recorded_date FROM leaderboard ORDER BY user_rank ASC LIMIT ${limit}`
    );

    res.json({
      success: true,
      data: entries,
      count: entries.length
    });

  } catch (error) {
    console.error('Get top leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching top entries' 
    });
  }
});

// @route   POST /api/leaderboard
// @desc    Add new leaderboard entry
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { username, time_seconds } = req.body;

    // Validation
    if (!username || time_seconds === undefined || time_seconds === null) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and time_seconds are required' 
      });
    }

    if (time_seconds < 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Time must be a positive number' 
      });
    }

    // Calculate rank based on current entries (better time = lower rank number)
    const [rankResult] = await db.execute(
      'SELECT COUNT(*) + 1 as new_rank FROM leaderboard WHERE time_seconds < ?',
      [time_seconds]
    );

    const newRank = rankResult[0].new_rank;

    // Update ranks for entries that should be ranked lower
    await db.execute(
      'UPDATE leaderboard SET user_rank = user_rank + 1 WHERE user_rank >= ?',
      [newRank]
    );

    // Insert new entry
    const [result] = await db.execute(
      'INSERT INTO leaderboard (user_rank, username, time_seconds, recorded_date) VALUES (?, ?, ?, CURDATE())',
      [newRank, username, time_seconds]
    );

    // Get the newly created entry
    const [newEntry] = await db.execute(
      'SELECT id, user_rank, username, time_seconds, recorded_date FROM leaderboard WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Leaderboard entry added successfully!',
      data: newEntry[0]
    });

  } catch (error) {
    console.error('Add leaderboard entry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding leaderboard entry' 
    });
  }
});

// @route   GET /api/leaderboard/user/:username
// @desc    Get entries for a specific user
// @access  Public
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const [entries] = await db.execute(
      'SELECT id, user_rank, username, time_seconds, recorded_date FROM leaderboard WHERE username = ? ORDER BY user_rank ASC',
      [username]
    );

    if (entries.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'No entries found for this user' 
      });
    }

    res.json({
      success: true,
      data: entries,
      count: entries.length
    });

  } catch (error) {
    console.error('Get user leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching user entries' 
    });
  }
});

// @route   DELETE /api/leaderboard/:id
// @desc    Delete a leaderboard entry
// @access  Public (should be protected in production)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get the entry to be deleted
    const [entryToDelete] = await db.execute(
      'SELECT user_rank FROM leaderboard WHERE id = ?',
      [id]
    );

    if (entryToDelete.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Leaderboard entry not found' 
      });
    }

    const deletedRank = entryToDelete[0].user_rank;

    // Delete the entry
    await db.execute('DELETE FROM leaderboard WHERE id = ?', [id]);

    // Update ranks for entries that were ranked lower
    await db.execute(
      'UPDATE leaderboard SET user_rank = user_rank - 1 WHERE user_rank > ?',
      [deletedRank]
    );

    res.json({
      success: true,
      message: 'Leaderboard entry deleted successfully'
    });

  } catch (error) {
    console.error('Delete leaderboard entry error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting leaderboard entry' 
    });
  }
});

// @route   GET /api/leaderboard/stats
// @desc    Get leaderboard statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const [stats] = await db.execute(`
      SELECT 
        COUNT(*) as total_entries,
        AVG(time_seconds) as average_time,
        MIN(time_seconds) as best_time,
        MAX(time_seconds) as worst_time,
        COUNT(DISTINCT username) as unique_players
      FROM leaderboard
    `);

    res.json({
      success: true,
      data: stats[0]
    });

  } catch (error) {
    console.error('Get leaderboard stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching leaderboard statistics' 
    });
  }
});

export default router;