import { TypePaso4 } from "../../../../../../interfaces/pasos/homologacion"

const validarFormulario4 = (paso4: TypePaso4) => {
    let valido: any = paso4?.esEgresadoUag !== undefined
        valido = paso4?.esEgresadoUag === true ? 
        (paso4?.escuelaUagroClave!==undefined && paso4?.matricula?.match(/^[0-9]{8,8}$/i) ) : 
        (valido && paso4?.escuelaProcedencia?.match(/^[0-9A-Z ]{3,32}$/i))
    
    return valido
}   

export {validarFormulario4}