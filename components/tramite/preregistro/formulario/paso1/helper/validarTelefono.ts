import { types } from "../../../../../../types/tramites";

const validarTelefono = (value:string,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value.match(/^[0-9]{10,10}$/i);
  const name='telefono'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Número de telefono INVALIDO',
      statusColor: 'error'
    }})
  }

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'secondary', 
          helper: 'Número de telefono ¡VALIDO!',
          statusColor: 'primary'
      }})
  }
  const nombrePaso='paso1';
  const nombreCampo='telefono';
  const valorCampo=value
  
  dispatch({
      type: types.cambiarPaso,
      payload: {nombrePaso,nombreCampo,valorCampo}
  });
  
  return valida
};

export {validarTelefono}