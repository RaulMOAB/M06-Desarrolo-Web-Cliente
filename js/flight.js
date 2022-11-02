let get_dep_array, get_arrival_array, split_array, split_array2;


const dep_table = document.querySelector("tbody");
const arr_table = document.getElementById("vuelta");
let prevButton = null;
let prevButton_return = null

search.addEventListener("click", searchFlight);

function bookAFlight() {
  singupBox.style.display = "none";
  container.style.display = "flex";
  bookBox.style.display = "flex";

  option = {
    action: "search",
  };

  let xhr = new XMLHttpRequest();
  let optionJSON = JSON.stringify(option);
  xhr.open("POST", "./php/flight.php");
  xhr.send(optionJSON);

  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      console.log("conexion correcta");
      let response = JSON.parse(xhr.response); // si
      //console.log(response);
      //añade los aeropuertos a los select dinámicamente
      setDinamicOptions(response, origen);
      setDinamicOptions(response, destination);
      getSelectOption();
      getDates();
      getPassanger();
    }
  };
}

function searchFlight() {
  bookBox.style.display = "none";
  tableBox.style.display = "block";
  document.getElementById("date-container").style.display = "none";

  option = {
    action: "reserva",
    origin: selected_origin,
    destination: selected_destination,
  };

  let xhr = new XMLHttpRequest();
  let optionJSON = JSON.stringify(option);
  xhr.open("POST", "./php/flight.php");
  xhr.send(optionJSON);
  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      let response = JSON.parse(xhr.response);
      let arrivalDate = new Date(arrival_date);
      let departureDate = new Date(departure_date);

      departure_day.textContent = formatDateToTable(departureDate);
      arrival_day.textContent = formatDateToTable(arrivalDate);
      trip.textContent = `Compra tus billetes para ${selected_origin} -> ${selected_destination}`;

      //devuelve la posicion del dia seleccionado
      index_departure = departureDate.getDay();
      index_arrival = arrivalDate.getDay();

      get_dep_array = response.horas[index_departure];
      split_array = get_dep_array.split(","); //array con tastas posiciones como horas haya en el dia

      get_arrival_array = response.horas[index_arrival];
      split_array2 = get_arrival_array.split(",");

      formatArrayTime(split_array, response, dep_table);
      formatArrayTime(split_array2, response, arr_table);

   
      //buyTickets(dep_table, selected_origin, selected_destination);
      //buyTickets(arr_table, selected_origin, selected_destination);

      dep_table.addEventListener('click', (e)=>{
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
          price:format_price,
          num_passanger:num_passanger
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
      })
      

      arr_table.addEventListener('click', (e)=>{
        const button = e.target.nodeName === "BUTTON"; //check if clicked item is a button

        if (!button) {
          // if it is not a button do nothing
          return;
        }
  
        e.target.classList.add("active");
  
        if (prevButton_return !== null) {
          // if there is more than one button selected, remove the class active from the last
          from_to_tickets_selected--;
          prevButton_return.classList.remove("active");
        }
        from_to_tickets_selected++;
  
        let vuelta = e.target.parentElement.parentElement.firstChild;      
        let hora_vuelta = vuelta.textContent;
        let hora_vuelta_llegada = vuelta.nextSibling.textContent;
        let price = vuelta.nextSibling.nextSibling.textContent
        let format_price = Number(price.replace("€",""));
  
         vuelo_vuelta={
          from:selected_destination,
          to:selected_origin,
          departure_from:hora_vuelta,
          arrival_from:hora_vuelta_llegada,       
          price:format_price,
          num_passanger:num_passanger
        } 
        
        
  
        if (from_to_tickets_selected === 2) {
          table_container.style.display = "none";
          date_container.style.display = "block";
          
          for (let index = 0; index < num_passanger; index++) {
            dinamicPassangerForm(index, vuelo_ida, vuelo_vuelta);
          }
        }
        prevButton_return = e.target; //add the currect active button
      })
    }
  };
}

/**********************************FUNCTIONS***************************************/

/**
 * Function to get the selected option by user
 * user selects the origin airport and de destination airport
 */
function getSelectOption() {
  //captura el texto del select
  origen.addEventListener("change", () => {
    //selected_destination = destination.options[0].text;
    selected_origin = origen.options[origen.selectedIndex].text;
    // console.log("Origen " + selected_origin);
    is_valid_origin_and_destination = validateOptions(
      selected_origin,
      selected_destination
    );

    enableButton();
  });

  destination.addEventListener("change", () => {
    // selected_origin = origen.options[0].text;
    selected_destination = destination.options[destination.selectedIndex].text;
    //console.log("Destino " + selected_destination);
    is_valid_origin_and_destination = validateOptions(
      selected_origin,
      selected_destination
    );
    //console.log(is_ok);
    enableButton();
  });
}

/**
 * Funtion that get the dates introduced by the user
 */
const getDates = function () {
  idaDate.addEventListener("focusout", () => {
    departure_date = idaDate.value;
    //console.log(departure_date);
    is_valid_dates = validateDates(departure_date, arrival_date);
    enableButton();
  });

  vueltaDate.addEventListener("focusout", () => {
    arrival_date = vueltaDate.value;
    is_valid_dates = validateDates(departure_date, arrival_date);
    //console.log(arrival_date);
    enableButton();
  });
};

/**
 * Function to get the number of passangers itroduced by user
 */
const getPassanger = function () {
  passangers.addEventListener("blur", () => {
    num_passanger = Number(passangers.value);
    is_valid_num = validatePassanger(num_passanger);
    enableButton();
  });
};

/**
 * Function that validates if the airports selected are equals or not
 * @param {*} selected_origin Validates the origin selection by user
 * @param {*} selected_destination Validates the destination airport
 * @returns tru or false
 */
const validateOptions = function (selected_origin, selected_destination) {
  if (selected_origin !== selected_destination) {
    is_valid_origin_and_destination = true;
    document.getElementById("errMsg").textContent = "";
  } else {
    is_valid_origin_and_destination = false;
    document.getElementById("errMsg").textContent =
      "Los aeropuertos deben ser diferentes";
  }

  return is_valid_origin_and_destination;
};

/**
 * Validation of the user's dates
 * departure date can not be before today
 * both departure date and arrival date can not be more than 6 month sice today
 * @param {*} departure Date of departure
 * @param {*} arrival Date of arrival
 * @returns true or false
 */
const validateDates = (departure, arrival) => {
  const departureDate = new Date(departure);
  const arrivalDate = new Date(arrival);
  const currentDate = new Date();

  if (departureDate >= currentDate && arrivalDate >= departureDate) {
    //console.log("fecha futura y llegada posterior a la salida");
    const add_six_month = currentDate.setMonth(currentDate.getMonth() + 6);
    //console.log(add_six_month);
    if (
      departureDate.getTime() > add_six_month ||
      arrivalDate.getTime() > add_six_month
    ) {
      console.log("fecha mayor a 6 meses");
      is_valid_dates = false;
    } else {
      is_valid_dates = true;
    }
  } else {
    is_valid_dates = false;
    //console.log("fecha pasada o llegada anterior a la salida");
  }

  return is_valid_dates;
};

/**
 * Function that display the options of the select html element dinamically
 * @param {*} response array from PHP with all the airports
 * @param {*} select the user selection
 */
const setDinamicOptions = (response, select) => {
  response.forEach((element, index) => {
    let options = document.createElement("option");
    options.setAttribute("value", `${index + 1}`);
    options.textContent = element;
    select.appendChild(options);
  });
  is_valid_origin_and_destination;
};

/**
 * Set the selected dates in to the table when the info is displayed
 * @param {*} date_toSet date to put in to table
 */
const setDateTotable = function (date_toSet) {
  date_toSet.textContent += ` ${weekday} ${num_weekday} de ${month}`;
};

/**
 * Function that format a date object to a date like weekday->friday
 * day->numeric(21)
 * month->october
 * @param {*} date date to format 
 * @returns day 21 of month
 */
const formatDateToTable = function (date) {
  weekday = date.toLocaleString("es", { weekday: "long" });
  num_weekday = date.toLocaleString("es", { day: "numeric" });
  month = date.toLocaleString("es", { month: "long" });
  index_departure = date.getDay();
  return ` ${weekday} ${num_weekday} de ${month}`;
};

/**
 * Formatea el array recibido de PHP con las horas de llegada calculadas y los precios y los añade a
 * las tablas dinámicamente
 * @param {*} split_array  posicion del dia de la semana seleccionado
 * @param {*} response array de PHP con la info de los vuelos
 * @param {*} table la tabla a la que se añadira dinámicamente la información
 */
const formatArrayTime = function (split_array, response, table) {
  split_array.forEach((element) => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td_llegada = document.createElement("td");
    let td_btn = document.createElement("td");
    let buyBtn = document.createElement("button");
    

    buyBtn.setAttribute("class", "buy");
    buyBtn.textContent = `${response.flight_info.price}€`;

    td.textContent = `${element}h`;

    tr.appendChild(td);
    tr.appendChild(td_llegada);
    td_btn.appendChild(buyBtn);
    tr.appendChild(td_btn);

    table.appendChild(tr);

    let split_hours = element.split(":");
    let hour = Number(split_hours[0]);
    let minutes = Number(split_hours[1]);

    let fligth_duration = response.flight_info.duration; // devuelve los minutos de vuelo

    if (fligth_duration > 60) {
      let remain_minutes = fligth_duration - 60;
      hour++;
      minutes += remain_minutes;
    } else {
      minutes += fligth_duration;
    }

    if (minutes < 9) {
      minutes = `0${minutes}`;
    }
    td_llegada.textContent = `${hour}:${minutes}h`;
  });
};
