import {EventEmitter} from 'events';

class AppStore extends EventEmitter{
  
  strength:string;
  dexterity:string;
  constitution:string;
  intelligence:string;
  wisdom:string;
  charisma:string;
  selectedStat: string;
  confirmedStats: string[];

  diceResults:number[];
  rolling: boolean;

  statResults:number[];
  selectedNumber:number;

  constructor(){
    super();
    this.strength = "-";
    this.dexterity = "-";
    this.constitution = "-";
    this.intelligence = "-";
    this.wisdom = "-";
    this.charisma = "-";
    this.selectedStat = "";
    this.confirmedStats = ["","","","","",""]

    this.diceResults = [];
    this.rolling = false;

    this.statResults = [0, 0, 0, 0, 0, 0];
    this.selectedNumber = -1;
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

  addStatResult(result:number){
    for(let index = 0; index < this.statResults.length; ++index){
      if(this.statResults[index] == 0){
        this.statResults[index] = result
        return
      }
    }
  }

  getStatResults(){
    return this.statResults
  }

  getSelectedNumber(){
    return this.selectedNumber;
  }

  setSelectedNumber(index: number){
    this.selectedNumber = index;
    this.checkTwoSelected();
  }

  removeSelectedNumber(){
    this.statResults[this.selectedNumber] = 0;
    this.selectedNumber = -1;
  }

  getSelectedStatNumber(){
    return this.statResults[this.selectedNumber]
  }

  setSelectedStat(name: string){
    this.selectedStat = name;
    this.checkTwoSelected();
    this.emit("statSelected")
  }

  getSelectedStat(){
    return this.selectedStat;
  }

  checkTwoSelected(){
    if(this.selectedStat != "" && this.selectedNumber != -1 && this.confirmedStats[this.selectedNumber]  == "" && 
      this.getStat(this.selectedStat) == "-" && this.statResults[this.selectedNumber] != 0){
      console.log(this.selectedNumber)
      console.log(this.confirmedStats)
      this.confirmedStats[this.selectedNumber] = this.selectedStat;
      this.addToStat();
      this.emit("twoSelected")
      this.selectedStat = "";
      this.selectedNumber = -1;
    }
  }

  addToStat(){
    if(this.selectedStat == "Strength"){
      this.strength = String(this.statResults[this.selectedNumber]);
    }else if(this.selectedStat == "Dexterity"){
      this.dexterity = String(this.statResults[this.selectedNumber]);
    }else if(this.selectedStat == "Constitution"){
      this.constitution = String(this.statResults[this.selectedNumber]);
    }else if(this.selectedStat == "Intelligence"){
      this.intelligence = String(this.statResults[this.selectedNumber]);
    }else if(this.selectedStat == "Wisdom"){
      this.wisdom = String(this.statResults[this.selectedNumber]);
    }else if(this.selectedStat == "Charisma"){
      this.charisma = String(this.statResults[this.selectedNumber]);
    }
  }

  returnNumber(index: number){
    let stat = this.confirmedStats[index];
    this.confirmedStats[index] = "";
    this.selectedNumber = -1;
    if(stat == "Strength"){
      this.strength = "-";
    }else if(stat == "Dexterity"){
      this.dexterity = "-";
    }else if(stat == "Constitution"){
      this.constitution = "-";
    }else if(stat == "Intelligence"){
      this.intelligence = "-";
    }else if(stat == "Wisdom"){
      this.wisdom = "-";
    }else if(stat == "Charisma"){
      this.charisma = "-";
    }
    this.emit("statSelected")
  }

  getStat(stat: string){
    if(stat == "Strength"){
      return this.strength;
    }else if(stat == "Dexterity"){
      return this.dexterity;
    }else if(stat == "Constitution"){
      return this.constitution;
    }else if(stat == "Intelligence"){
      return this.intelligence;
    }else if(stat == "Wisdom"){
      return this.wisdom;
    }else if(stat == "Charisma"){
      return this.charisma;
    }
    return "";
  }
}

const store = new AppStore()
store.setMaxListeners(16)

export default store;