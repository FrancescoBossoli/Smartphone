var powerBtn = document.getElementById("power") as HTMLInputElement;
var display = document.querySelector(".screen-smartphone") as HTMLElement;
var dialNumber = document.getElementById("dialNumber") as HTMLInputElement;
var dialerApp = document.getElementById("dialerApp") as HTMLElement;
var vodafoneApp = document.getElementById("vodafoneApp") as HTMLElement;
var userName = document.getElementById("username") as HTMLElement;
var lineNumber = document.getElementById("phoneNumber") as HTMLElement;
var credit = document.getElementById("credito") as HTMLElement;
var loggedId:number = 0;
var users:User[] = [];
const simCards:number = 2;
const names:string[] = ["FirstUser", "SecondUser", "ThirdUser"];
dialNumber.value = "";

interface Smartphone {
    credito:number;
    numeroChiamate:number;
    ricarica(amount:number):void;
    chiamata(minutes:number):void;
    numero404():number;
    getNumeroChiamate():number;
    azzeraChiamate():void;
}

class User implements Smartphone {
    public credito:number
    public numeroChiamate:number
    private tariffa:number = 0.20
    public name:string
    public id:number
    public phoneNumber:number

    constructor(_credito:number = 0, _numeroChiamate:number = 0) {
        this.credito = _credito;
        this.numeroChiamate = _numeroChiamate;
    }

    public ricarica(amount:number):void {
        this.credito += amount
    }
    public chiamata(minutes:number):void {
        this.credito -= (this.tariffa * minutes)
        this.numeroChiamate++
    }
    public numero404():number {
        return this.credito
    }
    public getNumeroChiamate():number {
        return this.numeroChiamate
    }
    public azzeraChiamate():void {
        this.numeroChiamate = 0
    }
}

window.addEventListener("DOMContentLoaded", init);

function init() {
    fetch('http://localhost:3000/users').then((response) => {
        return response.json();             			
    }).then(async (data) => {
        let array = data;
        if (array.length == 1 && array[0].id == 404) {
            await populateApp();
            init();
        }
        useData(array);
    });
}

function useData(array) {
    for (let i = 0; i < array.length; i++) {
        users[i] = new User;
        users[i].id = array[i].id;
        users[i].name = array[i].name;
        users[i].phoneNumber = array[i].phoneNumber;
        users[i].credito = array[i].credito;
        users[i].numeroChiamate = array[i].numeroChiamate;
    }
    userName.innerHTML = users[loggedId].name;
    lineNumber.innerHTML = users[loggedId].phoneNumber.toString();
    credit.innerHTML = users[loggedId].numero404().toString() + "&euro;";

}

async function populateApp() {
    for (let i = 0; i <= simCards; i++) {        
        let user = new User(Math.floor(Math.random()*11));
        user.name = names[i];
        user.id = i + 1;
        user.phoneNumber = parseInt("34" + Math.floor((Math.random() + (Math.floor(Math.random()*10)+1))*(10**7)));
        users.push(user);
        await addUser(user);
    }
    await deletePlaceholder();
}

async function addUser(user:User) {
    let response = await fetch('http://localhost:3000/users/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user)
	});   
}

async function deletePlaceholder() {
    let response = await fetch('http://localhost:3000/users/404', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(users)
	});   
}

async function recharge(x:number) {
    users[loggedId].ricarica(x);
    console.log(users[loggedId].numero404());
}


powerBtn.addEventListener("click", turnScreenOnOff)

function turnScreenOnOff() {
    if (powerBtn.checked) {
        display.style.backgroundColor = "#fff";
        display.style.border = "2px inset grey";
    } else {
        display.style.backgroundColor = "#000";
        display.style.border = "none";
    }
}

function writeDigit(digit:number|string):void {
    dialNumber.value += digit;
}

function deleteCharacter():void {
    dialNumber.value = dialNumber.value.slice(0, -1);
}

function displayHome():void {
    if (powerBtn.checked) {
        dialerApp.style.display = "none";
        vodafoneApp.style.display = "none";
        display.style.backgroundColor = "#fff";
        display.style.border = "2px inset grey";
    }    
}
















/*



document.addEventListener('DOMContentLoaded', function () {    
    displayTime();
    setInterval(displayTime, 1000);
    // Listen to lock click
    document.getElementById('lock')!.addEventListener('click', function () {
      document.getElementById('lock')!.classList.add()
    });
  });
  
  // Clock functions
  
  function displayTime () {
    var now = new Date();
    document.getElementById('time')!.innerHTML = now.getHours() + 
      ':' + checkTime(now.getMinutes());
    document.getElementById('date')!.innerHTML = dayString(now);
  }
  
  function checkTime (i) {
      if (i < 10) {
        i = '0' + i
      };
      return i;
  }
  
  function month (month) {
    var monthNames = [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return monthNames[month];
  }
  
  function day (day) {
    var dayNames = [ 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato' ];
    return dayNames[day];
  }
    
  function dayString (day) {
    return day(day.getDay()) + ', ' + month(day.getMonth()) + ' ' + day.getDay();
  }
  */