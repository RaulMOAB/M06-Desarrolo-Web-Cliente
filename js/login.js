//inputs login
const userName = document.getElementById("loginName");
const password = document.getElementById("loginPass");

//inputs register
const newUserName = document.getElementById("newUserName");
const newAccName = document.getElementById("inputName");
const userPass = document.getElementById("inputPass");
const repeatPass = document.getElementById("repeatPass");

login.addEventListener("click", logIn);
register.addEventListener("click", sendNewUser);
logout.addEventListener("click", logOut);
/* search.addEventListener("click", searchFlight); */

/**
 * Login the user by passsing the user object to PHP
 * if the user exist the user can login and search a flight
 */
function logIn() {
  let username = userName.value;
  let user = {
    userName: username,
    password: password.value,
    role: "cliente",
    action: "login",
  };

  let userJSON = JSON.stringify(user);

  let xhr = new XMLHttpRequest();

  xhr.open("POST", "./php/server.php");

  xhr.send(userJSON);

  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      //console.log(response);
      if (response !== "error") {
        container.style.display = "none";
        logout.style.display = "block";
        loginBox.style.display = "none";
        // una vez el login es correcto
        bookAFlight();
      } else {
        document.getElementById("errorMessage").classList.remove("hidden");
      }
    }
  };
}

/**
 * Function to register new user by passing a new user object to PHP
 * if validations are succes
 */
function sendNewUser() {
  let fullUserName = newUserName.value.trim();
  let userAccName = newAccName.value;
  let password = userPass.value;
  let repeatPassword = repeatPass.value;

  let newUser = {
    newUserName: fullUserName,
    newUserAccName: userAccName,
    newPassword: password,
    action: "register", //
  };

  let nameValidation = validateFullName(fullUserName);
  let userAccValidation = validateUserAcc(userAccName);
  let passValidation = validatePassword(password);
  let checkPass = checkPasswords(password, repeatPassword);

  is_ok = nameValidation && userAccValidation && passValidation;

  if (is_ok && checkPass) {
    document.querySelector(".errRepeat").classList.add("hidden");

    let newUserJSON = JSON.stringify(newUser);

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "./php/server.php");

    xhr.send(newUserJSON);

    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.log(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        let response = JSON.parse(xhr.response);
        //console.log(response);
        if (response == "resgister") {
          //poner mensaje de usuario registrado

          container.style.display = "none";
        }
      }
    };
  } else {
    document.querySelector(".errRepeat").textContent =
      "Las contraseñas no coinciden";
    document.querySelector(".errRepeat").classList.remove("hidden");
  }
}

/**
 * Function to logout the page and return to the login form
 */
function logOut() {
  //location.reload();
  document.cookie = `username=myCookie; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  container.style.display = "flex";
  const form = document.getElementById("login-form");

  logout.style.display = "none";
  bookBox.style.display = "none";
  tableBox.style.display ="none";
  loginBox.style.display = "block";
 
  date.style.display="block"
  form.reset();
}
