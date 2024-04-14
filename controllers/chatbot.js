const { StatusCodes } = require("http-status-codes");
const OpenAI = require("openai");
require("dotenv").config()



const chatbot = async (req, res) => {
    console.log(process.env.OPENAI_API_KEY)
     const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
     });

    const message = [];
    message.push(req.body.message)
    const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message[0]  }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

}    


module.exports = { chatbot };

