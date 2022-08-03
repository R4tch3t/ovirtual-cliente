import { TypePaso2 } from '../../../../../../interfaces/pasos/preregistro';
export const coloresInputs2 = (paso2:TypePaso2) => {

    const inputs:any = {}    
    const calleValido = paso2?.calle?.match(/^[0-9A-Z ]{3,32}$/i)
    if(!calleValido){
        inputs.calle = {
            color: 'error', 
            helper: 'Calle INVALIDA',
            statusColor: 'error'
          }
    }else{
        inputs.calle={color: 'primary'}
    }

    const numExtValido = paso2?.numeroExt?.match(/^[0-9]{1,10}$/i) 
    if(!numExtValido){
        inputs.numeroExt = {
            color: 'error', 
            helper: 'Número exterior INVÁLIDO',
            statusColor: 'error'
        }
    }else{
        inputs.numeroExt={color: 'primary'}
    }

    inputs.numeroInt={color: 'secondary'}
    
    const coloniaValido = paso2?.colonia?.match(/^[0-9A-Z ]{3,32}$/i)
    if(!coloniaValido){
        inputs.colonia = {
            color: 'error', 
            helper: 'Colonia INVALIDA',
            statusColor: 'error'
          }
    }else{
        inputs.colonia={color: 'primary'}
    }
    
    const cpValido = paso2?.cp?.toString()?.match(/^[0-9]{1,5}$/i)
    if(!cpValido){
        inputs.cp = {
            color: 'error', 
            helper: 'Código Postal INVÁLIDO',
            statusColor: 'error'
        }
    }else{
        inputs.cp={color: 'primary'}
    }
   
    return inputs
}