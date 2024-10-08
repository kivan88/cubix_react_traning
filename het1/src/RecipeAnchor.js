import {Component} from 'react';
import './App.css';

class RecipeAnchor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const anchorPrefix = "Anch_";
        return (
            <div>
                {this.props.recipes.map(item => {
                return (  
                    <a key={anchorPrefix+item.id} href={"#"+item.id}>{item.name}</a>
                )
            })}    
            </div>
        );
    }
}

export default RecipeAnchor;