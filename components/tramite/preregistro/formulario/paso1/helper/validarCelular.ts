import { types } from "../../../../../../types/tramites";

const validarCelular = (value:string | undefined,setInputs:any,inputs:any,dispatch:any) => {
  const valida = value !== undefined ? value.match(/^[0-9]{10,10}$/i) : value;
  try{
  const name='celular'
  let valorCampo=value
  if(!valida){
    setInputs({...inputs,[name]:{
      color: 'error', 
      helper: 'Número de celular INVÁLIDO',
      statusColor: 'error'
    }})
  }

  if(valida){
      setInputs({...inputs,[name]:{
          color: 'primary', 
          helper: 'Número de celular ¡VALIDO!',
          statusColor: 'primary'
      }})
  }    
      const nombrePaso='paso1';
      const nombreCampo='celular';
      
      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  }catch(e){
    console.log(e)
  }
  return valida
};

export {validarCelular}