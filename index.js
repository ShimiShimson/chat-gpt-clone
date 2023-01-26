const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

require('dotenv').config();

const configuration = new Configuration({
    organization: "org-2XQ0TLCTkjCm1rUS0HCdJ0lc",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3080;

app.post('/', async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text);
    res.json({
        data: response.data
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
