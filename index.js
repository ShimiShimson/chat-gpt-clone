const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

require('dotenv').config();

const configuration = new Configuration({
    organization: "org-2XQ0TLCTkjCm1rUS0HCdJ0lc",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

const model = (typeof currentModel === 'undefined') ? 'text-davinci-003' : currentModel;

app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: `${model}`,
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: 0.5,
    });
    
    res.json({
        message: response.data.choices[0].text
    })
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
