//GLOBAL VARIABLES

let is_ok = false;
let is_name_ok = false;
let is_fullName_ok = false;
let is_acc_name_ok = false;
let is_pass_ok = false;
let is_valid_origin_and_destination = false;
let is_valid_dates = false;
let is_valid_num = false;
let is_valid_email = false;
let is_valid_phone = false;
let is_valid_country = false;
let is_valid_prefix = false;
let is_checked = false;



/*****************************FUNCTIONS*****************************/

/**
 * Funtion that validates the num of passangers is between 1 and 3
 * @param {*} num_passanger input of number of passangers
 * @returns true or false
 */
const validatePassanger = (num_passanger) => {
  if (!(num_passanger <= 0 || num_passanger > 3 || isNaN(num_passanger))) {
    is_valid_num = true;
  } else {
    is_valid_num = false;
  }
  return is_valid_num;
};
/**
 * Function that compares the pasasnger name with a regular expression
 * @param {*} input_name input of the passanger's name
 * @returns true or false
 */
const validateName = function(input_name){
  const regExp = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/;

  if (regExp.test(input_name)) {
    console.log('nombre pasajero valido');
    is_name_ok = true;
  }else{
    console.log('nombre invalido');
    is_name_ok = false;
  }
  return is_name_ok;
}


/**
 * Function that validates if the user's full name is equals to a regular expression
 * @param {*} fullName user's name and surname
 * @returns true or false
 */
const validateFullName = (fullName) => {
  const regExp = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;

  if (regExp.test(fullName)) {
    document.querySelector(".errName").classList.add("hidden");
    is_fullName_ok = true;
  } else {
    document.querySelector(".errName").classList.remove("hidden");
    is_fullName_ok = false;
  }
  return is_fullName_ok;
};
/**
 * Function that validates if an email is valid or not
 * @param {*} input_email user email
 * @returns true or false
 */
const validateEmail = (input_email)=>{
  const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (regExp.test(input_email)) {   
    is_valid_email = true;
  }else{
    is_valid_email = false;
  }
  return is_valid_email;
}
/**
 * Function that validates a phone number tested with a regular expression
 * works only on spanish phone number
 * @param {*} input_phone phone number
 * @returns true or false
 */
const validatePhoneNumber = (input_phone)=>{
  const regExp = /^[679]{1}[0-9]{8}$/; //solo números españoles

  if (regExp.test(input_phone)) {
    is_valid_phone = true;
  }else{
    is_valid_phone = false;
  }
  return is_valid_phone;
}

/**
 * Funtion that validates if user's account name is valid by a regular expression
 * @param {*} userAcc name of the account
 * @returns true or false
 */
const validateUserAcc = (userAcc) => {
  const regEx = /^[a-z0-9_-]{3,16}$/;
  if (regEx.test(userAcc)) {
    document.querySelector(".errUseName").classList.add("hidden");
    is_acc_name_ok = true;
  } else {
    document.querySelector(".errUseName").classList.remove("hidden");
    is_acc_name_ok = false;
  }
  return is_acc_name_ok;
};

/**
 * Function that validates if password passed by user matches a regular expression
 * @param {*} password user's password
 * @returns true or false
 */
const validatePassword = (password) => {
  const regEx = /\w+$/;

  if (password.length > 8) {
    if (regEx.test(password)) {
      document.querySelector(".errPass").classList.add("hidden");
      is_pass_ok = true;
    }
  } else {
    document.querySelector(".errPass").classList.remove("hidden");
    is_pass_ok = false;
  }
  return is_pass_ok;
};

/**
 * Funtion to validate if both passwords are equals or not
 * @param {*} pass1 user's password
 * @param {*} pass2 repeat password
 * @returns true or false;
 */
const checkPasswords = (pass1, pass2) => {
  return pass1 === pass2 ? true : false;
};

/**
 * Function thah enable a button if all the previous validations are true
 * if not, the button continues dessabled
 */
const enableButton = function () {
  is_ok = is_valid_origin_and_destination && is_valid_dates && is_valid_num;
  if (is_valid_origin_and_destination && is_valid_dates && is_valid_num) {
    search.disabled = false;
  } else {
    search.disabled = true;
  }
};

const enableSubmitButton = function (){
  if (is_name_ok && is_fullName_ok && is_valid_country && is_valid_prefix && is_valid_phone && is_valid_email && is_checked) {
    document.querySelector('.passanger-btn').disabled = false;
  }else{
    document.querySelector('.passanger-btn').disabled = true;
  }
};


