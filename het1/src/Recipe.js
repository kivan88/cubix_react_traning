import {Component} from 'react';
import './App.css';
import './DifficultyRating.js';
import DifficultyRating from './DifficultyRating.js';
import IngredientList from './IngredientList.js';

class Recipe extends Component {
    render() {
        const DiffKeyPrefix = "Diff_";
        const IngredientKeyPrefix = "Ingridient_";
        return (
            <div>
                <h1 id={this.props.id}>{this.props.name}</h1>
                <br/>
                <DifficultyRating key={DiffKeyPrefix + this.props.id} rating={this.props.difficulty} setRating={(rating) => {this.props.difficulty = rating}}/>
                <br/>
                <IngredientList key={IngredientKeyPrefix + this.props.id} ingredients={this.props.ingredients}/>
                <br/>
                <p>{this.props.instructions}</p>
                <a href="#top">{"Vissza a lap tetejére"}</a>
                <hr/>
            </div>
        );
    }
}

export default Recipe;