import { types } from "../../../../../../types/tramites";
import { confirmEmail } from "./confirmEmail";
//import { TypePaso1 } from '../../../../../../interfaces/pasos/homologacion/paso1';

const validarEmail = (confirmE:string, value:string,setInputs:any,inputs:any,dispatch:any) => {
    let valida:any = value !== undefined ? value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i) : value;
    const name='email'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Email INVALIDO',
        statusColor: 'error'
      }})
    }

  //}
  
    if(valida){
        if(confirmE !== value){
          valida=false
          setInputs({...inputs,[name]:{
            color: 'primary', 
            helper: 'Email ¡VALIDO!',
            statusColor: 'primary'
          },
          ['confirmEmail']:{
            color: 'error', 
            helper: '¡ERROR! La confirmación fallo...',
            statusColor: 'error'
          }})
        }else{
          setInputs({...inputs,[name]:{
              color: 'primary', 
              helper: 'Email ¡VALIDO!',
              statusColor: 'primary'
          },
          ['confirmEmail']:{
            color: 'primary', 
            helper: 'Email ¡VALIDO!',
            statusColor: 'primary'
          }})
        }
    }
        const nombrePaso='paso1';
        const nombreCampo='email';
        const valorCampo=value
        
        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso,nombreCampo,valorCampo}
        });
      
        //confirmEmail(confirmE!,value.toLowerCase(),setInputs,inputs,dispatch)

    return valida
};

export {validarEmail}