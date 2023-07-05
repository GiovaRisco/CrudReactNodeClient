import './App.css';
import { useState } from "react";
import Axios from "axios";

import Swal from 'sweetalert2'

function App() {
  const [id, setId] = useState(0);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);

  const [editar, setEditar] = useState(false);


  const [empleadosList, setEmpleados] = useState([])

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso</strong>",
        html: "<i>El empleado " + nombre + " fue registrado con exito</i>",
        icon: 'success',
        timer: 3000
      })

    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logro registrar el empleado',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa</strong>",
        html: "<i>El empleado " + nombre + " fue actualizado con exito</i>",
        icon: 'success',
        timer: 3000
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logro actualizar el empleado',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  const deleteEmple = (val) => {

    Swal.fire({
      title: 'Confirmar eliminado',
      html: "<i>Realmente desea eliminar a  " + val.nombre + "</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`, {

        }).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire(
            {
            text: val.nombre + ' fue eliminado',
            icon : 'success',
            timer : 3000
            });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logro eliminar el empleado',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    })
  }

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setEdad("");
    setCargo("");
    setPais("");
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);

  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logro listar a los empleados',
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }


  return (
    <div className='container'>
      <div className="d-grid gap-2 d-md-block mb-4 mt-4">
        <button
          onClick={() => {
            getEmpleados();
          }}
          className="btn btn-warning md-3" type="button">Listar Empleado</button>
      </div>
      <div className="card">
        <div className="card-header">
          GESTION DE EMPLEADOS
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="email"
              onChange={(event) => {
                setNombre(event.target.value)
              }}
              className="form-control" value={nombre} placeholder="Ingrese su nombre" id="nombre" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="edad" className="form-label">Edad:</label>
            <input type="number"
              onChange={(event) => {
                setEdad(event.target.value)
              }}
              className="form-control" value={edad} placeholder="Ingrese su edad" id="edad" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="pais" className="form-label">Pais:</label>
            <input type="text"
              onChange={(event) => {
                setPais(event.target.value)
              }}
              className="form-control" value={pais} placeholder="Ingrese su pais" id="pais" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="cargo" className="form-label">Cargo:</label>
            <input type="text"
              onChange={(event) => {
                setCargo(event.target.value)
              }}
              className="form-control" value={cargo} placeholder="Ingrese su cargo" id="cargo" aria-describedby="emailHelp" />
          </div>

          <div className="mb-3">
            <label htmlFor="anios" className="form-label">Año:</label>
            <input type="number"
              onChange={(event) => {
                setAnios(event.target.value)
              }}
              className="form-control" value={anios} placeholder="Ingrese sus años de experiencia" id="anios" aria-describedby="emailHelp" />
          </div>
        </div>
        <div className="card-footer text-body-secondary text-center">
          {
            editar === true ?
              <div>
                <button className='btn btn-warning me-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info' onClick={() => {
                  setEditar(false);
                  limpiarCampos();
                }}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {

            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="d-grid gap-2 d-md-block">
                    <button
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-primary me-3" type="button">Editar</button>
                    <button
                      onClick={() => {
                        deleteEmple(val);
                      }}
                      className="btn btn-danger" type="button">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  );

}

export default App;
