import { types } from "../../../../../../types/tramites";

const validarApe1 = (value:string,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value !== undefined ? value.match(/^[A-Z ]{3,32}$/i) : value;
  const name='ape1'
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Apellido paterno INVALIDO',
      statusColor: 'error'
    }})
  }

//}

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Apellido paterno ¡VALIDO!',
          statusColor: 'primary'
      }})
      const nombrePaso='paso1';
      const nombreCampo='ape1';
      const valorCampo=value
      
      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  }
  return valida
};

export {validarApe1}