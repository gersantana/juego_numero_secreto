// VARIABLES GLOBALES
let numSecreto = generarNumSecreto();
let intentos = 3;
let inputElement = document.querySelector(".container__input");
let palabraIntentos = () => (intentos > 1 ? "intentos" : "intento");

// ACITIVA Y DESACTIVA BOTONES
function toggleButton(selector, condicion) {
	let boton = document.querySelector(selector);
	if (boton) {
		boton.disabled = condicion;
	} else {
		console.error("el selector del boton no existe");
	}
}

//  ACTIVA Y DESACTIVA EL INPUT
function toggleInput(selector, condicion) {
	let input = document.querySelector(selector);
	if (input) {
		input.disabled = condicion;
	} else {
		console.error("el selector del input no existe");
	}
}

console.log(numSecreto);
// MODIFICA TEXTO EN EL DOM
function asignarTexto(selector, texto) {
	let elementoHtml = document.querySelector(selector);
    if(elementoHtml){
        elementoHtml.textContent = texto;
    }else{
        console.error("el selector para asignar un texto al elemento no existe")
    }
}

// GENERA EL NUMERO SECRETO ALEATORIAMENTE MEDIANTE UN PROMPT
function generarNumSecreto() {
	let rangoJuego = parseInt(prompt(`Ingresa el rango de juego... Ejm 100`));
	return Math.floor(Math.random() * rangoJuego) + 1;
}

// DECREMENTA LOS INTENTOS CADA VEZ QUE EL USUARIO FALLA
function intentosUsuario() {
	if (intentos != 1) {
		intentos--;
		return `Te ${intentos != 1 ? "quedan" : "queda"} ${intentos} ${palabraIntentos()}`;
	} else {
		return `Ya no te quedan intentos`;
	}
}

function pista() {
	return inputElement.value > numSecreto ? `el numero secreto es "MENOR"` : `el numero secreto es "MAYOR"`;
}

// VERIFICA SI EL JUGADOR ACERTO O NO LA JUGADA
function verificarIntento() {
	let numImput = parseInt(inputElement.value);

	if (!numImput) {
		asignarTexto("p", `Debes ingresar un numero`);
		return;
	} else if (numSecreto === numImput) {
		asignarTexto("p", `FELICIDADES!!! Has acertado el numero secreto con el ${numSecreto}`);
        // ACTIVA Y DESACTIVA BOTONES AL GANAR EL USUARIO
		toggleInput(".container__input", true);
		toggleButton("#verificar", true);
		toggleButton("#reiniciar", false);
	} else {
		if (intentos !== 1) {
			asignarTexto("p", `No has acertado ${pista()}. ${intentosUsuario()}`);
			inputElement.value = "";
		} else {
			asignarTexto("p", `No has acertado ya no te quedan intentos`);
            // ACTIVA Y DESACTIVA BOTONES AL PERDER EL USUARIO
            toggleInput(".container__input", true);
			toggleButton("#reiniciar", false);
            toggleButton("#verificar", true);

		}

		// console.log(numImput);
	}
}
// REINICIA EL JUEGO
function nuevoJuego() {
	intentos = 3;
	console.clear();
	inputElement.value = "";
	asignarTexto(".texto__parrafo", "Ingresa un numero del 1 al 10");
    // ACTIVA Y DESACTIVA BOTONES
	toggleInput(".container__input", false);
	toggleButton("#verificar", false);
	toggleButton("#reiniciar", true);
	numSecreto = generarNumSecreto();
	// console.log(numSecreto);
}

asignarTexto("h1", "Juego del numero secreto");
asignarTexto(".texto__parrafo", "Ingresa un numero del 1 al 10");
