import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

//Objeto cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//Agrega datos al objeto
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}


//Agrega nueva cita a la clase
export function nuevaCita(e) {
    e.preventDefault();

    //Extrae información del objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if (editando) {
        
        ui.imprimirAlerta('Editado correctamente');

        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        editando = false;

    } else {
        //Generar id
        citaObj.id = Date.now();

        //Agregar cita
        // administrarCitas.agregarCita(citaObj); -> se sobreescriben todos los valores con el último
        administrarCitas.agregarCita({...citaObj}); // -> se pasa la referencia o copia del objeto

        ui.imprimirAlerta('Se agregó correctamente');
    }

    //Reset
    reiniciarObjeto();
    formulario.reset();

    //Mostrar HTML
    ui.imprimirCitas(administrarCitas);

}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    //Eliminar cita
    administrarCitas.eliminarCita(id);

    //Mostrar mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
    
}