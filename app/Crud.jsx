'use client'
import styles from './crud.module.css'
import Image from 'next/image'
import UpdateImg from '../public/update.png'
import DeleteImg from '../public/delete.png'

import { useState, useRef } from 'react'
import SetActualizar from './SetActualizar'

const usuarios = [
    { id: 1, nombre: 'Arturo López', edad: 15 },
    { id: 4, nombre: 'Marco Medina', edad: 40 },
    { id: 2, nombre: 'Judith Acosta', edad: 19 },
    { id: 3, nombre: 'Mara Herrera', edad: 35 },
]
export default function Crud() {
    const fijo = useRef(null);
    const [data, setData] = useState(usuarios)
    const [editData, setEditData] = useState({ nombre: "", edad: "" });
    const [editId, setEditId] = useState(null);
    const [nombre, setNombre] = useState(false)
    const [edad, setEdad] = useState(false)

    //------------------------------------
    console.log(nombre)

    const Agregar = (id) => {
        (nombre == false) ? alert('Campo Nombre vacío...') :
            (edad == false) ? alert('Campo Edad vacío...') :
                setData([...data, { id, nombre, edad }])
        setEditId(null)
}

   /*  if(nombre == false){
       alert('ERROR NOMBRE');
        } else if(edad==false){
            alert('ERROR EDAD');
        } else{
            
            setData([...data, { id, nombre, edad }])
        } */

    const Eliminar = (datID) => {
        const eliminar = data.filter(dato => (dato.id !== datID))
        const confirmar = confirm('Seguroo que desea eliminar al usuario:')

        confirmar === true ? setData(eliminar) :
            null

    }
    /* const Copiar = (datID) => {
        const copiar = data.find(dato => (dato.id === datID))
        setData([copiar])
    } */

    const Update = (dat) => {
        setEditId(dat.id);
        const formValues = { inputNombre: dat.nombre, inputEdad: dat.edad }
        setEditData(formValues); // FILA COMPONENTE DE ARREGLO
    };

    /* const inputRef = useRef(); */
    const EditChange = (event) => {
        event.preventDefault()
        const newFormData = { ...editData };  // PASAMOS VALORES DE EDITDATA(setEditData)  A NEWFORMDATA
        const InputName = event.target.getAttribute('name')
        const INameValue = event.target.value
        newFormData[InputName] = INameValue
        setEditData(newFormData)//NUEVO ARRAY EDITADO
        /* inputRef.current.focus(); */
    }
    const FormSubmit = (event) => {
        event.preventDefault();

        const index = data.findIndex((da) => da.id === editId);
        const editedData = { id: editId, nombre: editData.inputNombre, edad: editData.inputEdad }
        const newData = [...data];
        newData[index] = editedData;
        setData(newData);
        setEditId(null)
        console.log(newData)
    }

    return (
        <div className={styles.main_section}>
            <p className={styles.newUser}>New User:</p>
            <br />
            <form id='addForm' name='addForm' onSubmit={FormSubmit}>
                <div id='formInputs'>
                    <input type="text" className={styles.input_text} onChange={(e) => setNombre(e.target.value)} placeholder='Name' /><br /><br />

                    <input type="text" className={styles.input_text} onChange={(e) => setEdad(e.target.value)} placeholder='Pass' /><br /><br />
                </div>
                <button className={styles.btn_add} type='submit' id='add' onClick={() => Agregar()}>Add</button><br />
                <br />
                <table className={styles.main_table}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Pass</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dat, index) => (
                            editId === dat.id ?

                                <SetActualizar key={dat.id} dat={dat.id} data={data} index={index + 1}
                                    editData={editData} setData={setData} EditChange={EditChange} />
                                :
                                <tr key={dat.id} index={dat.id = index}>
                                    <td>{index + 1}</td>
                                    <td>{dat.nombre}</td>
                                    <td>{dat.edad}</td>
                                    <td>
                                        <Image className={styles.action_icons} src={UpdateImg} alt='Update data' onClick={() => Update(dat)} style={{ width: '25px', height: '25px' }} />&nbsp;&nbsp;
                                        <Image className={styles.action_icons} src={DeleteImg} alt='Delete data' onClick={() => Eliminar(dat.id)} style={{ width: '25px', height: '25px' }} />
                                    </td>
                                </tr>
                        )
                        )}
                    </tbody>
                </table>
            </form>
        </div>
    )
}

