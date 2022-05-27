import { TypePaso2 } from "../../../../../../interfaces/pasos/homologacion"

const validarFormulario2 = (paso2: TypePaso2) => {
    let valido: any = paso2?.calle?.match(/^[0-9A-Z ]{3,32}$/i) && 
    paso2?.colonia?.match(/^[0-9A-Z ]{3,32}$/i) && 
    paso2?.numeroExt?.match(/^[0-9]{1,10}$/i)
    valido = valido && paso2?.entidadFedID !== undefined && paso2?.localidadID !== undefined && paso2?.municipioID !== undefined
    valido = valido && paso2?.cp?.toString()?.match(/^[0-9]{1,5}$/i)
    return valido
}   

export {validarFormulario2}