import {EventEmitter} from 'events';

class AppStore extends EventEmitter{
  
  strength:string;
  dexterity:string;
  constitution:string;
  intelligence:string;
  wisdom:string;
  charisma:string;

  diceResults:number[];
  rolling: boolean;

  constructor(){
    super();
    this.strength = "-";
    this.dexterity = "-";
    this.constitution = "-";
    this.intelligence = "-";
    this.wisdom = "-";
    this.charisma = "-";

    this.diceResults = [];
    this.rolling = false;
  }

  randomize(){
    this.diceResults = [];
    for(let i = 0; i < 4; ++i){
      this.diceResults.push(Math.floor((Math.random()*6) +1))
    }
  }

  toggleRoll(){
    this.rolling = !this.rolling;
    this.emit("toggleRoll")
  }
}

const store = new AppStore()

export default store;