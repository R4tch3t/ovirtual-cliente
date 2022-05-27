import { types } from "../../../../../../types/tramites";

const validarCalle = (value:string,setInputs:any,inputs:any,dispatch:any) => {
    const valida = value !== undefined ? value.match(/^[0-9A-Z ]{3,32}$/i):value;
    const name='calle'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Calle INVALIDA',
        statusColor: 'error'
      }})
    }
  
    if(valida){
        setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'Calle ¡VALIDA!',
            statusColor: 'primary'
        }})
    }
        const nombrePaso='paso2';
        const nombreCampo='calle';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    
    return valida
};

export {validarCalle}