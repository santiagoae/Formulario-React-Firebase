import React , {useState,useEffect} from 'react'
import {store} from './firebaseconf'

function App() {

  const [nombre,setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [usuarios,setUsuarios] = useState([])
  const [error, setError] = useState('')
  const [idusuario,setIdusuario] = useState('')
  const [modoedicion, setModoEdicion] = useState(null)

  const validacionUsuario = async (e) =>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo Nombre esta vacio')
    }
    if(!phone.trim()){
      setError('El campo Telefono esta vacio')
    }
    const usuario = {
      nombre:nombre,
      telefono:phone
    }

    try {
    const data = await store.collection('agenda').add(usuario)
    const {docs} = await store.collection('agenda').get()
    const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
    setUsuarios(nuevoArray)
    alert('crack')
    } catch (e) {
      console.log(e);
    }
    setNombre('')
    setPhone('')
    
  }

  useEffect(()=>{
    const getUsuarios = async()=>{
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuarios(nuevoArray)
    }
    getUsuarios()
  },[])

  const BorrarUsuario = async (id) =>{
    try {
      await store.collection('agenda').doc(id).delete()
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuarios(nuevoArray)
    } catch (e) {
      console.log(e);
    }
  }

  const PulsarActualizar = async (id) =>{
    try {
      const data= await store.collection('agenda').doc(id).get()
      const {nombre, telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdusuario(id)
      console.log(id);
      setModoEdicion(true)
    } catch (e) {
      console.log(e);
    }
  }

  const setUpdate = async (e) => {
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo Nombre esta vacio')
    }
    if(!phone.trim()){
      setError('El campo Telefono esta vacio')
    }

    const userUpdate = {
      nombre:nombre,
      telefono:phone
    }
    try {
      await store.collection('agenda').doc(idusuario).set(userUpdate)
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuarios(nuevoArray)
    } catch (e) {
      console.log(e);
    }
    setNombre('')
    setPhone('')
    setIdusuario('')
    setModoEdicion(false)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>

          <form onSubmit={modoedicion ? setUpdate : validacionUsuario} className="form-group">
            <input
            value={nombre} 
            onChange={(e)=>{setNombre(e.target.value)}}
            className='form-control' 
            placeholder='Introduce el nombre' 
            type="text" />

            <input
            value={phone} 
            onChange={(e)=>{setPhone(e.target.value)}}
            className='form-control mt-3' 
            placeholder='Introduce el numero' 
            type="text" />

            {
              modoedicion ? 
              (
                <input 

                className="btn btn-dark w-100 mt-3"
                value='EDITAR' 
                type="submit" />
              )
              :
              (
                <input 

                className="btn btn-dark w-100 mt-3"
                value='REGISTRAR' 
                type="submit" />
              )
            }

            

          </form>
          {
            error ? 
            (
              <div>
                <p>{error}</p>
              </div>
            )
            :
            (
              <span></span>
            )
          }
        </div>

        <div className="col">
          <h2>Lista de tu Agenda</h2>
            <ul className='list-group'>
              {
              usuarios.length !== 0 ?
              (
                usuarios.map( item => (
                  <li  className='list-group-item' key={item.id}>{item.nombre} -- {item.telefono} 
                  <button onClick={(id)=>{BorrarUsuario(item.id)}} className='btn btn-danger float-right'>BORRAR</button>
                  <button onClick={(id)=>{PulsarActualizar(item.id)}} className='btn btn-info float-right mr-3'>ACTUALIZAR</button>
                  </li>
                  
                ))
              )
              :
              (
                <span>Lo siento no hay usuarios en tu agenda</span>
              )
            }
            </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
