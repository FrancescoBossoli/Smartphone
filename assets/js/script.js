var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var powerBtn = document.getElementById("power");
var display = document.querySelector(".screen-smartphone");
var dialNumber = document.getElementById("dialNumber");
var dialerApp = document.getElementById("dialerApp");
var vodafoneApp = document.getElementById("vodafoneApp");
var desktop = document.getElementById("desktop");
var userName = document.getElementById("username");
var lineNumber = document.getElementById("phoneNumber");
var credit = document.getElementById("credito");
var displayScreen = document.getElementById("screen");
var callBtn = document.getElementById("callBtn");
var modal404 = document.getElementById("modal404");
var residuo = document.getElementById("residuo");
var totalCalls = document.getElementById("totalCalls");
var listUsers = document.querySelectorAll(".userId");
var listNumbers = document.querySelectorAll(".userPhoneNumber");
var loggedId = 0;
var users = [];
var simCards = 3;
var names = ["FirstUser", "SecondUser", "ThirdUser"];
dialNumber.value = "";
var interval;
var timer = 0;
var User = /** @class */ (function () {
    function User(_credito, _numeroChiamate) {
        if (_credito === void 0) { _credito = 0; }
        if (_numeroChiamate === void 0) { _numeroChiamate = 0; }
        this.tariffa = 0.20;
        this.credito = _credito;
        this.numeroChiamate = _numeroChiamate;
    }
    User.prototype.ricarica = function (amount) {
        this.credito += amount;
    };
    User.prototype.chiamata = function (minutes) {
        this.credito -= (this.tariffa * minutes);
        this.numeroChiamate++;
    };
    User.prototype.numero404 = function () {
        return this.credito.toFixed(2);
    };
    User.prototype.getNumeroChiamate = function () {
        return this.numeroChiamate;
    };
    User.prototype.azzeraChiamate = function () {
        this.numeroChiamate = 0;
    };
    return User;
}());
window.addEventListener("DOMContentLoaded", init);
function init() {
    var _this = this;
    fetch('http://localhost:3000/users').then(function (response) {
        return response.json();
    }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
        var array;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = data;
                    if (!(array.length == 1 && array[0].id == 404)) return [3 /*break*/, 2];
                    return [4 /*yield*/, populateApp()];
                case 1:
                    _a.sent();
                    init();
                    _a.label = 2;
                case 2:
                    useData(array);
                    return [2 /*return*/];
            }
        });
    }); });
}
function useData(array) {
    for (var i = 0; i < array.length; i++) {
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
    credit.innerHTML = users[loggedId].numero404().toString() + "&euro;";
    totalCalls.innerHTML = users[loggedId].getNumeroChiamate().toString();
    for (var i = 0; i < users.length; i++) {
        listUsers[i].textContent = users[i].name;
        listNumbers[i].textContent = users[i].phoneNumber.toString();
    }
}
function choose(x) {
    loggedId = x - 1;
    updateData();
}
function populateApp() {
    return __awaiter(this, void 0, void 0, function () {
        var i, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < simCards)) return [3 /*break*/, 4];
                    user = new User(Math.floor(Math.random() * 11));
                    user.name = names[i];
                    user.id = i + 1;
                    user.phoneNumber = parseInt("34" + Math.floor((Math.random() + (Math.floor(Math.random() * 10) + 1)) * (Math.pow(10, 7))));
                    users.push(user);
                    return [4 /*yield*/, addUser(user)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, deletePlaceholder()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/users/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deletePlaceholder() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/users/404', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(users)
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/users/' + user.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(user)
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function recharge(x) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users[loggedId].ricarica(x);
                    return [4 /*yield*/, updateUser(users[loggedId])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
powerBtn.addEventListener("click", turnScreenOnOff);
function turnScreenOnOff() {
    if (powerBtn.checked) {
        displayScreen.style.display = "none";
        display.style.border = "2px inset grey";
    }
    else {
        displayScreen.style.display = "block";
        display.style.border = "none";
    }
}
function writeDigit(digit) {
    dialNumber.value += digit;
}
function deleteCharacter() {
    dialNumber.value = dialNumber.value.slice(0, -1);
}
function displayHome() {
    if (powerBtn.checked) {
        dialerApp.style.display = "none";
        vodafoneApp.style.display = "none";
        display.style.backgroundColor = "#fff";
        display.style.border = "2px inset grey";
    }
}
function openApp(app) {
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
function call() {
    if (timer == 0 && dialNumber.value != "" && dialNumber.value != "404") {
        dialNumber.value = "";
        interval = setInterval(function () {
            timer += 1;
            if ((users[loggedId].numero404() / users[loggedId].tariffa) <= Math.ceil(timer / 60)) {
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
        setTimeout(function () {
            modal404.style.visibility = "hidden";
            modal404.style.opacity = "0";
        }, 2000);
    }
    else {
        callBtn.style.backgroundColor = "#00bb66";
        endCall();
    }
}
function checkCredit() {
    if (users[loggedId].numero404() <= 0) {
        endCall();
    }
}
function endCall() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callBtn.style.backgroundColor = "#00bb66";
                    clearInterval(interval);
                    users[loggedId].chiamata(Math.ceil(timer / 60));
                    return [4 /*yield*/, updateUser(users[loggedId])];
                case 1:
                    _a.sent();
                    updateData();
                    timer = 0;
                    return [2 /*return*/];
            }
        });
    });
}
function removeCalls() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    users[loggedId].azzeraChiamate();
                    return [4 /*yield*/, updateUser(users[loggedId])];
                case 1:
                    _a.sent();
                    updateData();
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener('DOMContentLoaded', function () {
    displayTime();
    setInterval(displayTime, 1000);
});
function displayTime() {
    var now = new Date();
    document.getElementById('time').innerHTML = now.getHours() +
        ':' + checkTime(now.getMinutes());
    document.getElementById('date').innerHTML = dayString(now);
}
function checkTime(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}
function month(month) {
    var monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    return monthNames[month];
}
function day(day) {
    var dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
    return dayNames[day];
}
function dayString(date) {
    return day(date.getDay()) + ', ' + date.getDate() + ' ' + month(date.getMonth());
}
