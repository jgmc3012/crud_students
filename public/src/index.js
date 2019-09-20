/**
 * Variables globales declaradas en el sistema
 * @var {...HTMLTableElement} table Sera la tabla donde se imprimiran la vista previa a los datos de los estudiantes
 * @var {...HTMLTableSectionElement} tbody Es el cuerpo de la tabla a imprimir
 * @var {...Array} headsPrintable Contiene una lista con los nombre que hacen referencia entre los encabezados de la tabla
 * y los nombre en un JSON Student
 * @var {...Number} numberColmnsPrintable Contiene el en numero de encabezados imprimibles en texto
 *
 */
const table = document.getElementById("students_table");
const tbody = table.createTBody();
const headsPrintable = ["firstName", "lastName", "status"];
const numberColmnsPrintable = headsPrintable.length;


/**
 * Esta funcion se encarga de recibir un numero y devolver un string de un boton HTML
 * que contendra el index del estudiante en la variable students del estudiante al que hace refencia dicha fila.
 * @param {...HTMLTableRowElement} id
 * @returns {...String}
 */
const buttonStudentViewMoreTemplate = id => {
    return `<button student=${id} class="btnStudent btn btn-info btn-block">Inspeccionar</button>`;
};


/**
 * Crea una una columna en la fila e inserta un boton en ella
 * @param {...HTMLTableRowElement} row
 * @param {...Number} index hace refernecia al index del estudiante en la lista students
 * @returns 
 */
const addButton = (row, index) => {
    const col = row.insertCell();
    col.innerHTML = buttonStudentViewMoreTemplate(index);
};


/**
 * Esta funcion imprime una nueva fila e inserta los datos del alumno en ella
 * @param {...HTMLTableSectionElement} tbody
 * @param {...Array} students
 * @param {...Number} indexStudent
 * @param {...Number} numberColmnsPrintable
 * @param {...Array} heads
 * @returns La fila creada
 */
function newRow(tbody, student, indexStudent, numberColmnsPrintable, heads) {
    let row = tbody.insertRow();
    for (let i = 0; i < numberColmnsPrintable; i++) {
        col = row.insertCell();
        col.innerText = student[heads[i]];
    }
    addButton(row, indexStudent);
    return row;
}


/**
 * Esta funcion alterna el estado del display de un elemento HTML en su propiedad de css
 * entre 'none' y 'block'
 * 
 * @param {...string} nameId
 * 
 */
const togglerDisplay = (nameId) => {
    const $modal = document.getElementById(nameId);
    if ($modal.style.display == 'block') {
        $modal.attributeStyleMap.set('display', 'none');
    } else {
        $modal.attributeStyleMap.set('display','block')
    };
}


const fillData = (student, className) => {
    const $inputsForm = document.querySelectorAll(`.${className}`);

    /* se llama un forEach de un arreglo generico para se usado en el arreglo de los elementos del formulario
    dado a que estos son de tipo NodeList y su prototype no cuenta con un forEach */
    Array.prototype.forEach.call($inputsForm, (element) => {
        
        let inputName =  element.getAttribute('id');
        
        switch (element.type) {
            case 'select-one':
                    debugger;
                    element[student[inputName]].selected = true;
                break;
                
                default:
                    element.value  = student[inputName];
                break;
        }
    });
};

setTimeout(() => {
    students.forEach((element, index) => {
        newRow(tbody, element, index, numberColmnsPrintable, headsPrintable);
    });
    buttons = document.querySelectorAll('.btnStudent');
    $form = document.getElementById('formModal');
}, 10);

setTimeout( () => {
    /* se llama un forEach de un arreglo generico para se usado en el arreglo de los elementos del formulario
    dado a que estos son de tipo NodeList y su prototype no cuenta con un forEach */
    Array.prototype.forEach.call(buttons,(element) => {
        element.addEventListener('click', (event) => {
            
            const indexStudent = event.currentTarget.getAttribute('student');
            fillData(students[indexStudent], 'formModal');
            togglerDisplay('modalStudents');
        }); 
    
    });

}, 1000);

const students = [
    {
        firstName: "Jesus",
        lastName: "Corobo",
        status: "activo"
    },
    {
        firstName: "Jesus",
        lastName: "Millan",
        status: "activo",
        birthdate: "30/12/1996",
        email : "jgmc3012@gmail.com",
        country: "0",
        city: "2",
        career: "0",
        status: "activo",
    },
    {
        firstName: "Manuel",
        lastName: "Marcano",
        status: "inactivo"
    },
    {
        firstName: "Claudio",
        lastName: "Nazoa",
        status: "activo"
    }
];