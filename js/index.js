const fechaBase= dataAmazing.fechaActual
const eventos= dataAmazing.eventos
const eventosFuturos=[]
const eventosPasados=[]

console.log(fechaBase);
console.log(eventos);

for(i=0;i<eventos.length;i++){

    if(eventos[i].date >fechaBase){
        eventosFuturos.push(eventos[i])
    }
    else{
        eventosPasados.push(eventos[i])
    }
}

console.log(eventosFuturos);
console.log(eventosPasados);

var buttonNav= document.getElementsByClassName("cachorrita")
for(var i=0; i < buttonNav.length; i++ ){
    const element= buttonNav[i];
    element.addEventListener("click", function(e){
        imprimir(e.target.id);
    })
}

function imprimir(id) {
console.log(id);
switch (id) {
    case "upcoming" :
        display(eventosFuturos)        
        break;
    case "past" :
        display(eventosPasados) 
   break;

    default:
        display(eventos)
    
}
    
}


function display(array) {
    var html = "";
    for(var i=0; i < array.length; i++){
        html+= 
        `<li>
                    <picture>
                        <img src="./img/${array[i].image}" alt="${array[i].name}">
                    </picture>
                    <h2>${array[i].name}</h2>
                    <p> descripcion </p>
                    <div class="tarjetabaja">
                        <p>price<br>
                        $${array[i].price}
                        </p>
                        <input type="submit" value="Ver mas">
                    </div>

                </li>`
                
    }
    console.log(html)
    document.getElementById("tarjetas").innerHTML= html;
}

imprimir("home")

