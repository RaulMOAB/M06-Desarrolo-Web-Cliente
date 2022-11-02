//date
const dateNumber = document.getElementById("dateNumber");
const dateMonth = document.getElementById("dateMonth");
const dateYear = document.getElementById("dateYear");
const dateTime = document.getElementById("dateTime");
const dayText = document.getElementById("dayText");


//inputs search flight
const origen = document.getElementById("airports0");
const destination = document.getElementById("airports");
const idaDate = document.getElementById("ida-date");
const vueltaDate = document.getElementById("vuelta-date");
const passangers = document.getElementById("passanger");

//buttons
const register = document.getElementById("register");
const login = document.getElementById("login");
const notAcnt = document.getElementById("registro");
const arleadyAcnt = document.getElementById("alreadyAcnt");
const cookieBtn = document.getElementById("agree-btn");
const logout = document.getElementById("logout");
const search = document.getElementById("search");


//Boxes
const container = document.getElementById("login-register");
const loginBox = document.getElementById("login-box");
const singupBox = document.getElementById("singup-box");
const login_form = document.getElementById("login-form");
const singup = document.getElementById("singup-box");
const bookBox = document.getElementById("book-box");
const tableBox = document.getElementById("box-table");
const date = document.getElementById('date-container');
const boardingContainer = document.getElementById('boarding-container');



//Table
let departure_day = document.getElementById("dep-day");
let departure_time = document.getElementById("dep-time");
let arrival_day = document.getElementById("arr-day");
let arrival_time = document.getElementById("arr-time");
let departure_airport = document.getElementById("dep-air");
let arrival_airport = document.getElementById("arr-air");
let trip = document.getElementById('trip');

//GLOBAL VARIABLES
let selected_origin;
let selected_destination;
let departure_date;
let arrival_date;
let num_passanger;
let option; //objeto
let weekday, num_weekday, month, index_departure;

let weekday2, num_weekday2, month2, index_arrival;



search.disabled = true;
logout.style.display = "none";
singup.style.display = "none";
bookBox.style.display = "none";
tableBox.style.display = "none";
boardingContainer.style.display = "none";

/**
 * Switch login and register
 */
notAcnt.addEventListener("click", () => {
  loginBox.style.display = "none";
  singupBox.style.display = "block";
});
arleadyAcnt.addEventListener("click", () => {
  loginBox.style.display = "block";
  singupBox.style.display = "none";
});
/** 
 * Event to close cookie window
 */
cookieBtn.addEventListener("click", () => {
  //cerrar ventana cookies
  document.querySelector(".cookies-container").classList.add("hidden");
});

/**
 * Function to set the local time 
 */
function setDate() {
  const date = new Date();
  dateNumber.textContent = date.toLocaleString("es", { day: "numeric" });
  dateMonth.textContent = date.toLocaleString("es", { month: "short" });
  dateYear.textContent = date.toLocaleString("es", { year: "numeric" });
  dayText.textContent = date.toLocaleString("es", { weekday: "long" });
}

/**
 * Format the current time to hh:mm:ss
 */
function currentDate() {
  const date = new Date();
  let hour, minutes, seconds;
  hour = String(date.getHours()).padStart(2, "0");
  minutes = String(date.getMinutes()).padStart(2, "0");
  seconds = String(date.getSeconds()).padStart(2, "0");

  dateTime.textContent = hour + " : " + minutes + " : " + seconds;
  setTimeout(currentDate, 1000);
}
setDate();
currentDate();

//CREATE A COOKIE
document.cookie = `username=myCookie`;

/* login.addEventListener("click", logIn); */
/* register.addEventListener("click", sendNewUser); */
/* logout.addEventListener("click", logOut); */
/* search.addEventListener("click", searchFlight); */





