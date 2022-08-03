import { types } from "../../../../../../types/tramites";

const confirmEmail = (value:string, emailActual:string, setInputs:any,inputs:any,dispatch:any) => {    
    const valida = emailActual && value === emailActual     
    const name='confirmEmail'
    if(!valida){
      const helper = emailActual ? '¡ERROR! La confirmación fallo...' : 'Email INVÁLIDO' 
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper,
        statusColor: 'error'
      }})
    }

  
    if(valida){
      
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Email ¡VALIDO!',
          statusColor: 'primary'
      }})
      
    }
    const nombrePaso='paso1';
    const nombreCampo='confirmEmail';
    const valorCampo=value
    
    dispatch({
        type: types.cambiarPaso,
        payload: {nombrePaso,nombreCampo,valorCampo}
    });
    return valida
};

export {confirmEmail}