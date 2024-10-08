import './App.css';

function DifficultyRating({rating, setRating }) {
    const ratingList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div>
        <label>{"Nehézség:"}</label>
        <br/>
        {ratingList.map(star => {
          return (  
            <span
                key = {"star" + ratingList.indexOf(star)}
                className='start'
                style={{
                    cursor: 'pointer',
                    color: rating >= star ? 'gold' : 'gray',
                    fontSize: `35px`,
              }}
              onLoad={() => {
                setRating(star)
              }}
            >★</span>
          )
        })}
      </div>
    )
  }

export default DifficultyRating;