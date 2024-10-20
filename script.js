let userName = ""; //variable global para el nombre

document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const closeAlertBtn = document.getElementById("closeAlertBtn");

    startBtn.addEventListener("click", validateName);
    closeAlertBtn.addEventListener("click", closeAlert);
});

function validateName() {
    const nameInput = document.getElementById("name-input").value.trim();

    if (nameInput === "") {
        //aviso si no se introduce el nombre
        document.getElementById("alertMessage").textContent = "Por favor, introduce tu nombre para continuar.";
        document.getElementById("alertContainer").style.display = "flex";
    } else {
        userName = nameInput; //almacena el nombre n la variable
        
        //revisar por que tengo la sensacion de que hay una funcion que lo hace en el otro js pero no estoy segura
        document.querySelector(".acess").style.display = "none"; //cierra el div de acceso
        document.querySelector(".quiz").style.display = "block"; //muestra el quiz
        console.log("Nombre introducido:", userName); 
    }
}

function closeAlert() { //cerrar la alerta
    document.getElementById("alertContainer").style.display = "none";
}
