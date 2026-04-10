import axios from "axios";
const API_KEY = process.env.GROQ_API_KEY;
export async function callAI(prompt) {
const response = await axios.post(
"https://api.groq.com/openai/v1/chat/completions",
{
model: "openai/gpt-oss-120b",
messages: [
{
role: "user",
content: prompt
}
],
temperature: 0.3
},
{
headers: {
"Authorization": `Bearer ${API_KEY}`,
"Content-Type": "application/json"
}
}
);
return response.data.choices[0].message.content;
}