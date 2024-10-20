import CARD_HEARTS_1 from '../assets/cards/card-hearts-1.png';
import CARD_CLUBS_1 from '../assets/cards/card-clubs-1.png';
import CARD_DIAMONDS_1 from '../assets/cards/card-diamonds-1.png';
import CARD_SPADES_1 from '../assets/cards/card-spades-1.png';
import CARD_HEARTS_2 from '../assets/cards/card-hearts-2.png';
import CARD_CLUBS_2 from '../assets/cards/card-clubs-2.png';
import CARD_DIAMONDS_2 from '../assets/cards/card-diamonds-2.png';
import CARD_SPADES_2 from '../assets/cards/card-spades-2.png';
import { useEffect, useState } from 'react';
import '../App.css';
import Card from "../components/Card";

function Table({numberOfPairs}) {
  const [cards, setCards] = useState([]); // Összes kártya
  const [flippedCards, setFlippedCards] = useState([]); // Aktuálisan felfordított kártyák
  const [matchedCards, setMatchedCards] = useState([]); // Párosított kártyák
  const getRandomCard = (array) => { // Visszaadja egy tömb véletlen elemét
    const randomObject = array[Math.floor(Math.random() * array.length)];
    return randomObject;
  };
  const generateCards = () => {
    const cardImages = [CARD_HEARTS_1, CARD_CLUBS_1, CARD_DIAMONDS_1, CARD_SPADES_1, CARD_HEARTS_2, CARD_CLUBS_2, CARD_DIAMONDS_2, CARD_SPADES_2]; // A képek tömbje
    let startingCards = [];
    for (let i = 0; i < numberOfPairs; ++i) startingCards[i] = getRandomCard(cardImages);

    const shuffledCards = [...startingCards, ...startingCards] // Duplikálás, hogy biztosan legyenek párok, utána az elemek összekeverése véletlenszerűen
      .slice(0, numberOfPairs * 2)
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({ id: index, image }));

    setCards(shuffledCards);
  };
  const flipCard = (index) => { // berakja a felfordított kártyákat a tömbbe
    if (flippedCards.length < 2) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  // A felfordított lapokra useEffect, ha tömbbe két elem kerül
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.image === secondCard.image) { // ha egyeznek a kártyák
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
      } else {
        setTimeout(() => { // ha nem egyeznek, akkor visszafordítja őket 1 mmásodperc múlva
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  useEffect(() => {
    if (flippedCards.length === 2 && matchedCards.includes(flippedCards[0])) {
      setFlippedCards([]);
    }
  }, [matchedCards]);

  useEffect(() => { // A numberOfPairs változására új kártyák generálása
    generateCards();
  }, [numberOfPairs]);

  return (
    <div style={{alignItems: 'flex-start'}}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          flipCard={flipCard}
          isFlipped={flippedCards.includes(index)} // ha a kártya bekerül a felfordított tömbbe, akkor megfordított
          isNonFlippable={matchedCards.includes(index)} // ha a kártya bekerült a párosított tömbe nem fordítható
        />
      ))}
    </div>
  );
}

export default Table;