import React from 'react';
import ReactMarkdown from 'react-markdown';

const EnhancedRecipe = ({ recipe }) => {

    console.log('Recipe received:', recipe); // Verifique o que está chegando
  return (
    <section className="recipe-section">
      <div className="recipe-container">
        <h2 className="recipe-title">Chef Claude Recommends:</h2>
        <div className="recipe-content">
          <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h3 className="recipe-section-title" {...props} />,
              h2: ({node, ...props}) => <h4 className="recipe-section-subtitle" {...props} />,
              p: ({node, ...props}) => <p className="recipe-text" {...props} />,
              ul: ({node, ...props}) => <ul className="recipe-list" {...props} />,
              ol: ({node, ...props}) => <ol className="recipe-list ordered" {...props} />,
              li: ({node, ...props}) => <li className="recipe-list-item" {...props} />
            }}
          >
            {recipe}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default EnhancedRecipe;