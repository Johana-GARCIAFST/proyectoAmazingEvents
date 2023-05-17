const fechaBase = []
const eventos = []
const eventosFuturos = []
const eventosPasados = []
let checkedCheckboxes = []
var arrayAfiltrar = []
var arrayNav = []
let search = ""
var tiempo = location.search.split("?tiempo=")
var buttonNav = document.getElementsByClassName("buttonNavegation")
var buscador = document.getElementById("submit");


var contenedorBusqueda = document.getElementById("buscador")
let cardTarjeta = document.getElementById("tarjetas")

async function getData() {
  let datosApi
  let eventosApi
  let fechaBaseApi
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
    .then(response => response.json())
    .then(json => datosApi = json)
  console.log(datosApi);

  eventosApi = datosApi.eventos
  fechaBaseApi = datosApi.fechaActual
  fechaBase.push(...fechaBaseApi)
  eventos.push(...eventosApi)
  eventosFuturos.push(...eventosApi.filter(evento => evento.date > fechaBaseApi))
  eventosPasados.push(...eventosApi.filter(evento => evento.date < fechaBaseApi))
  display(eventos)
   eventsCategories(eventos)
   recorrePage()
}
getData()

console.log(fechaBase);
console.log(eventos);
console.log(eventosFuturos);
console.log(eventosPasados);

for (i = 0; i < buttonNav.length; i++) {
  const element = buttonNav[i];
  arrayNav.push(buttonNav[i].innerText);
  element.addEventListener("click", function (e) {
    imprimir(e.target.id);
  })
}


function imprimir(id) {
  console.log(id);
  switch (id) {
    case "upcoming":

      document.getElementById("titulo").innerHTML = "Upcoming"
      contenedorBusqueda.style.display = "flex"
      eventsCategories(eventosFuturos)
      buscador.value = ""
      arrayAfiltrar = eventosFuturos
      display(eventosFuturos)
      break;
    case "past":
      document.getElementById("titulo").innerHTML = "Past"
      eventsCategories(eventosPasados)
      contenedorBusqueda.style.display = "flex"
      buscador.value = ""
      arrayAfiltrar = eventosPasados;
      display(eventosPasados)
      break;
    case "contacts":
      contenedorBusqueda.style.display = "none"
      document.getElementById("titulo").innerHTML = "Contacts"

      cardTarjeta.innerHTML = `
    <form class="contact" id="formulario" action="" method="get">
    <label for="nombre">Nombre:</label>
    <input type="text" name="name" id="nombre" placeholder="Ingresa tu nombre">
    <label for="email">Email:</label>
    <input type="email" name="email" id="email" placeholder="ingresa tu email">
    <label for="mansaje">Mensaje:</label>
    <textarea name="message" id="mensaje" cols="30" rows="5" placeholder="ingresa tu consulta"></textarea>
    <input class="submit" type="submit" value="Enviar">
  </form>
  <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>¡Gracias por enviar tu información!</p>
  </div>
  </div>
  `
      let form = document.querySelector("form")
      const modal = document.querySelector('#myModal');
      const closeBtn = document.querySelector('.close');
      form.addEventListener("submit", (evento) => { formData (evento)
    
        modal.style.display = 'block';

      })

      function modalform() {
        modal.style.display = "none";
        location.reload()
      }




      closeBtn.addEventListener('click', modalform);

      window.addEventListener('click', (event) => {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      });



      break;


    case "stats":
      contenedorBusqueda.style.display = "none"
      document.getElementById("titulo").innerHTML = "Stats"
      cardTarjeta.innerHTML = `
    <table>
            <tr>
                <th colspan="6">Events estadistics</th>
            </tr>
            <tr class="tabla">
                <td>Events with the higthest porcentage afterdance</td>
                <td>Events with the lowest porcentage afterdance</td>
                <td>Events with large capacity</td>
            </tr>
            <tr id="mayoresymenores">
                
            </tr>
    </table>
    <table id="statsFuturos">        
            
            <tr>
                <th colspan="6">
                    Upcoming Events stadistics by category
                </th>
            </tr>
            <tr class="tabla">
                <td>Categories</td>
                <td>Estimate</td>
                <td>Porcentage of estimate</td>
            </tr>
            <tr>
                
            </tr>
     </table> 
     <table id="statsPasados">      
            <th colspan="6">
                Past Events stadistics by category
            </th>      
            <tr class="tabla">
                <td>Categories</td>
                <td>Revenues</td>
                <td>Porcentage of afterdance</td>
            </tr>
        </table>
    `
      stats()

      break

    default:
      document.getElementById("titulo").innerHTML = "Home"
      contenedorBusqueda.style.display = "flex"
      eventsCategories(eventos)
      buscador.value = ""
      arrayAfiltrar = eventos;
      display(eventos)

  }
 

}
function display(array) {
  var html = "";
  for (var i = 0; i < array.length; i++) {
    html +=
      `<div class="targetUnic">
                    <picture>
                        <img src="${array[i].image}" alt="${array[i].name}">
                    </picture>
                    <h2>${array[i].name}</h2>
                    <p> descripcion </p>
                    <div class="tarjetabaja">
                        <p>price<br>
                        $${array[i].price}
                        </p>
                       <a href="./html/detalles.html?id=${array[i].id}"> <input type="submit" value="Ver más"> </a>
                    </div>

                </div>`

  }
  cardTarjeta.innerHTML = html
}

imprimir(eventos)


function recorrePage (){
switch (tiempo[1]) {
  case "past":
    imprimir("past")
    break;
  case "upcoming":
    imprimir("upcoming")
    break;
  case "stats":
    imprimir("stats")
    break;
  case "contacts":
    imprimir("contacts")
    break;
  default:
    imprimir("home")

}}
buscador.addEventListener("keyup", function (evento) {
  var datoInput = evento.target.value
  search = datoInput.trim().toLowerCase()

  filtrosFusionados()

})

function eventsCategories(array) {
  let categories = array.map(evento => evento.category)
  let unica = new Set(categories)

  let lastCategories = [...unica]

  let categoriasEventos = ""
  lastCategories.map(evento =>

    categoriasEventos +=
    `<label> <input type="checkbox" value="${evento}"> ${evento} </label>
    `
  )
  document.getElementById("checkCategories").innerHTML = categoriasEventos
  checkboxListener()
}

function checkboxListener() {
  var checkbox = document.querySelectorAll('input[type=checkbox]')


  for (let index = 0; index < checkbox.length; index++) {
    checkbox[index].addEventListener("change", function (e) {
      checkedCheckboxes = []
      for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          checkedCheckboxes.push(checkbox[i].value)
        }
      }
      var porCategorias = []
      checkedCheckboxes.map(category => {
        let test = arrayAfiltrar.filter(evento => evento.category === category)
        porCategorias.push(...test)


      })
      filtrosFusionados()

    })

  }
}

function filtrosFusionados() {
  var filtrado = []
  if (search !== "" && checkedCheckboxes.length > 0) {
    checkedCheckboxes.map(category => filtrado.push(...arrayAfiltrar.filter(evento =>
      evento.name.toLowerCase().includes(search) && evento.category === category)
    ))

  }
  else if (search !== "" && checkedCheckboxes.length == 0) {
    filtrado = arrayAfiltrar.filter(evento => evento.name.toLowerCase().includes(search))

  }

  else if (search === "" && checkedCheckboxes.length > 0) {
    filtrado = []
    checkedCheckboxes.map(category => filtrado.push(...arrayAfiltrar.filter(evento =>
      evento.category === category)))


  }
  else {
    filtrado = arrayAfiltrar
  }

  filtrado.length > 0 ? display(filtrado)
    : cardTarjeta.innerHTML = "<h1>NO SE ENCONTRARON RESULTADOS PARA TU BUSQUEDA</h1>"
}



// <=======flechas====>


var buttonD = document.getElementById("flechaDerecha")
buttonD.addEventListener("click", function (e) {
  var pagina = document.getElementById("titulo").innerText
  if (arrayNav.indexOf(pagina) < 4) {
    flechaDerecha(arrayNav.indexOf(pagina) + 1);
  } else {
    flechaDerecha(0)
  }
})

function flechaDerecha(i) {
  switch (i) {
    case 0:
      imprimir("home")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 1:
      imprimir("upcoming")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 2:
      imprimir("past")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 3:
      imprimir("contacts")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    default:
      imprimir("stats")
  }
}

var buttonI = document.getElementById("flechaIzquierda")
buttonI.addEventListener("click", function (e) {
  var pagina = document.getElementById("titulo").innerText
  if (arrayNav.indexOf(pagina) <= 4) {
    flechaIzquierda(arrayNav.indexOf(pagina) - 1);
  } else {
    flechaIzquierda(0)
  }
})

function flechaIzquierda(i) {
  switch (i) {
    case 0:
      imprimir("home")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 1:
      imprimir("upcoming")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 2:
      imprimir("past")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    case 3:
      imprimir("contacts")
      document.getElementById("titulo").innerHTML = arrayNav[i]
      break;
    default:
      imprimir("stats")
  }
}
// <----form---->

function formData(evento){
evento.preventDefault()
let capturaDatos ={

    nombre: evento.target[0].value,
    mail:evento.target[1].value,
    mensaje:evento.target[2].value

}


}



// <--- stats---->
async function stats() {

  var categorias = []

  var unique = eventos.map(evento => evento.category)
  const quitoRepetidas = new Set(unique)
  categorias = [...quitoRepetidas]

  var porCategoria = []

  categorias.forEach(categoria => {
    porCategoria.push(
      {
        categoria: categoria,
        data: eventos.filter(evento => evento.category === categoria)
      }
    )
  })

  var ingresoYassitencia = []

  porCategoria.map(datos => {
    ingresoYassitencia.push({
      categoria: datos.categoria,
      ingreso: datos.data.map(item => item.assistance ? item.assistance * item.price : 0),
      estimacionIngreso: datos.data.map(item => item.estimate ? item.estimate * item.price : 0),
      asistencia: datos.data.map(item => item.assistance ? item.assistance : 0),
      estimacionAsistencia: datos.data.map(item => item.estimate ? item.estimate : 0),
      capacidad: datos.data.map(item => item.capacity ? item.capacity : 0)
    })
  })
  console.log(ingresoYassitencia)
  ingresoYassitencia.forEach(categoria => {

    let totalAsistencia = 0
    let totalAsistenciaEstimada = 0
    let totalCapacidadPasados = 0
    let totalCapacidadFuturos = 0

    for (var i = 0; i < categoria.ingreso.length; i++) {

      if (categoria.ingreso[i] > 0) {
        totalCapacidadPasados += categoria.capacidad[i]
        totalAsistencia += categoria.asistencia[i]
        categoria.totalCapacidadPasados = totalCapacidadPasados
        categoria.totalAsistencia = totalAsistencia

      } else {
        totalCapacidadFuturos += categoria.capacidad[i]
        totalAsistenciaEstimada += categoria.estimacionAsistencia[i]
        categoria.totalCapacidadFuturos = totalCapacidadFuturos
        categoria.totalAsistenciaEstimada = totalAsistenciaEstimada
      }
    }
    categoria.porcentajeDeAsistencia = "%" +((totalAsistencia * 100) / totalCapacidadPasados).toFixed(2)
    categoria.porcentajeDeEstimacion = "%" + ((totalAsistenciaEstimada * 100) / totalCapacidadFuturos).toFixed(2)

    let totalIngreso = 0
    categoria.ingreso.map(ingresos => totalIngreso += ingresos)
    categoria.ingresos = totalIngreso

    let totalIngresoEstimado = 0
    categoria.estimacionIngreso.map(ingresosEstimados => totalIngresoEstimado += ingresosEstimados)
    categoria.estimacionIngresos = totalIngresoEstimado

  })
  let eventosPasados=[]
  let eventosFuturos=[]
  await eventos.filter( evento=> {if(evento.assistance){eventosPasados.push(evento)
  }else{ eventosFuturos.push(evento)}

})

  await eventosPasados.filter(evento =>{
    evento.porcentajeAsistencia = evento.assistance*100/evento.capacity
  })
  
  let mayorCapacidad = eventos.sort((a,b)=>{return b.capacity - a.capacity})

  let asisteciaEventos=[]

 eventosPasados.filter(evento =>{asisteciaEventos.push(evento.porcentajeAsistencia)})

let mayor = Math.max(...asisteciaEventos)
let eventoMayorAsistencia = eventos.filter( evento => evento.porcentajeAsistencia===mayor)

let menor = Math.min(...asisteciaEventos)
let eventoMenorAsistencia = eventos.filter( evento => evento.porcentajeAsistencia===menor)

console.log(eventoMenorAsistencia);

  var rowMayoresyMenores= document.getElementById("mayoresymenores")
  var tdMayorAsistencia= document.createElement("td")
  var tdMenorAsistencia= document.createElement("td")
  var tdMayorCapacidad= document.createElement("td")
  

  


  rowMayoresyMenores.append(tdMayorAsistencia)
  tdMayorAsistencia.append(eventoMayorAsistencia[0].name + " %"+ eventoMayorAsistencia[0].porcentajeAsistencia)
  
  rowMayoresyMenores.append(tdMenorAsistencia)
  tdMenorAsistencia.append(eventoMenorAsistencia[0].name + " %"+ eventoMenorAsistencia[0].porcentajeAsistencia)

  rowMayoresyMenores.append(tdMayorCapacidad)
  tdMayorCapacidad.append(mayorCapacidad[0].name + " ("+ mayorCapacidad[0].category+")")

  var tableFuturos = document.getElementById("statsFuturos")
 
  let ordenarFururo= []
  ordenarFururo.push(...ingresoYassitencia.sort((a,b)=>{

    return b.estimacionIngreso - a.estimacionIngreso
  }))

  ordenarFururo.map( evento => {
    if(evento.estimacionIngresos > 0){
    tableFuturos.innerHTML += `
    
  <tr>
    <td>${evento.categoria}</td>
    <td>$${evento.estimacionIngresos}</td>
    <td>${evento.porcentajeDeEstimacion}</td>  
  </tr>
    
    
    `  
    
  }})


  var tablePasados = document.getElementById("statsPasados")
 

  let ordenarPasados= []
  ordenarPasados.push(...ingresoYassitencia.sort((a,b)=>{

    return b.ingreso - a.ingreso
  }))

  ordenarPasados.map( evento => {
    if(evento.ingresos > 0){
    tablePasados.innerHTML += `
    
  <tr>
    <td>${evento.categoria}</td>
    <td>$${evento.ingresos}</td>
    <td>${evento.porcentajeDeAsistencia}</td>  
  </tr>
    
    
    `  
    }  
  })




}









