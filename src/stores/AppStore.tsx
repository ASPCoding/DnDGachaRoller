import {EventEmitter} from 'events';
import {collection, doc, addDoc, updateDoc, getDoc} from "firebase/firestore";
import db from './Firebase.tsx';
import Cookies from 'js-cookie';

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

  prevStates: number[];
  states: number[];

  cookieString: string;

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

    this.prevStates = [0, 0, 0, 0, 0, 0];
    this.states = [0, 0, 0, 0, 0, 0];

    this.cookieString = ""
    let session = Cookies.get("session")

    if(session === undefined){
      addDoc(collection(db, "Cookie Data"),{
        Strength: "-",
        Dexterity: "-",
        Constitution: "-",
        Intelligence: "-",
        Wisdom: "-",
        Charisma: "-",
        ConfirmedStats: ["","","","","",""],
        StatResults: [0, 0, 0, 0, 0, 0],
        States: [0, 0, 0, 0, 0, 0],
      }).then((docRef) =>{
        console.log("It worked!");
        this.cookieString = docRef.id;
        Cookies.set("session", this.cookieString, {expires: 100, secure: true})
      }).catch((error) => {
        console.error("Something went wrong", error);
      });
    }else{
      this.cookieString = session;
    }
  }

  retrieveData(){
    const docRef = doc(db, "Cookie Data", this.cookieString);
    getDoc(docRef)
    .then((docSnap) => {
      if(docSnap.exists()){
        let docData = docSnap.data();
        this.strength = docData.Strength;
        this.dexterity = docData.Dexterity;
        this.constitution = docData.Constitution;
        this.intelligence = docData.Intelligence;
        this.wisdom = docData.Wisdom;
        this.charisma = docData.Charisma; 
        this.confirmedStats = docData.ConfirmedStats;
        this.statResults = docData.StatResults;
        this.prevStates= docData.States;
        this.states = docData.States;
        this.emit("updateData")
      }else{
        console.log("Data does not exist")
      }
    })
    .catch((error) => {
      console.error("Something went wrong", error)
    })
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
        this.setDBStatResults();
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

  setStates(newStates: number[]){
    this.states = newStates;
    if(this.checkInequality(this.removedOnes(this.prevStates), this.removedOnes(this.states))){
      this.setDBStates();
    }
    this.prevStates = this.states;
  }

  checkInequality(listA: number[], listB:number[]){
    for(let index = 0; index < listA.length; ++index){
      if(listA[index] != listB[index]){
        return true
      } 
    }
    return false
  }

  removedOnes(states: number[]){
    let newList = [];
    for(let index = 0; index < states.length; ++index){
      if(states[index] == 1){
        newList.push(0)
      }else{
        newList.push(states[index])
      }
    }
    console.log(newList)
    return newList
  }

  removeSelectedNumber(){
    this.statResults[this.selectedNumber] = 0;
    this.setDBStatResults();
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
      this.confirmedStats[this.selectedNumber] = this.selectedStat;
      this.setDBConfirmedStats()
      this.addToStat();
      this.emit("twoSelected")
      this.selectedStat = "";
    }
  }

  addToStat(){
    if(this.selectedStat == "Strength"){
      this.strength = String(this.statResults[this.selectedNumber]);
      this.setDBStrength();
    }else if(this.selectedStat == "Dexterity"){
      this.dexterity = String(this.statResults[this.selectedNumber]);
      this.setDBDexterity();
    }else if(this.selectedStat == "Constitution"){
      this.constitution = String(this.statResults[this.selectedNumber]);
      this.setDBConstitution();
    }else if(this.selectedStat == "Intelligence"){
      this.intelligence = String(this.statResults[this.selectedNumber]);
      this.setDBIntelligence();
    }else if(this.selectedStat == "Wisdom"){
      this.wisdom = String(this.statResults[this.selectedNumber]);
      this.setDBWisdom();
    }else if(this.selectedStat == "Charisma"){
      this.charisma = String(this.statResults[this.selectedNumber]);
      this.setDBCharisma();
    }
  }

  returnNumber(index: number){
    let stat = this.confirmedStats[index];
    this.confirmedStats[index] = "";
    this.setDBConfirmedStats();
    this.selectedNumber = -1;
    if(stat == "Strength"){
      this.strength = "-";
      this.setDBStrength();
    }else if(stat == "Dexterity"){
      this.dexterity = "-";
      this.setDBDexterity();
    }else if(stat == "Constitution"){
      this.constitution = "-";
      this.setDBConstitution();
    }else if(stat == "Intelligence"){
      this.intelligence = "-";
      this.setDBIntelligence();
    }else if(stat == "Wisdom"){
      this.wisdom = "-";
      this.setDBWisdom();
    }else if(stat == "Charisma"){
      this.charisma = "-";
      this.setDBCharisma();
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

  setDBStrength(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Strength: this.strength
    }).then((docRef) => {
      console.log("Strength updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBDexterity(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Dexterity: this.dexterity
    }).then((docRef) => {
      console.log("Dexterity updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBConstitution(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Constitution: this.constitution
    }).then((docRef) => {
      console.log("Constitution updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBIntelligence(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Intelligence: this.intelligence
    }).then((docRef) => {
      console.log("Intelligence updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBWisdom(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Wisdom: this.wisdom
    }).then((docRef) => {
      console.log("Wisdom updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBCharisma(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      Charisma: this.charisma
    }).then((docRef) => {
      console.log("Charsima updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBConfirmedStats(){
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      ConfirmedStats: this.confirmedStats
    }).then((docRef) => {
      console.log("ConfirmedStats updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBStatResults(){
    console.log(this.cookieString)
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      StatResults: this.statResults
    }).then((docRef) => {
      console.log("StatResults updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
  setDBStates(){
    console.log(this.cookieString)
    const docRef = doc(db, "Cookie Data", this.cookieString)
    updateDoc(docRef, {
      States: this.states
    }).then((docRef) => {
      console.log("States updated", docRef)
    }).catch((error) => {
      console.error("Update went wrong", error)
    })
  }
}

const store = new AppStore()
store.setMaxListeners(16)

export default store;