import { validarCURP } from "../../../../../../helpers/validarCURP";
import { types } from "../../../../../../types/tramites";

const validarCurp = (value:string,setInputs:any,inputs:any,dispatch:any) => {
    const valida = value !== undefined ? validarCURP(value):value//value.match(/^[A-Z]{3,32}$/i);
    const name='curp'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'C.U.R.P INVALIDA',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
        setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'C.U.R.P ¡VALIDA!',
            statusColor: 'primary'
        }})
        const nombrePaso='paso1';
        const nombreCampo='curp';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
    }
    return valida
};

export {validarCurp}