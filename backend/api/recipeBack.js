// api/recipeBack.js
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

console.log('Token Hugging Face:', req.env.VITE_HF_ACCESS_TOKEN);

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const hf = new HfInference(req.env.VITE_HF_ACCESS_TOKEN)
        const { ingredients } = req.body
        const ingredientsString = ingredients.join(", ")
        
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        res.status(200).json({ recipe: response.choices[0].message.content })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to get recipe' })
    }
}