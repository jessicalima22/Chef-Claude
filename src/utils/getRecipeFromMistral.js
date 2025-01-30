// Em seu arquivo que faz a chamada da API
const VERCEL_URL = 'http://localhost:3000/api/recipeBack'; // Durante desenvolvimento
// const VERCEL_URL = 'https://seu-projeto.vercel.app/api/recipeBack'; // Em produção

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch(VERCEL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ingredientsArr) // Enviando direto o array
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();
        return data.recipe; // Retorna apenas o texto da receita
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}