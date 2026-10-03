const preguntas = [
    { pregunta: "¿Cuál es el planeta más grande del sistema solar?", opciones: ["Marte", "Júpiter", "Saturno", "Tierra"], correcta: 1 },
    { pregunta: "¿Quién pintó la Mona Lisa?", opciones: ["Van Gogh", "Picasso", "Leonardo da Vinci", "Miguel Ángel"], correcta: 2 },
    { pregunta: "¿Cuántos continentes hay en el mundo?", opciones: ["5", "6", "7", "8"], correcta: 2 },
    { pregunta: "¿Cuál es el río más largo del mundo?", opciones: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"], correcta: 1 },
    { pregunta: "¿En qué año llegó el hombre a la Luna?", opciones: ["1965", "1969", "1972", "1959"], correcta: 1 },
    { pregunta: "¿Cuál es el idioma más hablado del mundo?", opciones: ["Inglés", "Español", "Chino mandarín", "Hindi"], correcta: 2 },
    { pregunta: "¿Qué animal es conocido como el 'rey de la selva'?", opciones: ["Tigre", "León", "Elefante", "Oso"], correcta: 1 },
    { pregunta: "¿Cuál es el metal más valioso?", opciones: ["Oro", "Plata", "Platino", "Rodio"], correcta: 3 }
];

let indiceActual = 0;
let puntaje = 0;
let preguntasSeleccionadas = [];
let respondida = false;

function iniciarJuego() {
    const mezcladas = [...preguntas].sort(() => Math.random() - 0.5);
    preguntasSeleccionadas = mezcladas.slice(0, 5);
    indiceActual = 0;
    puntaje = 0;
    respondida = false;

    document.getElementById('pantallaInicio').classList.add('oculto');
    document.getElementById('pantallaJuego').classList.remove('oculto');
    document.getElementById('pantallaFinal').classList.add('oculto');

    mostrarPregunta();
}

function mostrarPregunta() {
    respondida = false;
    const p = preguntasSeleccionadas[indiceActual];

    document.getElementById('contadorPregunta').textContent = `Pregunta ${indiceActual + 1}/${preguntasSeleccionadas.length}`;
    document.getElementById('puntaje').textContent = `Puntaje: ${puntaje}`;
    document.getElementById('progreso').style.width = `${(indiceActual / preguntasSeleccionadas.length) * 100}%`;
    document.getElementById('pregunta').textContent = p.pregunta;

    const contenedor = document.getElementById('opciones');
    contenedor.innerHTML = '';
    p.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button');
        btn.className = 'opcion';
        btn.textContent = opcion;
        btn.onclick = () => seleccionarOpcion(i);
        contenedor.appendChild(btn);
    });

    document.getElementById('btnSiguiente').classList.add('oculto');
}

function seleccionarOpcion(indice) {
    if (respondida) return;
    respondida = true;

    const p = preguntasSeleccionadas[indiceActual];
    const botones = document.querySelectorAll('.opcion');

    botones.forEach((b, i) => {
        if (i === p.correcta) b.classList.add('correcta');
        else if (i === indice) b.classList.add('incorrecta');
        b.style.pointerEvents = 'none';
    });

    if (indice === p.correcta) {
        puntaje += 100;
        document.getElementById('puntaje').textContent = `Puntaje: ${puntaje}`;
    }

    document.getElementById('btnSiguiente').classList.remove('oculto');
}

function siguientePregunta() {
    indiceActual++;
    if (indiceActual < preguntasSeleccionadas.length) mostrarPregunta();
    else mostrarFinal();
}

function mostrarFinal() {
    document.getElementById('pantallaJuego').classList.add('oculto');
    document.getElementById('pantallaFinal').classList.remove('oculto');
    document.getElementById('puntajeFinal').textContent = puntaje;

    const mensaje = document.getElementById('mensajeFinal');
    if (puntaje === 500) mensaje.textContent = '🌟 ¡PERFECTO! Eres un genio.';
    else if (puntaje >= 300) mensaje.textContent = '👏 ¡Muy bien! Sigue así.';
    else if (puntaje >= 100) mensaje.textContent = '💪 ¡Buen intento! Puedes mejorar.';
    else mensaje.textContent = '😅 ¡Sigue practicando!';
}

function reiniciarJuego() {
    document.getElementById('pantallaFinal').classList.add('oculto');
    document.getElementById('pantallaInicio').classList.remove('oculto');
}
