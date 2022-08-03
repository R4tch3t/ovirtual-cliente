import { types } from "../../../../../../types/tramites";

const validarEmail = (confirmE:string, value:string,setInputs:any,inputs:any,dispatch:any) => {
    let valida:any = value !== undefined ? value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i) : value;
    const name='email'
    if(!valida){
      setInputs({...inputs,[name]:{
        color: 'error', 
        helper: 'Email INVÁLIDO',
        statusColor: 'error'
      }})
    }

  
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
      
    return valida
};

export {validarEmail}