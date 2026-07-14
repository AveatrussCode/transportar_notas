// ==========================================
// Base de datos (se llena al leer el JSON)
// ==========================================

let canciones = [];


// ==========================================
// Cargar canciones.json
// ==========================================

async function cargarCanciones() {

    const respuesta = await fetch("canciones.json");

    canciones = await respuesta.json();

}


// ==========================================
// Llenar el selector
// ==========================================

function llenarSelector() {

    const selector = document.getElementById("selectorCanciones");

    selector.innerHTML = "";

    canciones.forEach(cancion => {

        selector.innerHTML += `
            <option value="${cancion.id}">
                ${cancion.nombre}
            </option>
        `;

    });

}


// ==========================================
// Mostrar la canción seleccionada
// ==========================================

function mostrarCancion() {

    const id = document.getElementById("selectorCanciones").value;

    const cancion = canciones.find(c => c.id == id);

    if (!cancion) return;


    //--------------------------------------------------
    // Información superior
    //--------------------------------------------------

    document.getElementById("informacionCancion").innerHTML = `

        <h2>${cancion.nombre}</h2>

        <p><b>Autor:</b> ${cancion.autor}</p>

        <p><b>Tono original:</b> ${cancion.tono_original}</p>

        <br>

        <label>Tonalidad:</label>

        <select id="selectorTonalidad">

            <option>Do</option>
            <option>Do#</option>
            <option>Re</option>
            <option>Re#</option>
            <option>Mi</option>
            <option>Fa</option>
            <option>Fa#</option>
            <option>Sol</option>
            <option>Sol#</option>
            <option>La</option>
            <option>La#</option>
            <option>Si</option>

        </select>

    `;


    //--------------------------------------------------
    // Video
    //--------------------------------------------------

    let urlVideo = cancion.video;

    if (urlVideo.includes("watch?v=")) {

        urlVideo = urlVideo.replace("watch?v=", "embed/");

    }

    document.getElementById("video").innerHTML = `

        <iframe
            width="100%"
            height="250"
            src="${urlVideo}"
            frameborder="0"
            allowfullscreen>
        </iframe>

    `;


    //--------------------------------------------------
    // Detalles
    //--------------------------------------------------

    document.getElementById("detalles").innerHTML = `

        <h3>Detalles</h3>

        <hr>

        <p><b>Autor:</b> ${cancion.autor}</p>

        <p><b>Tono original:</b> ${cancion.tono_original}</p>

    `;


    //--------------------------------------------------
    // Mostrar notas
    //--------------------------------------------------

    let html = "";

    cancion.lineas.forEach(linea => {

        html += `

            <div class="linea">

                <pre class="notas">${linea.notas}</pre>

                <pre class="letra">${linea.letra}</pre>

            </div>

        `;

    });

    document.getElementById("visorCancion").innerHTML = html;

}


// ==========================================
// Inicio
// ==========================================

async function iniciar() {

    await cargarCanciones();

    llenarSelector();

    mostrarCancion();

    document
        .getElementById("selectorCanciones")
        .addEventListener("change", mostrarCancion);

}


window.onload = iniciar;