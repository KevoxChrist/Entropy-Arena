
const express = require("express");
const { getQuestions, getGrades } = require("../../llm.js"); //AI Prompt Response
const router = express.Router();

router.post("/generate-feedback", async (req, res) => {
  try {
    //Getting the promises object back which is Claude AI's response
    const {
      topic = "",
      difficulty = "Beginner",
      personality = "Neutral", } = req.body;

    const countRaw = req.body.numOfQuestions ?? req.body.questions; // support either name
    const numOfQuestions = Math.max( 1, Math.min(15, parseInt(countRaw, 10) || 5));
    // console.log(res.json(data));
    const responseText = await getQuestions(
      topic,
      difficulty,
      numOfQuestions,
      personality
    );
    res.json(responseText); //Turns the Claude AI's response into a JSON
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});


module.exports = router;
