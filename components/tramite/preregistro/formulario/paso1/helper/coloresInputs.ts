import { validarCURP } from '../../../../../../helpers/validarCURP';
import { TypePaso1 } from '../../../../../../interfaces/pasos/preregistro';

export const coloresInputs1 = (paso1:TypePaso1) => {
    const inputs:any = {}    
    const curpValido = paso1?.curp !== undefined ? validarCURP(paso1?.curp) : paso1?.curp 
    if(!curpValido){
        inputs.curp = {
            color: 'error', 
            helper: 'Número de celular INVALIDO',
            statusColor: 'error'
        }
    }else{
        inputs.curp={color: 'primary'}
    }

    const nombreValido = paso1?.nombre?.match(/^[A-Z ]{3,32}$/i) 
    if(!nombreValido){
        inputs.nombre = {
            color: 'error', 
            helper: 'Nombre INVALIDO',
            statusColor: 'error'
          }
    }else{
        inputs.nombre={color: 'primary'}
    }

    const ape1Valido = paso1?.ape1?.match(/^[A-Z ]{3,32}$/i) 
    if(!ape1Valido){
        inputs.ape1 = {
            color: 'error', 
            helper: 'Apellido paterno INVALIDO',
            statusColor: 'error'
          }
    }else{
        inputs.ape1={color: 'primary'}
    }

    inputs.ape2={color: 'secondary'}
    
    const celularValido = paso1?.celular?.toString()?.match(/^[0-9]{10,10}$/i)
    if(!celularValido){
        inputs.celular = {
            color: 'error', 
            helper: 'Número de celular INVALIDO',
            statusColor: 'error'
        }
    }else{
        inputs.celular={color: 'primary'}
    }

    inputs.telefono={color: 'secondary'}
    
    const emailValido = paso1?.email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i)
    if(!emailValido){
        inputs.email = {
            color: 'error', 
            helper: 'Email INVALIDO',
            statusColor: 'error'
          }
    }else{
        inputs.email={color: 'primary'}
    }

    const confirmEmailValido = paso1?.confirmEmail?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i)

    if(!confirmEmailValido){

        inputs.confirmEmail = {
            color: 'error', 
            helper: 'Email INVALIDO',
            statusColor: 'error'
          }
    }else{
        if(paso1?.confirmEmail!==paso1?.email){
            inputs.confirmEmail = {
                color: 'error', 
                helper: '¡ERROR! La confirmación fallo...',
                statusColor: 'error'
            }
        }else{
            inputs.confirmEmail={color: 'primary'}
        }
    }
    
    return inputs
}