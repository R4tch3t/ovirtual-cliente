import { validarCURP } from '../../../../../../helpers/validarCURP';
import { TypePaso1 } from '../../../../../../interfaces/pasos/preregistro/paso1';

const validarFormulario1 = (paso1: TypePaso1) => {
    let valido: any = paso1?.nacionalidadID !== undefined
    valido = paso1?.nacionalidadID === 1 ? (valido && paso1?.paisID !== undefined && paso1?.paisID !== null) : valido
    valido = valido && 
    paso1?.nombre?.match(/^[A-Z ]{3,32}$/i) && paso1?.ape1?.match(/^[A-Z ]{3,32}$/i) 
    && (paso1?.curp !== undefined ? validarCURP(paso1?.curp):paso1?.curp) && paso1?.celular?.toString()?.match(/^[0-9]{10,10}$/i) 
    && paso1?.email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i) && paso1?.email! === paso1?.confirmEmail!

    return valido
}   

export {validarFormulario1}