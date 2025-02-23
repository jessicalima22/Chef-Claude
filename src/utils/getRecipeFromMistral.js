const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://chef-claude-three.vercel.app/api/recipeBack.js'  // URL de produção
  : 'http://localhost:3000/api/recipeBack.js'; 

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(ingredientsArr), // Enviando em um objeto
            mode: 'cors' // Explicitamente definindo o modo CORS
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || 'Failed to fetch recipe');
        }

        const data = await response.json();
        return data.recipe;
    } catch (err) {
        console.error('Error fetching recipe:', err);
        throw err;
    }
}