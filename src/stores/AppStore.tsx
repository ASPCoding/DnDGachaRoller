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

  rollTroll(){
    if(Math.random() > 0.9){
      return true
    }
    return false
  }

  getRolling(){
    return this.rolling
  }

  toggleRoll(){
    this.rolling = !this.rolling;
    this.emit("toggleRoll")
  }

  getIndexOfLowest(){
    if(this.diceResults.length < 1){
      return -1;
    }
    let smallestIndex = 0;
    for(let i = 1; i < this.diceResults.length; ++i){
      if(this.diceResults[i] < this.diceResults[smallestIndex]){
        smallestIndex = i;
      }
    }
    return smallestIndex;
  }

  getDiceResult(){
    let smallestIndex = this.getIndexOfLowest()
    let result = 0;
    for(let index = 0; index < this.diceResults.length; ++index){
      if(index == smallestIndex){
        continue
      }
      result += this.diceResults[index]
    }
    return result
  }
}

const store = new AppStore()

export default store;