import { types } from "../../../../../../types/tramites";

const validarNombre = (value:string,setInputs:any,inputs:any,dispatch:any) => {
    const valida = value !== undefined ? value.match(/^[A-Z ]{3,32}$/i):value;
    const name='nombre'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Nombre INVALIDO',
        statusColor: 'error'
      }})
    }
  
    if(valida){
        setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'Nombre ¡VALIDO!',
            statusColor: 'primary'
        }})
    }
        const nombrePaso='paso1';
        const nombreCampo='nombre';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    
    return valida
};

export {validarNombre}