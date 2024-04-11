const {StatusCodes} = require("http-status-codes")
const OpenAIApi = require("openai"); 


const chatbot = async(req,res)=>{
    const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
    });
    const { message } = req.body
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[{"role":"user", "content":message}]
     });
    res.status(StatusCodes.OK).json({message:"success",data:completion.choices[0].message, status_code:StatusCodes.OK})

}

module.exports = {chatbot}