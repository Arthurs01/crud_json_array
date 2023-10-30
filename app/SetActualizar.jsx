

const SetActualizar = ({ dat, data, setData, editData, EditChange, inputRef, index }) => {
    
    return (
        
        <tr key={data.id} style={{position:'relative'}} >
            <td>{data.id}{index}</td>
            
            <td><input id='nombreIDx' type="text" required="required" name="inputNombre" defaultValue={editData.inputNombre}
                onChange={EditChange} /* ref={inputRef} */ />
            </td>
            <td>
                <input id='edadIDx' type="text" required="required" name="inputEdad" defaultValue={editData.inputEdad}
                onChange={EditChange} /></td>
            
            <td><button type='submit' >update</button></td>
        </tr>
    )
}

export default SetActualizar