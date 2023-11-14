const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];
let userListString;

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];

  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  let newUser = {
    "name": user.name.first + " " + user.name.last,
    "money": Math.random() * 10000
  };

  userList.push(newUser);

  userListString = JSON.stringify(userList);
  localStorage.setItem("users", userListString);
  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  let user = document.createElement("div");
  user.classList = "person";
  user.innerHTML = `
    <strong>${obj.name}</strong> ${formatMoney(obj.money)};
  `;
  main.appendChild(user);
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  let map = userList.map((element) => element.money * 2);
  let i = 0;
  userList.forEach(element => {
    element.money = map[i];
    i++
  });
  userListString = JSON.stringify(userList);
  localStorage.setItem("users", userListString);
  updateDOM(userList);
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  // TIP: Puedes usar sort()
  userList.sort((a, b) => {
    const moneyA = parseFloat(a.money);
    const moneyB = parseFloat(b.money);
    return moneyB - moneyA;
  });
  userListString = JSON.stringify(userList);
  localStorage.setItem("users", userListString);
  updateDOM(userList);
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  // TIP: Puedes usar filter()
  let filtrado = userList.filter((a) => a.money >= 1000000);
  userList = filtrado;
  userListString = JSON.stringify(userList);
  localStorage.setItem("users", userListString);
  updateDOM(userList);
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  // TIP: Puedes usar reduce ()
  let totalMoney = userList.reduce((accumulator, user) => {
    let moneyValue = user.money;
    return accumulator + moneyValue;
  }, 0);
  let total = document.createElement("div");
  total.classList = "person";
  total.innerHTML = `
    <strong>Dinero total</strong> ${formatMoney(totalMoney)};
  `;
  main.appendChild(total);
  localStorage.setItem("wealth", totalMoney);
}

// TODO: Función que actualiza el DOM
function updateDOM(list) {
  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero
  let elements = main.querySelectorAll("div");
  elements.forEach(element => {
    main.removeChild(element);
  });
  list.forEach(element => {
    addData(element);
  });
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
if (localStorage.getItem("users")) {
  let local = JSON.parse(localStorage.getItem("users"));
  userList = local;
  updateDOM(local);
} else {
  getRandomUser();
}

// TODO: Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);