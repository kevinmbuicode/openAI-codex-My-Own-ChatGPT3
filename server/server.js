import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { OpenAIApi, Configuration } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Codex");
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0, // risk level, 0 means it generates what it knows.
        max_tokens: 3000, // can generate more text.
        top_p: 1,
        frequency_penalty: 0.5, // not likely to repeat the same text on the same question.
        presence_penalty: 0,
        stop: ["\"\"\""],
    });

    res.status(200).send({
        bot: response.data.choices[0].text
    })

  } catch (error) {
    console.log("Sorry! An error occured: ", error);
    res.status(500).send({ error })
  }
});


app.listen(5000, () => console.log("Server is running on port: http://localhost:5000"))