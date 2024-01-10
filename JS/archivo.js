var coleccionItems = [ //array coleccionables
    { coleccionable: '0', estado: 'inactivo' },
    { coleccionable: '1', estado: 'inactivo' },
    { coleccionable: '2', estado: 'inactivo' },
    { coleccionable: '3', estado: 'inactivo' },
    { coleccionable: '4', estado: 'inactivo' },
    { coleccionable: '5', estado: 'inactivo' },
    { coleccionable: '6', estado: 'inactivo' },
    { coleccionable: '7', estado: 'inactivo' },
    { coleccionable: '8', estado: 'inactivo' },
    { coleccionable: '9', estado: 'inactivo' },
    { coleccionable: '10', estado: 'inactivo' },
    { coleccionable: '11', estado: 'inactivo' },
    { coleccionable: '12', estado: 'inactivo' },
    { coleccionable: '13', estado: 'inactivo' },
    { coleccionable: '14', estado: 'inactivo' },
    { coleccionable: '15', estado: 'inactivo' },
    { coleccionable: '16', estado: 'inactivo' },
    { coleccionable: '17', estado: 'inactivo' },
    { coleccionable: '18', estado: 'inactivo' },
    { coleccionable: '19', estado: 'inactivo' },
    { coleccionable: '20', estado: 'inactivo' },
    { coleccionable: '21', estado: 'inactivo' },
    { coleccionable: '22', estado: 'inactivo' },
    { coleccionable: '23', estado: 'inactivo' },
    { coleccionable: '24', estado: 'inactivo' },
    { coleccionable: '25', estado: 'inactivo' }
];

function resetearEstado(items) { //para que se limpie al repetir tiradas

    var allItems = document.getElementsByClassName('items');

    for (var i = 0; i < allItems.length; i++) {

        allItems[i].style.visibility = 'hidden'; //debido a un pequeño retardo, se ve el contenedor, por lo que ponemos esto para evitar que pas
        //luego lo ponemos normal
        allItems[i].style.opacity = '0'; //opacidad 0 a todos
        allItems[i].classList.remove('pop', 'pop-legendario', 'pop-epico', 'pop-comun'); //quitamos las animaciones

        var currentItem = document.getElementById('img' + (i + 1));

        if (currentItem) {

            currentItem.src = '\0'; // Limpiamos la imagen
            currentItem.parentElement.style.opacity = '0'; // Ocultamos el contenedor del ítem
        }
        allItems[i].style.visibility = 'visible'; 
    }

    for (var j = 0; j < items.length; j++){
        items[j]='';
    }
    console.log("Array vaciado: "+ items);

    // reiniciar variables de control del video fuera del bucle
    var video = document.getElementById('video');
    video.loop = false;
    video.pause();
    video.currentTime = 0; // asegurarse de que el video comience desde el principio

}

function gacha(numItems) {


    var items = new Array(numItems); 
    var calidad = 0, calidadMax = 3;

    resetearEstado(items); //limpiamos las tiradas anteriores

    var allItems = document.getElementsByClassName('items');

    var video = document.getElementById('video');
    var loopStarted = false;
    var isCustomVideoPlaying = false;
    
    for (var i = 0; i < numItems; i++) {

        calidad = calidadRandom();
        console.log(calidad); //comprobar que calidad nos ha tocado

        switch (calidad){ //comprobamos calidad y mandamos a obtener los items
            case 1:
                items[i] = legendario();
                break;
            case 2:
                items[i] = epico();
                break;
            case 3:
                items[i] = comun();
                break;
        }

        if (calidad < calidadMax) //declaramos la calidad mas alta
            calidadMax = calidad;
    }

    
    for (var i = 0; i < allItems.length; i++) { //para asegurarnos que no salen los contenedores vacios entre tiradadas
        allItems[i].style.opacity = '0';
    }

    console.log("Calidad max: " + calidadMax); //damos informacion a la consola por si queremos observar como va
    console.log("Objetos: " + items);
    console.log("loopstarted: "+loopStarted+"   isCustomVideoPlaying: "+isCustomVideoPlaying);

    video.style.visibility = 'visible'; //preparamos todo para reproducir los videos
    video.style.display = 'block';

    video.src = "../media/videos/summon_animation.mp4"; //Reproducimos el video
    video.play();


    video.addEventListener("ended", function() { //cuando acaba...

        console.log("El video de summon ha terminado");
        
        video.src = "../media/videos/summon_loop.mp4";
        video.loop = true; //iniciamos un loop que acabara cuando clickemos

        video.play();
        loopStarted = true; //hacemos que no se repita estafuncion

    });

    video.addEventListener("click", function() { //cuando clickemos acaba el loop

        console.log("El video cambia");

        if (loopStarted && !isCustomVideoPlaying) { //nos aseguramos de que no se repita el loop

            animacionCustom(calidadMax, items); //iniciamos la animacion que varia segun la calidad
            isCustomVideoPlaying = true;
        }
    });

}



function calidadRandom() { //calculadora de numeros random

    var calidad = Math.random();

    if (calidad <= 0.03) //probabilidad legendario
        calidad = 1;
    else if (calidad >= 0.73) //probabilidad epico
        calidad = 2;
    else //probabilidad comun
        calidad = 3;

    return calidad;
}


function legendario(){ //numeros de items legendario

    var legendario = Math.floor(Math.random() * 5);

    return legendario;
}

function epico(){ //numeros de items epico
    
    var epico = Math.floor(Math.random() * 15) + 5;

    return epico;
}

function comun(){ //numeros de items comun
   
    var comun = Math.floor(Math.random() * 6) + 20

    return comun;
}

function animacionCustom(calidadMax, items) {
    var video = document.getElementById('video');

    if (calidadMax === 1) {
        video.src = "../media/videos/SSR.mp4";
    } else if (calidadMax === 2) {
        video.src = "../media/videos/SR.mp4";
    } else if (calidadMax === 3) {
        video.src = "../media/videos/R.mp4";
    }

    video.loop = false;
    video.play();

    video.addEventListener("ended", function videoEnded() {
        video.removeEventListener("ended", videoEnded); // Remove the event listener to prevent multiple bindings

            video.style.display = 'none';
            final(items);
    });
}



function final(items) {

    var allItems = document.getElementsByClassName('items');

    for (var i = 0; i < allItems.length; i++) {

        setTimeout(function (index) { //metemos delay

            return function () {

                allItems[index].style.opacity = '0'; //ponemos a 0 la opacidad

                var currentItem = document.getElementById('img' + (index + 1)); // ajustamos el índice para coincidir con el HTML
                
                if (currentItem) { //comprobamos la calidad del objeto

                    if (items[index] <= 4) {
                        allItems[index].classList.add('pop-legendario');
                    } 
                    else if (items[index] >= 5 && items[index] <= 19) {
                        allItems[index].classList.add('pop-epico');
                    } 
                    else if (items[index] >= 20 && items[index] <= 25) {
                        allItems[index].classList.add('pop-comun');
                    }

                    currentItem.src = '../media/images/item_' + items[index] + '.jpg'; //mostramos el objeto
                    currentItem.parentElement.style.opacity = '1'; // mostramos el contenedor del ítem
                }

                if(coleccionItems[items[index]].estado === 'inactivo'){ //comprobar si lo tenemos en la coleccion

                    coleccionItems[items[index]].estado = 'activo' 
                    document.getElementById('col_' + items[index]).src = '../media/images/item_' + items[index] + '.jpg';
                }
            };
        }(i), i * 200); // Ajusta el retraso aquí (actualmente 500 milisegundos)
    }
}

function seleccionarIcono(iconoSeleccionado) { //configurador del menu

    var iconos = document.querySelectorAll('.icon');
    var pantalla = document.getElementById('pantalla');
    var boton = document.getElementById('contenedor-boton');
    var coleccion = document.getElementById('coleccion')
    var cabecera = document.getElementById('cabecera');
    var soundTreasure = document.getElementById('coin');

    iconos.forEach((icono) => {
      if (icono.id === iconoSeleccionado) {
        icono.src = `../media/images/${iconoSeleccionado}_active.png`;
      } 
      else {
        icono.src = `../media/images/${icono.id}_no_active.png`;
      }
    });

  
    if (iconoSeleccionado === 'treasure') {
        pantalla.style.display = '';
        boton.style.display = '';
        coleccion.style.display = 'none';
        cabecera.style.position = 'sticky';

    } else if (iconoSeleccionado === 'luffy') { 
        pantalla.style.display = 'none';
        boton.style.display = 'none';
        coleccion.style.display = 'flex';
        cabecera.style.position = 'fixed';

    }
  }
  
  function playRandomSong() {
    var musicPlayer = document.getElementById("music-player");
    var notification = document.getElementById("notification");
    var songs = [
      "Assu! - Hiroshi Kitadani",
      "We Are! - Hiroshi Kitadani",
      "OVER THE TOP - Hiroshi Kitadani",
      "The Peak - SEKAI NO OWARI",
      "Believe - Folder 5"
    ];
  
    var randomIndex = Math.floor(Math.random() * songs.length);
    var randomSong = songs[randomIndex];
  
    musicPlayer.src = '../media/sounds/' + randomSong + '.mp3';
    musicPlayer.play();
  
    notification.innerText = randomSong;
  
    document.getElementById("notification-container").classList.add("show");
  
    setTimeout(() => {
      document.getElementById("notification-container").classList.remove("show");
    }, 8000); //desaparece en 8 segundos la notificacion
  }
  

document.addEventListener('DOMContentLoaded', function() {

    var musicSwitch = document.getElementById('music-switch');
    var musicPlayer = document.getElementById('music-player');

    musicSwitch.addEventListener('change', function() {
        if (musicSwitch.checked) {
            // Reproducir música al encender el interruptor
            playRandomSong();
        } else {
            // Pausar la música al apagar el interruptor
            musicPlayer.pause();
        }
    });
});

