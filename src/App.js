import logo from './logo.svg';
import './App.css';
import { FaHandPaper, FaHandRock, FaHandScissors, FaSignOutAlt} from 'react-icons/fa';
// keeps track of the users action
import {useState} from 'react';

// action used later to chose who won
const actions = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

function randomAction() {
  const keys = Object.keys(actions);
  // math.random chooses from 0 to 1
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}



function calculateWinner(action1, action2) {
  if (action1 === action2){
    return 0;
  } else if (actions[action1] === action2){
    return -1;
  }
  else if (actions[action2] === action1){
    return 1
  }

  // This is for bugg
  return null;
}

function ActionIcon({action, ...props}) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
    exit: FaSignOutAlt,
  };
  const Icon = icons[action];

  return (<Icon {...props}/>);
}

function Player({name = "Player", score = 0, action="rock"}) {
 return (
  <div className='player'>
    <div className='score'>{`${name}: ${score}`}</div>
    <div className='action'>
      {action && <ActionIcon action={action} size={60}/>}
    </div>
  </div>
 )
}

function ActionButton({action = "rock", onActionSelected}) {
  return (
    <button className='round-btn' onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  )
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You win!",
    0: "It's a Tie",
    1: "You Lose!",
  }
  return (
    <h2>{text[winner]}</h2>
  )
}

function App() {
  // keep track of the action the player does
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    setPlayerAction(selectedAction);
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);
    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1){
      setPlayerScore(playerScore + 1);
    }
    else if (newWinner === 1){
      setComputerScore(computerScore + 1);
    }
    else if (newWinner === 0){
      setTieScore(tieScore + 1);
    }

  }

  const restart = () => {
    setPlayerScore(playerScore - playerScore);
    setComputerScore(computerScore - computerScore);
    setTieScore(tieScore - tieScore);
  }

  return (
    <div className='center'>
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className='container'>
          <Player name='Player' score={playerScore} action={playerAction}/>
          <Player name='Computer' score={computerScore} action={computerAction}/>
        </div>
        <div>
          <ActionButton action='rock' onActionSelected={onActionSelected}/>
          <ActionButton action='paper' onActionSelected={onActionSelected}/>
          <ActionButton action='scissors' onActionSelected={onActionSelected}/>
        </div>  
        <ShowWinner winner={winner}/>
        <div>
          <h2># of Ties: {`${tieScore}`} </h2>
        </div>
        <div className='exit'>
          <button onClick={restart}>restart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
