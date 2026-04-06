import "./Dice.css"

function RollingDice(){
  return(
    <svg id="die" viewBox="0 0 100 100">
      <path id="hexagon"/>
    </svg>
  );
}

function StationaryDice(){
  return(
    <svg id="square" viewBox="0 0 100 100">
      <path id="square-border"/>
    </svg>
  )
}

function CurrentDice(){
  let currDice = (<div></div>);
  if(true){
    currDice = StationaryDice();
  }else{
    currDice = RollingDice();
  }
  return currDice;
}

export default function Dice(){
  return(
    <>
      <div id="die-wrapper">
        <CurrentDice/>

        <div id="num-wrapper">
          <p>er?</p>
        </div>
      </div>
    </>
  )
}