import { types } from "../../../../../../types/tramites";

const validarEscuelaProcedencia = (value:string,setInputs:any,inputs:any,dispatch:any) => {
    const valida = value !== undefined ? value.match(/^[0-9A-Z ]{3,32}$/i):value;
    const name='escuelaProcedencia'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Nombre INVALIDO',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
        setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'Nombre ¡VALIDA!',
            statusColor: 'success'
        }})
    }
        const nombrePaso='paso4';
        const nombreCampo='escuelaProcedencia';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    
    return valida
};

export {validarEscuelaProcedencia}