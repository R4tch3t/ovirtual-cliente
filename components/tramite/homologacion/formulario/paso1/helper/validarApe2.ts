import { types } from "../../../../../../types/tramites";

const validarApe2 = (value:string,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value.match(/^[A-Z ]{0,32}$/i);
  const name='ape2'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Apellido materno INVALIDO',
      statusColor: 'error'
    }})
  }

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'secondary', 
          helper: 'Apellido materno ¡VALIDO!',
          statusColor: 'primary'
      }})
  }
      const nombrePaso='paso1';
      const nombreCampo='ape2';
      const valorCampo=value
      
      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  
  return valida
};

export {validarApe2}