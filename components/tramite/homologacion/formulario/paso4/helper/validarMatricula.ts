import { types } from "../../../../../../types/tramites";

const validarMatricula = (value:string,setInputs:any,inputs:any,dispatch:any) => {
    const valida = value !== undefined ? value.match(/^[0-9]{8,8}$/i):value;
    const name='matricula'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Matrícula INVALIDA',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
        setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'Matrícula ¡VALIDA!',
            statusColor: 'success'
        }})
    }
        const nombrePaso='paso4';
        const nombreCampo='matricula';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    
    return valida
};

export {validarMatricula}