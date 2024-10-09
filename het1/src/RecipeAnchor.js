import {Component} from 'react';
import './App.css';

class RecipeAnchor extends Component {
    render() {
        const anchorPrefix = "Anch_";
        return (
            <div>
                {this.props.recipes.map(item => {
                return (  
                    <a role="button" key={anchorPrefix+item.id} href={"#"+item.id}>{item.name}</a>
                )
            })}    
            </div>
        );
    }
}

export default RecipeAnchor;