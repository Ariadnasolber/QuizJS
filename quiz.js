let preguntas = []; //almacena las preguntas
const quizContainer = document.querySelector(".quiz"); //contenedor de las preguntas
let currentQuestionIndex = 0;
let score = 0; //contador aciertos


const loadQuestions = async () => { //carga las preguntas desde el JSON
    try {
        let response = await fetch('preguntas.json'); //ruta correcta
        preguntas = await response.json(); //guarda las preguntas
        preguntas.sort(() => Math.random() - 0.5); //orden aleatorio
        currentQuestionIndex = 0; //reinicia el indice de la pregunta
        score = 0; //reinicia puntuaciones
        quizContainer.innerHTML = ''; //limpia el div del quiz
        showQuestion(); //mustra la primera pregunta
    } catch (error) {
        console.error("Error al cargar las preguntas:", error);
    }
};

function showQuestion() { //generar las preguntas html
    if (currentQuestionIndex < preguntas.length) {
        const preguntaActual = preguntas[currentQuestionIndex];
        
        let preguntaHTML = document.createElement("div");
        preguntaHTML.classList.add("pregunta");

        let preguntaTitulo = `<h3>${preguntaActual.pregunta}</h3>`;
        preguntaHTML.innerHTML += preguntaTitulo;

        for (const [key, value] of Object.entries(preguntaActual.opciones)) {
            let opcionHTML = `
                <label>
                    <input type="radio" name="pregunta${currentQuestionIndex}" value="${key}">
                    ${value}
                </label>
                <br>
            `;
            preguntaHTML.innerHTML += opcionHTML;
        }

        let submitBtn = document.createElement("button");
        submitBtn.textContent = "Responder";
        submitBtn.classList.add("submit-btn");
        submitBtn.addEventListener("click", checkAnswer);
        preguntaHTML.appendChild(submitBtn);
        quizContainer.appendChild(preguntaHTML);
        preguntaHTML.scrollIntoView({ behavior: "smooth" });

    } else {
        showCompletionAlert();
    }
}

//verifica respuesta correcta
function checkAnswer() {
    const opciones = document.getElementsByName(`pregunta${currentQuestionIndex}`);
    let selectedAnswer = null;

    //busca la respuesta
    for (const opcion of opciones) {
        if (opcion.checked) {
            selectedAnswer = opcion.value;
            break;
        }
    }

    //revisar, no salta el aviso
    if (!selectedAnswer) {
        alert("Debes seleccionar una opción antes de continuar.");
        return;
    }

    const preguntaActual = preguntas[currentQuestionIndex];

    //verifica respuesta correcta
    if (selectedAnswer === preguntaActual.respuesta_correcta) {
        score++;
        currentQuestionIndex++; //siguiente pregunta
        showQuestion(); //mostrarla
    } else {
        showAlert(false); //alerta si fallas
    }
}

//alerta
function showAlert(hasCompleted) {
    const alertContainer = document.getElementById("alertContainer");
    const alertMessage = document.getElementById("alertMessage");

    //acierto
    if (hasCompleted) {

        alertMessage.innerHTML = `
            <p>¡Enhorabuena!</p>
            <p>Has completado el quiz ${score}/${preguntas.length}.</p>
        `;
    } else {
        //fallo
        const remainingQuestions = preguntas.length - currentQuestionIndex - 1;
        alertMessage.innerHTML = `
            <p>¡Has fallado!</p>
            <p>Aciertos: ${score}</p>
            <p>Respuestas restantes: ${remainingQuestions}</p>
        `;
    }

    //mostrar la alerta
    alertContainer.style.display = "flex";

    //reiniciar el quiz al cerrar la alerta
    document.getElementById("closeAlertBtn").addEventListener("click", function () {
        alertContainer.style.display = "none";
        resetQuiz();
    });
}

//mostrar la alerta de felicitacion
function showCompletionAlert() {
    showAlert(true);
}

//reiniciar el quiz
function resetQuiz() {
    document.querySelector(".acess").style.display = "block"; // Mostrar la pantalla de inicio
    quizContainer.style.display = "none"; // Ocultar el quiz
    loadQuestions(); // Recargar las preguntas y reiniciar el quiz
}

//iniciar la carga de preguntas si el json esta listo
document.addEventListener("DOMContentLoaded", function () {
    quizContainer.style.display = "none"; //quiz oculto en default

    //mostrar el quiz solo cuando se escriba el nombre
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", function () {
        const nameInput = document.getElementById("name-input").value.trim();
        if (nameInput !== "") {
            document.querySelector(".acess").style.display = "none"; //ocultar la ventanita de acceso
            quizContainer.style.display = "block"; //mostrar el quiz
            loadQuestions(); //cargar las preguntas
        }
    });
});
