// Mesmo arquivo que você mostrou, mas agora assim:
const VERCEL_API_URL = 'http://chef-claude-9ejxjz56m-jessicalima22s-projects.vercel.app/api/recipeBack'

export async function getRecipeFromMistral(ingredientsArr) {
    try {
        console.log("Fetching recipe with:", ingredientsArr) // 🛠️ Verifique os ingredientes enviados

        const response = await fetch(VERCEL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: ingredientsArr })
        })

        console.log("Response status:", response.status) // 🛠️ Veja se a API responde corretamente

        if (!response.ok) {
            const errorText = await response.text() // Pegando o erro detalhado
            throw new Error(`Failed to fetch recipe: ${errorText}`)
        }

        const data = await response.json()
        console.log("API Response:", data) // 🛠️ Verifique se `data.recipe` existe

        if (!data.recipe) {
            throw new Error("No recipe returned from API")
        }

        return data.recipe
    } catch (err) {
        console.error("Error fetching recipe:", err.message)
        return "Error fetching recipe. Please try again." // Evita `undefined`
    }
}
