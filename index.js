require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const Groq = require("groq-sdk");

const TOKEN = process.env.TOKEN;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to AI Bot!!");
});

bot.on('message', async (msg) => {
    const chatCompletion = await getGroqChatCompletion(msg.text);
    bot.sendMessage(msg.chat.id, chatCompletion.choices[0]?.message?.content || "have no answer, sorry");
});


async function getGroqChatCompletion(text) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text
            }
        ],
        model: "llama3-8b-8192"
    });
}

