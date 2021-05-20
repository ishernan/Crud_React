import React from 'react';
//import { nanoid } from 'nanoid';
//import shortid from 'shortid';

function App() {

const [tarea, setTarea] = React.useState('') //Creacion de states. 'React' permet de d'importer useState directement dans la ligne
const [tareas, setTareas] = React.useState([])
const [modoEdicion, setModoEdicion] = React.useState(false)//para que al presionar editar el formulario cambie a editar pasando a verdadero (o activo)
const [id, setId] = React.useState('')
const [error, setError] = React.useState(null)

const number = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};

const agregarTarea = e => {
  e.preventDefault()   // para prevenir que se procese el formulario con el evento Get (comportamiento de HTML pour defecto)
  if(!tarea.trim()) {
  console.log('Elemento vacio')
  setError('Agregue objeto...')
  return 
}
console.log(tarea)

setTareas([
  ...tareas, 
  {id: number(10), nombreTarea:tarea}
])

setTarea('')
setError(null)
}

const eliminarTarea = id => {
  // console.log(id)
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)
}

const editar = item => {
  setModoEdicion(true)
  setTarea(item.nombreTarea)
  setId(item.id)
}

const editarTarea = e => {
  e.preventDefault()   // para prevenir que se procese el formulario con el evento Get (comportamiento de HTML pour defecto)
  if(!tarea.trim()) {
  console.log('Elemento vacio')
  setError('Agregue objeto...')
  return 
}
  const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea} : item)

  setTareas(arrayEditado)
  setModoEdicion(false)
  setTarea('')
  setId('')
  setError(null)
  }

return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
           {

            tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
              tareas.map(item =>(
              <li className="list-group-item" key={item.id}>
              <span className="lead">{item.nombreTarea}</span>
              <button 
              className="btn btn-danger btn-sm float-end mx-2"
              onClick={() => eliminarTarea(item.id)}
              >
                Eliminar
                </button>

              <button 
              className="btn btn-warning btn-sm float-end"
              onClick={() => editar(item) }
              >
               Editar
                </button>
            </li>
             )))

             
           }
          
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea' //cuando el modo edicion sea verdadero 'editar tarea', sino 'agregar tarea' (que es false por defecto)
            }
          </h4>    

          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input // para relacionar este input con nuestro "estado"
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={ e => setTarea(e.target.value)} //asi se recuperan los valores ingresados
              value={tarea} //se limpia el formulario llamando los valores iniciales
            />
            {
              modoEdicion ? (<button className="btn btn-warning w-100" type="submit">Editar</button>) : (<button className="btn btn-dark w-100" type="submit">Agregar</button> )
            }
            
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
