import { types } from "../../../../../../types/tramites";

const validarColonia = (value:string,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value !== undefined ? value.match(/^[0-9A-Z ]{3,32}$/i) : value;
  const name='colonia'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Colonia INVALIDA',
      statusColor: 'error'
    }})
  }

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Colonia ¡VALIDA!',
          statusColor: 'primary'
      }})
  }
  const nombrePaso='paso2';
  const nombreCampo='colonia';
  const valorCampo=value
  
  dispatch({
      type: types.cambiarPaso,
      payload: {nombrePaso,nombreCampo,valorCampo}
  });
  
  return valida
};

export {validarColonia}