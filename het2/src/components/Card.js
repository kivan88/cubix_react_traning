import CARD_BACK from '../assets/cards/card-back1.png';
import '../App.css';

function Card({card, index, flipCard, isFlipped, isNonFlippable}){
    return (
        <span onClick={() => {
            if (!isNonFlippable && !isFlipped) { // ha nincs a párosított kártyák között és nincs felfordítva, akkor fordítsa fel
              flipCard(index);
            }
          }}>
          {isFlipped || isNonFlippable ? (
            <img src={card.image} style={{padding: 5}} alt="card front" />
          ) : (
            <img src={CARD_BACK} style={{padding: 5}} alt="card back" />
          )}
        </span>
      );
    }
export default Card;
