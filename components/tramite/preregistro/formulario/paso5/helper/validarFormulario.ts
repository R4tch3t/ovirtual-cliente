import { TypePaso5 } from "../../../../../../interfaces/pasos/preregistro"

const validarFormulario5 = (paso5: TypePaso5) => {
    let valido = paso5?.esEmpleado !== undefined
        valido = paso5?.esEmpleado === true ? 
        (paso5.porcentajeAportaID!==undefined && paso5.porcentajeDependeID!==undefined ) : 
        (valido && paso5?.ingresoMensualID!==undefined && paso5?.dineroSemanalID!==undefined)
        valido = valido && paso5?.empleoMadreID !== undefined && paso5.empleoPadreID !== undefined
        
        
    return valido
}   

export {validarFormulario5}