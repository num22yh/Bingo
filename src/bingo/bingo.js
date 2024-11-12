import './bingo.css';
import React, {useState, useEffect} from 'react';

const CARD_COUNT = 5

function Bingo() {

    const [numPlayers, setNumPlayers] = useState(0);
    const [players, setPlayers]=useState([]);
    const [rangeBingo, setRangeBingo] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);
    const [checkedCards, setCheckedCards] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);


    const handleNumPlayersChange = (event) =>{
        const value = event.target.value;
        setNumPlayers(value);
    };

    const handleRangeBingoChange = (event) =>{
        const value = event.target.value;
        setRangeBingo(value);
    };

    const setPlayersCard = (maxRange) =>{
        const cards = [];
        while (cards.length<CARD_COUNT){
            const num = Math.floor(Math.random()*maxRange) + 1;
            if(!cards.includes(num)){
                cards.push(num)
            }
        }
        return cards
    }

    const handleReadyClick = () => {
        if (numPlayers > 0 && rangeBingo) {
            const newPlayers = Array.from({ length: numPlayers }, () => setPlayersCard(rangeBingo));
            setPlayers(newPlayers);
            setCheckedCards(Array.from({ length: numPlayers }, () => [])); 
            setIsReady(true);
            setIsGameOver(false);
        } else {
            if (numPlayers <= 0) {
                alert('플레이어 수를 설정해주세요.');
            } else if (!rangeBingo) {
                alert('빙고 범위를 설정해주세요.');
            }
        }
    };

    const handleCallClick = () => {
        const random = Math.floor(Math.random() * rangeBingo) + 1;
        setRandomNumber(random);
    
        const updatedCheckedCards = players.map((cards, playerIndex) => {
            if (cards.includes(random)) {
                const currentChecked = checkedCards[playerIndex];
                const newChecked = currentChecked.includes(random)
                    ? currentChecked 
                    : [...currentChecked, random]; 
    
                return newChecked;
            }
            return checkedCards[playerIndex];
        });
    
        setCheckedCards(updatedCheckedCards);
    };

    useEffect(() => {
        checkedCards.forEach((cards, playerIndex) => {
            if (cards.length === CARD_COUNT && !isGameOver) {
                setIsGameOver(true); 
                setTimeout(() => {
                    alert(`플레이어 ${playerIndex + 1}이(가) 승리했습니다!`);
                }, 100);
            }
        });
    }, [checkedCards, isGameOver]);

    const resetGame = () => {
        setNumPlayers(0);
        setPlayers([]);
        setRangeBingo(0);
        setIsReady(false);
        setRandomNumber(null);
        setCheckedCards([]);
        setIsGameOver(false);
    };




    return (
      <div className="main-container">
        <h1>Bingo 게임</h1>

        <div className='setting-container'>
            <h3>플레이어 수 : </h3>
            <input 
                    type="number" 
                    min="2" 
                    max="5" 
                    placeholder="플레이어 수 선택"
                    onChange={handleNumPlayersChange}
                />
            <h3>빙고 범위 : </h3>
            <input 
                    type="number" 
                    min="10"
                    max="30"
                    placeholder="빙고 범위 선택"
                    onChange={handleRangeBingoChange}
                />

        </div>

        {!isReady ? (
                <button className='ready-btn' onClick={handleReadyClick}>Ready</button>
            ) : (
                isGameOver ? (
                    <button className='ready-btn' onClick={resetGame}>restart</button>
                ) : (
                    <button className='ready-btn' onClick={handleCallClick}>Call</button>
                )
            )} 
        
        <div>
            <h1>{randomNumber!==null && randomNumber}</h1>
        </div>

        <div className="players-container">
        {players.map((playerCards, index) => (
            <div key={index} className="player">
                <h2>플레이어 {index + 1}</h2>
                {playerCards.map((num, i) => ( 
                <p key={i}
                className={`player-card ${checkedCards[index].includes(num) ? 'checked' : ''}`}>{num}</p>
                ))}
                </div>

            ))}    
        </div>
      </div>
    );
}
  
  export default Bingo;