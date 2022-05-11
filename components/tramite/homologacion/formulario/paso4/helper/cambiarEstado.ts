import { types } from "../../../../../../types/tramites";
const cambiarEstado = (dispatch:any) => {
    const nombrePaso='paso4';
    const nombreCampo='completo';
    const valorCampo=undefined
    
    dispatch({
        type: types.cambiarPaso,
        payload: {nombrePaso,nombreCampo,valorCampo}
    });
    
}

export {cambiarEstado}

