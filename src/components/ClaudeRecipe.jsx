/* eslint-disable react/prop-types */

import ReactMarkdown from 'react-markdown'
export default function ClaudeRecipe(props) {
    return (
        <section className="recipe-section"aria-live="polite">
            <div className="recipe-container">
                <h2 className="recipe-title">Chef Claude Recommends:</h2>
                <div className="recipe-content">
                    <ReactMarkdown>{props.recipe}</ReactMarkdown>
                </div>
            </div>
        </section>
    )
}