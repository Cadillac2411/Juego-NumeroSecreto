
                                        //Juego del Número secreto
/*--------------------------------------------------------------------------------------------------------------------------*/
//En este caso, vamos a comentar a la funcion y a 1, ya que en la funcion condiciiones iniciales, les estamos dando el valor
//lo importante de mantenerlas, es inicializar estas variables para que puedan funcionar 
let numeroMaximo=10;

//Verificando que los números no hayan sido sorteados ya
let listaNumerosSorteados=[];
let numeroSecreto = generarNumeroSecreto();
let intentos = 1;

/*Estamos asginando parametros a la funcion, para introducir la etiqueta HTML especifica (h1,p,h2,etc.)
    y a su vez el texto que queremos ingresar. Resumiendo parte de nuestro codigo.*/
function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML= texto;
    return;
}

/*getElementById nos permite tomar algun elemento por medio de un Id que le hayamos asignado, como eso no nos
    retorna el valor, vebemos agregar el .value para dicho funcion*/
function verificarIntento(){
    //usamos parseint  ya que se estaba pasando como un String en lugar de un Numero
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos);
    if(numeroDeUsuario===numeroSecreto){
        //En caso de acertar, lo que haremos será en el espacio de parrafo, poner ACERTASTE!
        asignarTextoElemento('p',`Acertaste el número secreto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    //El usuario no acerto el número secreto
    else{
        if(numeroDeUsuario>numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor');
        }
        else{
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

//Usamremos esta funcion cuando la persona no acierte el número secreto, ira en el else
function limpiarCaja(){

    document.querySelector('#valorUsuario').value='';

}

//Creando un número aleatorio por medio de una función
function generarNumeroSecreto(){
    //Math.floor redondea el numero a entero y Math. Random, genera un numero  seudoaleatorio de 0 a 1
    //numeroSecreto en este caso es una variable local, solo esta en es bloque de codigo
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    //Agregamos este if para impedir entrar en un bucle infinito al ocupar todos los numeros posibles
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }
    else{

        if(listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }
        else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

//Esos mensajes estaban sueltos al principio, como los necesitabamos de nuevo y para ahorrar
    //espacios, mejor los almacenamkos en una función.
function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos=1;

}

function reiniciarJuego(){
    //Limpiar caja
    limpiarCaja();

    //Indicar mensaje de intervalo de números
    //Generar el número secreto
    //Inicicalizar el número de intentos en 1
    condicionesIniciales();

    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');

}
condicionesIniciales();