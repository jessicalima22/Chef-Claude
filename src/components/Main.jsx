import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import LoadingMessage from './LoadingMessage'
import { getRecipeFromMistral } from "../utils/getRecipeFromMistral"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [error, setError] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)

    async function getRecipe() {
        setIsLoading(true)
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients)
            setRecipe(recipeMarkdown)
        } finally {
            setIsLoading(false)
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const ingredient = formData.get("ingredient")
        
        if (ingredient.trim()) {
            setError("")
            addIngredient(formData)
            event.target.reset()
        } else {
            setError("*** Please type an ingredient before adding ***")
        }
    }

    const resetApp = () => {
        setIngredients([])
        setRecipe("")
        setError("")
    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    className={error ? "input-error" : ""}
                />
                <button>Add ingredient</button>
            </form>
            
            {error && (
                <div className="error-message" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
            
            {isLoading ? (
                <LoadingMessage />
            ) : (
                recipe && <ClaudeRecipe recipe={recipe} />
            )}

            {recipe && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Try another recipe?</h3>
                        <p>Start fresh with new ingredients.</p>
                    </div>
                    <button onClick={resetApp}>New recipe</button>
                </div>
            )}
        </main>
    )
}