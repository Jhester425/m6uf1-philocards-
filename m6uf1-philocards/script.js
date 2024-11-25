window.onload = () => {
    // Crear tarjetas
    crearTarjetas(filosofos)

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);

    // Added handlers for sort buttons
    let botonOrdenarAZ = document.querySelector('.sort-btn-az'); // Button for A->Z
    let botonOrdenarZA = document.querySelector('.sort-btn-za'); // Button for Z->A

    if (botonOrdenarAZ) {
        botonOrdenarAZ.addEventListener('click', ordenarNombreAZ); //checks if the botonOrdenarAZ variable is not null or undefined
    }

    if (botonOrdenarZA) {
        botonOrdenarZA.addEventListener('click', ordenarNombreZA); //checks if the botonOrdenarZA variable is not null or undefined
    }
    
    // Listener for the Card saver button
    let botonGuardar = document.querySelector('.save-btn');
    botonGuardar.addEventListener('click', guardarTarjetas);

    // Listener for the Card loader button
    let botonCargar = document.querySelector('.load-btn');
    botonCargar.addEventListener('click', cargarTarjetas);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {

        // 1 Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');


        // 2 Creamos imagen 
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // 3 Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);


        // 4 Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // 5 Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // 6 Añadimos info del país a filaInfo
        let infoPais = document.createElement('div');       //declaration of the varianle using let 
        infoPais.classList.add('info-pais');                //adds a classname of 'info-pais' to the created div
        infoPais.innerHTML = ` 
            <img src="${filosofo.pais.bandera}" alt="${filosofo.pais.nombre} bandera">
            <span class="pais">${filosofo.pais.nombre}</span>
        `;                                                  //To dynamically insert HTML content into the created div
        filaInfo.append(infoPais);                          //appends the infoPais element 

        // 7 Añadimos info de la corriente a filaInfo
        let infoCorriente = document.createElement('div');  //declaration of the variable using let 
        infoCorriente.classList.add('info-corriente');      //adds a classname of 'info-corriente' to the created div
        infoCorriente.innerHTML = `
            <span>Corriente: </span><span class="corriente">${filosofo.corriente}</span>
        `;                                                  //To dynamically insert HTML content into the created div
        filaInfo.append(infoCorriente);                     //appends the infoCorriente element 

        // 8 Añadimos info del arma a filaInfo
        let infoArma = document.createElement('div');       //declaration of the variable using let 
        infoArma.classList.add('info-arma');                //adds a classname of 'info-arma' to the created div
        infoArma.innerHTML = `
            <span>Arma: </span><span class="arma">${filosofo.arma}</span>
        `;                                                  //To dynamically insert HTML content into the created div
        filaInfo.append(infoArma);                          //appends the infoArma element 


        // 9 Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        // 10 Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let skill = document.createElement('div');
            skill.classList.add('skill');

            // 1.Icono de habilidad
            let icono = document.createElement('img');
            icono.src = infoHabilidad.icono || "https://via.placeholder.com/16"; //Icons
            icono.alt = `Icono de ${infoHabilidad.habilidad}`;
            skill.append(icono);

            // 2.Etiqueta de habilidad
            let etiqueta = document.createElement('span');
            etiqueta.classList.add('skill-name');
            etiqueta.textContent = infoHabilidad.habilidad;
            skill.append(etiqueta);

            // 3.Barra de habilidad
            let skillBar = document.createElement('div');
            skillBar.classList.add('skill-bar');
            let level = document.createElement('div');
            level.classList.add('level');
            level.style.width = `${infoHabilidad.nivel * 10}%`;
            skillBar.append(level);
            skill.append(skillBar);

            // Añadimos la habilidad a la caja de habilidades
            habilidades.append(skill);
        }

        // 11 New div for the delete button
        let botonEliminar = document.createElement('div');
        botonEliminar.innerHTML = '&#x2716'; // Icono de aspa
        botonEliminar.classList.add('botonEliminar');

        // 12 Listener for the 'click
        botonEliminar.addEventListener('click', () => {
            tarjeta.remove();
        });

        // 13 Delete button
        tarjeta.append(botonEliminar);  

        // 14 Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })
}

function eliminarTarjeta() {
    boton.parentElement.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));

    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2); // Ascending order
    });

    // Eliminar totes les targetes de l'array 'tarjeta'

    // Afegir 'tarjetasOrdenadas' al contenidor de cards
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = ''; // Clears all cards from the container

    tarjetasOrdenadas.forEach((tarjeta) => {
        contenedor.appendChild(tarjeta); // Append the sorted cards back to the container
    });
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));

    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1); // Sorts ifrom Z to A
    });
    
    let contenedor = document.querySelector('.cards-container');
        contenedor.innerHTML = ''; // Clears all cards from the container

    // Add each sorted card back to the container
    tarjetasOrdenadas.forEach((tarjeta) => {
        contenedor.appendChild(tarjeta);
    });
}

function crearNuevaTarjeta(event) {
    event.preventDefault(); // To prevent form submission
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;

    //Edited the pais because the name is not showing properly in the card
    nuevoFilosofo.pais = { //Edited the country name and flag section to fix issue
        nombre: document.querySelector('.create-card-form .pais').value,
        bandera: document.querySelector('.create-card-form .bandera').value
    };    
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;
    // Completar la función

    // crearTarjetas(nuevoFilosofo);
    nuevoFilosofo.habilidades = [];
    let skillInputs = document.querySelectorAll('.create-card-form .skills');
    skillInputs.forEach(input => {
        nuevoFilosofo.habilidades.push({
            nombre: `Habilidad ${nuevoFilosofo.habilidades.length + 1}`, 
            nivel: parseInt(input.value) // To parse number value from input
        });
    });

    crearTarjetas([nuevoFilosofo]); // Pass an array with the new philosopher object

}

function parsearTarjetas(tarjetas){
    let filosofosParseados = []; 

    for (let tarjeta of tarjetas) {
        let filosofo = {}; 

        // Extracts data from the DOM
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;

        filosofo.pais = {
            nombre: tarjeta.querySelector('.info-pais .pais').innerHTML.trim(),
            bandera: tarjeta.querySelector('.info-pais img').src
        };

        filosofo.corriente = tarjeta.querySelector('.info-corriente .corriente').innerHTML.trim();
        filosofo.arma = tarjeta.querySelector('.info-arma .arma').innerHTML.trim();

        filosofo.habilidades = []; // To create an array for the philosopher's skills
        let habilidades = tarjeta.querySelectorAll('.skill');

        for (let habilidad of habilidades) {
            let habilidadParaGuardar = {
                habilidad: habilidad.querySelector('.skill-name').textContent.trim(),
                nivel: parseInt(habilidad.querySelector('.level').style.width) / 10, // Calculate skill level
                icono: habilidad.querySelector('img').src
            };
            filosofo.habilidades.push(habilidadParaGuardar);
        }

        // To add the philosopher object to the array
        filosofosParseados.push(filosofo);
    }

    return filosofosParseados; // Return the array of parsed philosophers
}

function guardarTarjetas(){ //Changed the function a bit

    // To get the cards in the DOM
    let tarjetas = Array.from(document.querySelectorAll('.card'));

    // To convert the cards into structured objects
    let tarjetasParseadas = parsearTarjetas(tarjetas); 

    // To save the array of objects into localStorage
    localStorage.setItem('tarjetas', JSON.stringify(tarjetasParseadas));
}


function cargarTarjetas() {
    // To retrieve the cards from localStorage
    let tarjetasGuardadas = localStorage.getItem('tarjetas');

    // Check if there are saved cards
    if (tarjetasGuardadas) {
        // Parse the JSON string back into an array of objects
        let tarjetas = JSON.parse(tarjetasGuardadas);

        // Use the existing function `crearTarjetas` to create HTML cards
        crearTarjetas(tarjetas);
    }
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]