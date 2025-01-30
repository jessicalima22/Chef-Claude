import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients...`

export const config = {
    runtime: 'nodejs'
  };

export default async function handler(req, res) {
    console.log('========= API ROUTE HIT =========');
    console.log('Request method:', req.method);
    console.log('Request path:', req.url);

    // Configuração CORS mais específica
    const allowedOrigins = [
        'http://localhost:5173',
        'https://jessicalima22.github.io/Chef-Claude/' 
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const hfToken = process.env.VITE_HF_ACCESS_TOKEN;
        
        if (!hfToken) {
            throw new Error('HuggingFace token not configured');
        }

        const hf = new HfInference(hfToken);
        const { ingredients } = req.body; // Extraindo do objeto
        
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
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}