const parent_container = document.getElementById("login-register");
const table_container = document.getElementById("box-table");
const date_container = document.getElementById("date-container");
const inputs = document.querySelectorAll("#passanger-form input");
const passangerBox = document.getElementById('passanger-container');


let from_to_tickets_selected = 0;
let flight_info, vuelo_ida, vuelo_vuelta; 

/* function buyTickets(table, selected_origin, selected_destination) {
  let prevButton = null;

  table.childNodes.forEach((element) => {
    element.addEventListener("click", (e) => {
      const button = e.target.nodeName === "BUTTON"; //check if clicked item is a button

      if (!button) {
        // if it is not a button do nothing
        return;
      }

      e.target.classList.add("active");

      if (prevButton !== null) {
        // if there is more than one button selected, remove the class active from the last
        from_to_tickets_selected--;
        prevButton.classList.remove("active");
      }
      from_to_tickets_selected++;

      let td = e.target.parentElement.parentElement.firstChild;//coge la salida en la tabla
      let hora_salida = td.textContent;
      let hora_llegada = td.nextSibling.textContent;
      let price = td.nextSibling.nextSibling.textContent
      let format_price = Number(price.replace("€",""));

      vuelo_ida={
        from:selected_origin,
        to:selected_destination,
        departure_from:hora_salida,
        arrival_from:hora_llegada,
        price:format_price
      }
      let vuelta = e.target.parentElement.parentElement.firstChild;
      console.log(vuelta);
      let hora_vuelta = vuelta.textContent;
      console.log(hora_vuelta);
      let hora_vuelta_llegada = vuelta.nextSibling.textContent;

       vuelo_vuelta={
        from:selected_destination,
        to:selected_origin,
        departure_from:hora_vuelta,
        arrival_from:hora_vuelta_llegada,       
        price:format_price
      } 
      
      

      if (from_to_tickets_selected === 2) {
        table_container.style.display = "none";
        date_container.style.display = "block";
        console.log(num_passanger);
        for (let index = 0; index < num_passanger; index++) {
          dinamicPassangerForm(index, vuelo_ida, vuelo_vuelta);
        }
      }
      prevButton = e.target; //add the currect active button
    });
  });
} */


const dinamicPassangerForm = function (index, vuelo_ida, vuelo_vuelta) {
  let container_form = document.createElement("div");
  let passanger_header = document.createElement("div");
  let phone_container = document.createElement("div");
  let h2 = document.createElement("h2");
  let span = document.createElement("span");
  let passanger_form = document.createElement("form");
  let div_name = document.createElement("div");
  let div_surName = document.createElement("div");
  let div_country = document.createElement("div");
  let div_prefix = document.createElement("div");
  let div_phone = document.createElement("div");
  let div_email = document.createElement("div");
  let div_privacity = document.createElement("div");
  let div_buttons = document.createElement("div");

  //Creation of labels
  let label_name = document.createElement("label");
  let label_surName = document.createElement("label");
  let label_country = document.createElement("label");
  let label_prefix = document.createElement("label");
  let label_phone = document.createElement("label");
  let label_email = document.createElement("label");
  let label_privacity = document.createElement("label");
  

  //Creation of inputs
  let input_name = document.createElement("input");
  let input_surName = document.createElement("input");
  let country_selection = document.createElement("select");
  let prefix_selection = document.createElement("select");
  let input_phone = document.createElement("input");
  let input_email = document.createElement("input");
  let input_checkBox = document.createElement("input");

  //Creation of some country options
  let blank = document.createElement("option");
  let spain = document.createElement("option");
  let england = document.createElement("option");
  let france = document.createElement("option");
  let italy = document.createElement("option");

  //Creation of prefixes
  let blank_prefix = document.createElement("option");
  let spain_prefix = document.createElement("option");
  let england_prefix = document.createElement("option");
  let france_prefix = document.createElement("option");
  let italy_prefix = document.createElement("option");

    div_buttons.setAttribute("id", "group-btns");

    submit_button = document.createElement("button");
    submit_button.textContent = "Enviar";
    submit_button.classList.add("passanger-btn");
    submit_button.setAttribute("type", "button");
    submit_button.disabled = true;
    div_buttons.appendChild(submit_button);
  

  //Adding content to element
  h2.textContent = `Datos del passajero ${index + 1}`;
  span.textContent = "Todos los campos son obligatorios";
  label_name.textContent = "Nombre";
  label_surName.textContent = "Apellidos";
  label_country.textContent = "País de residencia";
  label_prefix.textContent = "Prefijo";
  label_phone.textContent = "Teléfono";
  label_email.textContent = "Email";
  label_privacity.textContent = `He leído y acepto la Política de privacidad`;

  blank.textContent = "Selecciona país";
  spain.textContent = "Spain";
  england.textContent = "England";
  france.textContent = "France";
  italy.textContent = "Italy";

  spain_prefix.textContent = "+34";
  england_prefix.textContent = "+44";
  france_prefix.textContent = "+33";
  italy_prefix.textContent = "+39";

  //Adding values to options
  blank.setAttribute("value", "0");
  spain.setAttribute("value", "1");
  england.setAttribute("value", "2");
  france.setAttribute("value", "3");
  italy.setAttribute("value", "4");

  blank_prefix.setAttribute("value", "0");
  spain_prefix.setAttribute("value", "1");
  england_prefix.setAttribute("value", "2");
  france_prefix.setAttribute("value", "3");
  italy_prefix.setAttribute("value", "4");

  //Adding options to slelect element
  country_selection.appendChild(blank);
  country_selection.appendChild(spain);
  country_selection.appendChild(england);
  country_selection.appendChild(france);
  country_selection.appendChild(italy);

  prefix_selection.appendChild(blank_prefix);
  prefix_selection.appendChild(spain_prefix);
  prefix_selection.appendChild(england_prefix);
  prefix_selection.appendChild(france_prefix);
  prefix_selection.appendChild(italy_prefix);

  //Adding classes or id
  container_form.classList.add("passanger-container");
  container_form.setAttribute("id","passanger-container");
  phone_container.classList.add("row", "mt-3");
  passanger_header.classList.add("passanger-header");
  passanger_form.classList.add("row");
  passanger_form.setAttribute("id", "passanger-form");
  div_name.classList.add("col-6");
  div_surName.classList.add("col-6");
  div_country.classList.add("col-12", "mt-3");
  div_prefix.classList.add("col");
  div_phone.classList.add("col");
  div_email.classList.add("col", "mt-3");
  div_privacity.classList.add("col-12", "mt-4");
  div_buttons.classList.add("col-12", "mt-4");

  label_name.classList.add("form-label");
  label_name.setAttribute("for", "name");

  label_surName.classList.add("form-label");
  label_surName.setAttribute("for", "surName");

  label_country.classList.add("form-label");
  label_country.setAttribute("for", "country");
  country_selection.classList.add("form-select");

  label_prefix.classList.add("form-label");
  label_prefix.setAttribute("for", "prefix");
  prefix_selection.classList.add("form-select");
  label_phone.classList.add("form-label");
  label_phone.setAttribute("for", "passanger-phone");

  label_email.classList.add("form-label");
  label_email.setAttribute("for", "email");

  label_privacity.classList.add("form-label", "mx-1");
  label_privacity.setAttribute("for", "privacity");

  input_name.classList.add("form-control");
  input_name.setAttribute("type", "text");
  input_name.setAttribute("id", `passanger-name${index + 1}`);
  input_name.setAttribute("placeholder", "Escribe tu nombre");
  input_name.setAttribute("required", "");

  input_surName.classList.add("form-control");
  input_surName.setAttribute("type", "text");
  input_surName.setAttribute("id", `passanger-surName${index + 1}`);
  input_surName.setAttribute("placeholder", "Escribe tus appelidos");
  input_surName.setAttribute("required", "");

  input_phone.classList.add("form-control");
  input_phone.setAttribute("type", "tel");
  input_phone.setAttribute("required", "");

  input_email.classList.add("form-control");
  input_email.setAttribute("type", "email");
  input_email.setAttribute("placeholder", "ejemplo@gmail.com");
  input_email.setAttribute("required", "");

  input_checkBox.classList.add("form-check-input");
  input_checkBox.setAttribute("type", "checkbox");
  input_checkBox.setAttribute("required", "");

  //Append elements
  parent_container.appendChild(container_form);
  container_form.appendChild(passanger_header);
  container_form.appendChild(passanger_form);
  passanger_header.appendChild(h2);
  passanger_header.appendChild(span);
  div_name.appendChild(label_name);
  div_name.appendChild(input_name);
  div_surName.appendChild(label_surName);
  div_surName.appendChild(input_surName);
  div_country.appendChild(label_country);
  div_country.appendChild(country_selection);
  div_prefix.appendChild(label_prefix);
  div_prefix.appendChild(prefix_selection);
  phone_container.appendChild(div_prefix);
  phone_container.appendChild(div_phone);
  div_phone.appendChild(label_phone);
  div_phone.appendChild(input_phone);
  div_email.appendChild(label_email);
  div_email.appendChild(input_email);
  div_privacity.appendChild(input_checkBox);
  div_privacity.appendChild(label_privacity);

  //Appends to form
  passanger_form.appendChild(div_name);
  passanger_form.appendChild(div_surName);
  passanger_form.appendChild(div_country);
  passanger_form.appendChild(phone_container);
  passanger_form.appendChild(div_email);
  passanger_form.appendChild(div_privacity);
  passanger_form.appendChild(div_buttons);

  //validation
  input_name.addEventListener("blur", () => {
    is_name_ok = validateName(input_name.value);

    if (!is_name_ok) {
      input_name.classList.add("error");
      input_name.classList.remove("succes");
    } else {
      input_name.classList.remove("error");
      input_name.classList.add("succes");
    }
    enableSubmitButton();
  });

  input_surName.addEventListener("blur", () => {
    is_fullName_ok = validateFullName(input_surName.value);

    if (!is_fullName_ok) {
      input_surName.classList.add("error");
      input_surName.classList.remove("succes");
    } else {
      input_surName.classList.remove("error");
      input_surName.classList.add("succes");
    }
    enableSubmitButton();
  });

  input_email.addEventListener("blur", () => {
    is_valid_email = validateEmail(input_email.value);
    if (!is_valid_email) {
      input_email.classList.add("error");
      input_email.classList.remove("succes");
    } else {
      input_email.classList.remove("error");
      input_email.classList.add("succes");
    }
    enableSubmitButton();
  });

  input_phone.addEventListener("blur", () => {
    is_valid_phone = validatePhoneNumber(input_phone.value);
    if (!is_valid_phone) {
      input_phone.classList.add("error");
      input_phone.classList.remove("succes");
    } else {
      input_phone.classList.remove("error");
      input_phone.classList.add("succes");
    }
    enableSubmitButton();
  });

  country_selection.addEventListener("change", () => {
    if (
      country_selection.options[country_selection.selectedIndex].value !== 0
    ) {
      is_valid_country = true;
      country_selection.classList.remove("error");
      country_selection.classList.add("succes");
     
    } else {
      is_valid_country = false;
      country_selection.classList.add("error");
      country_selection.classList.remove("succes");
    }
    enableSubmitButton();
  });

  prefix_selection.addEventListener("change", () =>{
    if (prefix_selection.options[prefix_selection.selectedIndex].value !== 0) {
      is_valid_prefix = true;
      prefix_selection.classList.remove("error");
      prefix_selection.classList.add("succes");
    }else{
      is_valid_prefix = false;
      prefix_selection.classList.add("error");
      prefix_selection.classList.remove("succes");
    }
    enableSubmitButton();
  })

  input_checkBox.addEventListener('click',()=>{
    if (input_checkBox.checked) {
      is_checked = true;
    }else{
      is_checked = false;
    }
    enableSubmitButton();

  })

  submit_button.addEventListener('click',()=>{
    let vuelta = JSON.stringify(vuelo_vuelta);
    localStorage.setItem("vuelo_vuelta",vuelta);
    window.open("html/boradingPass.html?vuelo_ida=" + JSON.stringify(vuelo_ida));
    
  })
  
};

