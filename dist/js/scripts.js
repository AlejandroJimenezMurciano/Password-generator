/*
Normas del ejercicio

- El ejercicio debe ser capaz de generar un password de la logitud que le establezcamos con los parámetros de los checkboxes.

- Cada checkbox incluirá los caracteres que tendrá nuestro password, es OBLIGATORIO que al menos haya uno seleccionado.

- Si sólo tenemos un checkbox seleccionado, el password se generará únicamente con ese tipo de caracteres, y si tenemos 2 o más se irán mezclando aleatoriamente.

- En la parte de STRENGTH tenemos 5 valores posibles:
    - TOO SHORT: Este valor aparecerá siempre que el password tenga 5 o menos caracteres.
- Estos valores sólo se aplican a partir de 6 caracteres.
  - TOO WEAK: Sólo hay un checkbox seleccionado.
  - WEAK: Hay dos checkbox seleccionados.
  - MEDIUM: Hay tres checkbox seleccionados.
  - STRENGTH: Los cuatro checkbox están marcados.

- El botón SÓLO se podrá pulsar cuando la longitud sea mayor de 5 y haya al menos un checkbox seleccionado.

## Pistas y pasos a seguir

- RECORDAD que existen arrays y objetos y que podéis guardar información dentro para después reutilizarla.

- Crear las 2 cajas iniciales
- Poner los textos
- Sincronizar el length del nuevo password con el input range
- Conseguir que se genere un string de esa longitud al pulsar el botón y se escriba en el primer input.
- guardar los cuatro checkbox y que al seleccionar cualquiera de ellos te diga por consola cual has seleccionado.

## Principios Importantes para la creación de aplicaciones.

- Las funciones deben tener UNA ÚNICA responsabilidad, Es mejor tener 5 funciones con 2 líneas cada una que tener una sola función que se encargue de 5 tareas distintas.

·PARA Q EN LOS FORMULARIOS NO SE RECARGUE LA PAGINA AL DARLE AL BOTON DE ENVIAR O CUAL SEA HAY Q PONER E.PREVENTDEFAULT

·ORDEN A SEGUIR--> CONSTANTES, VARIABLES, FUNCIONES, ACCIONES (LLAMADAS A FUNCIONES), EVENTOS

·PASWORD SE RESETEA PONIENDOLO VACIO PARA Q CADA VEZ Q HAYA UN CAMBIO SE VACIE Y SE AÑADA LO Q HAGA FALTA SOLO

·EL PASSWORD SE GENER A ABASE DEL STRING PASSWORD PONIENDOLO ALEATORIO Y EL LENGTH
*/

//constantes
const passwordGeneratedElement = document.getElementById('password-generated');
const passwordGeneratorOptionsElement = document.getElementById(
  'password-generator-options'
);
const passwordGeneratorLengthNumberElement = document.getElementById(
  'password-generator-length-number'
);
const passwordGeneratorRangeElement = document.getElementById(
  'password-generator-range'
);
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const strengthValueElement = document.getElementById('strength-value');
const buttonGenerateElement = document.getElementById('button-generate');
const passwordMessages = ['Muy débil', 'Débil', 'Media', 'Fuerte'];

//String con todo lo que puede tener la contraseña
const passwordOptions = {
  length: 0,
  uppercase: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnñopqrstuvwxyz',
  numbers: '1234567890',
  symbols: '!"@·#$%&7()=?¿¡*[]{}+'
};

//Función para generar un número aleatorio
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//Para establevcer la longitud de la contraseña la meto en una variable
let passwordLength = 0;

//creo un nuevo string vacío para extraer caracteres para la contraseña final
let newString = '';

//Funcion para hacer cambios en el formulario y que los detecte
passwordGeneratorOptionsElement.addEventListener('change', e => {
  const checkedBoxes = document.querySelectorAll('input:checked');
  newString = '';
  passwordLength = passwordGeneratorRangeElement.value;
  passwordGeneratorLengthNumberElement.textContent = passwordLength;
  if (uppercaseElement.checked) newString += passwordOptions.uppercase;
  if (lowercaseElement.checked) newString += passwordOptions.lowercase;
  if (numbersElement.checked) newString += passwordOptions.numbers;
  if (symbolsElement.checked) newString += passwordOptions.symbols;

  if (passwordLength < 5) {
    strengthValueElement.textContent = 'Muy corta';
    buttonGenerateElement.setAttribute('disabled', 0);
  } else if (checkedBoxes.length === 0) {
    strengthValueElement.textContent = 'Ninguna opción elegida';
    buttonGenerateElement.setAttribute('disabled', 0);
  } else {
    buttonGenerateElement.removeAttribute('disabled');
    strengthValueElement.textContent =
      passwordMessages[checkedBoxes.length - 1];
  }
});

//funcion para crear la contraseña nueva gracias al nuevo string vacío
const generatePassword = () => {
  let newPassword = '';
  for (let index = 0; index < passwordLength; index++) {
    newPassword += newString.charAt(randomNumber(0, newString.length));
  }
  passwordGeneratedElement.value = newPassword;
};

//Para enviar el formulario
//el prevent default para q el navegador no se actualice al enviar el formulario
passwordGeneratorOptionsElement.addEventListener('submit', e => {
  e.preventDefault();
  generatePassword();
});
