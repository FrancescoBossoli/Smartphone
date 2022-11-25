var powerBtn = document.getElementById("power") as HTMLInputElement;
var display = document.querySelector(".screen-smartphone") as HTMLElement;
var dialNumber = document.getElementById("dialNumber") as HTMLInputElement;
var dialerApp = document.getElementById("dialerApp") as HTMLElement;
var vodafoneApp = document.getElementById("vodafoneApp") as HTMLElement;
var desktop = document.getElementById("desktop") as HTMLElement;
var userName = document.getElementById("username") as HTMLElement;
var lineNumber = document.getElementById("phoneNumber") as HTMLElement;
var credit = document.getElementById("credito") as HTMLElement;
var displayScreen = document.getElementById("screen") as HTMLElement;
var callBtn = document.getElementById("callBtn") as HTMLElement;
var modal404 = document.getElementById("modal404") as HTMLElement;
var residuo = document.getElementById("residuo") as HTMLElement;
var totalCalls = document.getElementById("totalCalls") as HTMLElement;
var listUsers = document.querySelectorAll(".userId") as NodeList;
var listNumbers = document.querySelectorAll(".userPhoneNumber") as NodeList;
var loggedId:number = 0;
var users:User[] = [];
const simCards:number = 3;
const names:string[] = ["FirstUser", "SecondUser", "ThirdUser"];
dialNumber.value = "";
var interval:any;
var timer:number = 0;

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
    public tariffa:number = 0.20
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
    public numero404():any {
        return this.credito.toFixed(2);
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
    updateData();
}

function updateData() {
    userName.innerHTML = users[loggedId].name;
    lineNumber.innerHTML = users[loggedId].phoneNumber.toString();
    credit.innerHTML = users[loggedId].numero404().toString() + "&euro;"
    totalCalls.innerHTML = users[loggedId].getNumeroChiamate().toString();
    for (let i = 0; i < users.length; i++) {
        listUsers[i].textContent = users[i].name;
        listNumbers[i].textContent = users[i].phoneNumber.toString();
    }
}

function choose(x:number) {
    loggedId = x-1;
    updateData();
}

async function populateApp() {
    for (let i = 0; i < simCards; i++) {        
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

async function updateUser(user:User) {
    let response = await fetch('http://localhost:3000/users/' + user.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(user)
	});   
}

async function recharge(x:number) {
    users[loggedId].ricarica(x);
    console.log(users[loggedId].numero404());
}

powerBtn.addEventListener("click", turnScreenOnOff)

function turnScreenOnOff() {
    if (powerBtn.checked) {
        displayScreen.style.display = "none";
        display.style.border = "2px inset grey";
    } else {
        displayScreen.style.display = "block";
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

function openApp(app:string) {
    if (powerBtn.checked) {
        dialerApp.style.display = "none";
        vodafoneApp.style.display = "none";
        desktop.style.display = "none";
        if (app == "dialer") {
            dialerApp.style.display = "block";
            display.style.border = "none";
        }
        else if (app == "vodafone") {
            vodafoneApp.style.display = "block";
            display.style.border = "2px inset grey";
        }
        else {            
                desktop.style.display = "flex";
                display.style.border = "2px inset grey";            
        }
    }
}

function Call() {
    if (timer == 0 && dialNumber.value != "" && dialNumber.value != "404") {        
        dialNumber.value = "";
        interval = setInterval(()=>{            
            timer += 1;
            if ((users[loggedId].numero404() / users[loggedId].tariffa) <= Math.ceil(timer/60)) {
                clearInterval(interval);
                endCall();
            }
        }, 1000);
        checkCredit();
        callBtn.style.backgroundColor = "red";
    }
    else if (dialNumber.value == "404") {
        modal404.style.visibility = "visible";
        modal404.style.opacity = "1";
        residuo.innerHTML = users[loggedId].numero404() + "&euro;";        
        setTimeout(()=> {
            modal404.style.visibility = "hidden";
            modal404.style.opacity = "0"; 
        }, 2000);       
    }
    else {
        callBtn.style.backgroundColor = "#00bb66"
        endCall();
    }    
}

function checkCredit() {
    if (users[loggedId].numero404() <= 0) {
        endCall(); 
    }
}

async function endCall() {
    callBtn.style.backgroundColor = "#00bb66";
    clearInterval(interval);
    users[loggedId].chiamata(Math.ceil(timer/60));
    await updateUser(users[loggedId]);
    updateData();
    timer = 0;
}

function removeCalls() {
    users[loggedId].azzeraChiamate();
    updateData();
}













document.addEventListener('DOMContentLoaded', function () {    
    displayTime();
    setInterval(displayTime, 1000);    
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
  
  function month(month) {
    var monthNames = [ 'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return monthNames[month];
  }
  
  function day(day) {
    var dayNames = [ 'Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato' ];
    return dayNames[day];
  }
    
  function dayString(date:Date) {
    return day(date.getDay()) + ', ' + date.getDay() + ' ' + month(date.getMonth()) ;
  }
