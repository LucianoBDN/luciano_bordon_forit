
import { useState,  useEffect } from "react";


import "./App.css"








function App() {
 
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [empresa, setEmpresa] = useState('');


  const [seleccionado, setSeleccionado] = useState(null);
  
  const [busqueda, setBusqueda] = useState("")
  
  const [ datos, setDatos] = useState([]);

  useEffect(() => { fetch('https://jsonplaceholder.typicode.com/users')
    .then((respuesta) => respuesta.json())
    .then((datos) => setDatos(datos));
  }, []);

  useEffect(() => {
    setUsuarios(datos);
  }, [datos]);

  const agregarUsuario = () => {
    const nuevoUsuario = {
      id: usuarios.length + 1,
      name: nombre,
      username,
      email,
      address: {
        city: ciudad,
      },
      phone: telefono,
      company: {
        name: empresa,
      },
    };

    setUsuarios([...usuarios, nuevoUsuario]);

    setNombre('');
    setUsername('');
    setEmail('');
    setCiudad('');
    setTelefono('');
    setEmpresa('');
  };



  



  const alternarSeleccionado = (userId) => {
    setSeleccionado(seleccionado === userId ? null : userId);
  };

  const buscador = (e) => {
    setBusqueda(e.target.value)
    // console.log(e.target)
  }

  let datosBuscados = []
  if (!busqueda)
  {
    datosBuscados = usuarios
  } else{ 
      datosBuscados = usuarios.filter( (usuario) =>
      usuario.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(busqueda.toLowerCase()) || 
      usuario.address.city.toLowerCase().includes(busqueda.toLowerCase())
      
  )
  }
  


  return (
    <div className="App">
      <header className="App-header">
        <div className="container-buscador">
          <input value={busqueda} onChange={buscador} type="texot" placeholder="Busqueda" className="buscador">
          </input>
        </div>

        <ul className="lista-usuarios">
          {datosBuscados.map((user) => (
            <li 
              key={user.id} 
              className="tarjeta-usuario" 

              onClick={() => alternarSeleccionado(user.id)}
            >
              <p className="nombre-usuario">Nombre: {user.name}</p>
              {(seleccionado === user.id) && (
                <div className="detalles">
                  <p>Usuario: {user.username}</p>
                  <p>Email: {user.email}</p>
                  <p>Ciudad: {user.address.city}</p>
                  <p>Teléfono: {user.phone}</p>
                  <p>Empresa: {user.company.name}</p>
                </div>

              )}
            </li>
          
          ))}
        </ul>
        <div className="formulario-usuario">
              <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <input type="text" placeholder="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)}></input>
              <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}></input>
              <input type="text" placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)}></input>
              <button onClick={agregarUsuario} >Agregar Usuario</button>
  
          </div>
      </header>
    </div>
  );
}

export default App;


