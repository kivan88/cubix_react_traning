import './App.css';

function IngredientList({ingredients}) {
    return (
      <div>
        <h2>{"Hozzávalók:"}</h2>
        <ul>
        {ingredients.map(item => {
          return (  
            <li key={ingredients.indexOf(item)} >{item}</li>
          )
        })}
        </ul>
      </div>
    )
  }

export default IngredientList;