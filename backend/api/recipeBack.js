import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients...`

export default async function handler(req, res) {
    console.log('API Called');

    // Configuração CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Acessar a variável de ambiente corretamente
        const hfToken = process.env.VITE_HF_ACCESS_TOKEN;
        console.log('Token exists:', !!hfToken); // Log para debug

        if (!hfToken) {
            throw new Error('HuggingFace token not configured');
        }

        const hf = new HfInference(hfToken);
        const ingredients = req.body;
        console.log('Received ingredients:', ingredients);

        if (!Array.isArray(ingredients) || ingredients.length < 4) {
            return res.status(400).json({
                error: 'Please provide at least 4 ingredients in an array'
            });
        }

        const ingredientsString = ingredients.join(", ");
        
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        });

        return res.status(200).json({ recipe: response.choices[0].message.content });
    } catch (error) {
        console.error('Detailed error:', error);
        return res.status(500).json({
            error: error.message,
            details: error.stack
        });
    }
}