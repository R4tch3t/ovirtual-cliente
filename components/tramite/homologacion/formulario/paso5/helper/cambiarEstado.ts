import { types } from "../../../../../../types/tramites";
const cambiarEstado = (dispatch:any) => {
    const nombrePaso='paso5';
    const nombreCampo='completo';
    const valorCampo=undefined
    
    dispatch({
        type: types.cambiarPaso,
        payload: {nombrePaso,nombreCampo,valorCampo}
    });
    
}

export {cambiarEstado}

