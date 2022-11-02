let parent = document.querySelector('nav');
const params = new URLSearchParams(location.search);
const vuelo_ida = JSON.parse(params.get('vuelo_ida'));// consigo vuelo de ida
console.log(vuelo_ida);
let getObj = localStorage.getItem("vuelo_vuelta");
let vuelo_vuelta = JSON.parse(getObj);// consigo vuelo de vuelta
console.log(vuelo_vuelta);

