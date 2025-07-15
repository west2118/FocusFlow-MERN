import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

console.log("API KEY:", process.env.OPENROUTER_API);

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API,
});

const getSuggestion = async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2:free",
      messages: [
        {
          role: "user",
          content:
            "Give me a 1–2 sentence productivity tip to help improve daily focus. Make it specific, friendly, and include a small action with a quick impact example.",
        },
      ],
    });

    console.log(completion);
    res.status(200).json(completion.choices[0].message.content);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { getSuggestion };
