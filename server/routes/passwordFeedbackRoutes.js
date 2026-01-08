import express from 'express';
import { getAiFeedback } from '../config/llm.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
    try {
        const { passwordData } = req.body;

        if (!passwordData) {
            return res.status(400).json({ error: 'Password data is required' });
        }

        // Build the payload for AI analysis
        const aiPayload = {
            weak_elements_detected: passwordData.sequence?.map(s => s.pattern) || [],
            vulnerabilities: passwordData.sequence?.filter(s =>
                ['dictionary', 'spatial', 'repeat', 'sequence', 'date'].includes(s.pattern)
            ) || [],
            strengths: passwordData.sequence?.filter(s =>
                ['bruteforce'].includes(s.pattern)
            ) || [],
            strength_score: passwordData.score,
            crack_time: passwordData.crack_times_display?.offline_fast_hashing_1e10_per_second || 'unknown'
        };

        const feedback = await getAiFeedback(aiPayload);

        res.json({ success: true, feedback });
    } catch (error) {
        console.error('Error getting AI feedback:', error);
        res.status(500).json({ error: 'Failed to generate AI feedback' });
    }
});

export default router;
