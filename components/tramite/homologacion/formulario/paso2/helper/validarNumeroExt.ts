import { types } from "../../../../../../types/tramites";

const validarNumeroExt = (value:string | undefined,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value !== undefined ? value.match(/^[0-9]{1,10}$/i) : value;
  const name='numeroExt'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Número exterior INVALIDO',
      statusColor: 'error'
    }})
  }

//}

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Número exterior ¡VALIDO!',
          statusColor: 'primary'
      }})
  }
      const nombrePaso='paso2';
      const nombreCampo='numeroExt';
      const valorCampo=value
      
      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  
  return valida
};

export {validarNumeroExt}