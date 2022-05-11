import { TypePaso4 } from '../../../../../../interfaces/pasos/homologacion';
export const coloresInputs4 = (paso4:TypePaso4) => {
    //if(campo==='celular'){
    const inputs:any = {}    
    

    const nombreValido = paso4?.escuelaProcedencia?.match(/^[0-9A-Z ]{3,32}$/i) 
    if(!nombreValido){
        inputs.escuelaProcedencia = {
            color: 'error', 
            helper: 'Nombre INVALIDO',
            statusColor: 'error'
          }
    }else{
        inputs.escuelaProcedencia={color: 'primary'}
    }

    const matriculaValido = paso4?.matricula?.match(/^[0-9]{8,8}$/i)
    if(!matriculaValido){
        inputs.matricula = {
            color: 'error', 
            helper: 'Matrícula INVALIDA',
            statusColor: 'error'
          }
    }else{
        inputs.matricula={color: 'primary'}
    }

    //}
    
    return inputs
}