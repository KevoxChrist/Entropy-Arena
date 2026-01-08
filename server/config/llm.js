import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
    apiKey: process.env.API_KEY,
});

async function getAiFeedback(aiPayload) {
    const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2400,
        system: `You are a cybersecurity education expert specializing in password security. Your role is to provide clear, educational feedback that helps users understand why their password choices are weak or strong. Be specific, avoid jargon, and focus on practical advice. Always explain WHY certain patterns are vulnerable, not just THAT they are vulnerable.`,
        messages: [
            {
                role: "user",
                content: `Analyze this password attempt and provide educational feedback in JSON format.

Password Analysis Data:
- Weak elements detected: ${aiPayload.weak_elements_detected.join(', ') || 'none'}
- Vulnerabilities: ${JSON.stringify(aiPayload.vulnerabilities, null, 2)}
- Strengths: ${JSON.stringify(aiPayload.strengths, null, 2)}
- Strength score: ${aiPayload.strength_score}/4
- Estimated crack time: ${aiPayload.crack_time}

Respond with ONLY a JSON object (no markdown, no code blocks) in this exact format:
{
  "overall_assessment": "2-3 sentence summary of the password's security",
  "vulnerabilities_explained": [
    {
      "issue": "brief description of the vulnerability",
      "why_it_matters": "explanation of why this is a problem",
      "impact": "how this affects crack time/security"
    }
  ],
  "strengths_explained": [
    {
      "strength": "what they did well",
      "benefit": "why this helps security"
    }
  ],
  "improvement_tips": [
    "specific actionable tip 1",
    "specific actionable tip 2",
    "specific actionable tip 3"
  ]
}`,
            },
        ],
    });

    let responseText = message.content[0].text;

    // Strip markdown code blocks if present
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const data = JSON.parse(responseText);
    return data;
}

export { getAiFeedback };
