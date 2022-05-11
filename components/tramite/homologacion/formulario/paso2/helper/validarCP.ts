import { types } from "../../../../../../types/tramites";

const validarCP = (value:string | undefined,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value !== undefined ? value.match(/^[0-9]{1,5}$/i) : value;
  const name='cp'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Código Postal INVALIDO',
      statusColor: 'error'
    }})
  }

//}

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Código Postal ¡VALIDO!',
          statusColor: 'primary'
      }})
  }
      const nombrePaso='paso2';
      const nombreCampo='cp';
      const valorCampo=value
      
      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  
  return valida
};

export {validarCP}