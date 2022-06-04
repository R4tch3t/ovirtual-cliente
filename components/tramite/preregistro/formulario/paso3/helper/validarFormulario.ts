import { TypePaso3 } from "../../../../../../interfaces/pasos/preregistro"

const validarFormulario3 = (paso3: TypePaso3) => {
    let valido = paso3?.esPuebloOriginario !== undefined
        valido = paso3?.esPuebloOriginario === true ? (paso3.puebloID!==undefined) : valido
        
        
        if(!valido){
            return false
        }

        valido = paso3?.padeceDiscapacidad === true ? (paso3.discapacidadID !== undefined && valido) : paso3?.padeceDiscapacidad !== undefined
        valido = valido && paso3?.esAfroamericano !== undefined && paso3?.esResidenteSierra !== undefined && paso3?.esHijoMigrante !== undefined        
        
    return valido
}   

export {validarFormulario3}