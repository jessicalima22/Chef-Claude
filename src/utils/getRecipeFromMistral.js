// Mesmo arquivo que você mostrou, mas agora assim:
const VERCEL_API_URL = 'http://chef-claude-9ejxjz56m-jessicalima22s-projects.vercel.app/api/recipeBack'

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        const response = await fetch(VERCEL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr })
        })

        if (!response.ok) {
            throw new Error('Failed to fetch recipe')
        }

        const data = await response.json()
        return data.recipe
    } catch (err) {
        console.error(err.message)
    }
}