async function getData(){
  await fetch("https://amd-amazingevents-api.onrender.com/api/eventos")
  .then(response => response.json())
  .then(json => datosApi = json)
  eventos =  datosApi.eventos
  
paginas()

}
getData()




console.log(location.search);

function paginas(){
var id= location.search.split("?id=").filter(Number);
console.log(id)
var selectId= id[0];
console.log(selectId);

var eventoDetalles =[];
for (var i = 0; i < eventos.length; i++) {
    if (eventos[i].id==selectId) {
        eventoDetalles.push(eventos[i])
        
    }
    
}
console.log(eventoDetalles[0])

var todoDetalle = document.getElementById("detallesContainer")
 todoDetalle.style.backgroundImage = `url("${eventoDetalles[0].image}")`;

console.log(todoDetalle);
todoDetalle.innerHTML=`
<div class="detallesContainer" >
            <picture>
                <img src="${eventoDetalles[0].image}" alt="maraton">
            </picture>
            <div>
              <h1>${eventoDetalles[0].name}</h1>
              <p>${eventoDetalles[0].description} </p>
              <p>
                Lugar: ${eventoDetalles[0].place}
              </p>
              <p>
                Capacity: ${eventoDetalles[0].capacity}
              </p>
              <p>
                Asistencia:${eventoDetalles[0].assistance}
              </p>
              <p>
                category: ${eventoDetalles[0].category}
              </p>
            </div>
        </div>
`
}