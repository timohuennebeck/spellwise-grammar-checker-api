// defines the port from the .env file
require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 8080;

const configuration = new Configuration({
    organization: "org-vICj9H8TZWjRiLX60K2AlsXb",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/openai", async (req, res) => {
    const MAX_COMPLETIONS = req.body.n;
    let completions = [];

    // Generate multiple responses with ChatGPT
    while (completions.length < MAX_COMPLETIONS) {
        const response = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: req.body.prompt,
            n: req.body.n,
            temperature: 0.95,
            max_tokens: 1024,
            top_p: 1,
            stop: null,
        });

        const elaboration = response.data.choices[0].text.trim();
        if (!completions.includes(elaboration)) {
            completions.push(elaboration);
        }
    }

    // return the requests
    res.json(completions);
});

app.post("/openai-slash", async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: req.body.prompt,
        temperature: 0.95,
        max_tokens: 1024,
        top_p: 1,
    });

    const elaboration = response.data.choices[0].text.trim();
    // return the requests
    res.send(elaboration);
});

app.post("/openai-edit", async (req, res) => {
    console.log(req.body);

    const response = await openai.createEdit({
        model: "text-davinci-edit-001",
        input: req.body.prompt,
        instruction: "Fix the spelling mistakes",
    });

    const elaboration = response.data.choices[0].text.trim();
    // return the requests
    res.send(elaboration);
});

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Express listening on ${PORT}`);
});
