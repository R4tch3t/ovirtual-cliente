import { types } from "../../../types/tramites";

export const cambiarValorCombo = (value:any, dispatch:any) => {     
    switch(value.id){
    case 1:
       dispatch({
         type: types.cargarTramites,
         payload: {tramites: null, catNivelEstudio:'T[4,5,6,7]'}
       });
        break
    case 2:
       dispatch({
         type: types.cargarTramites,
         payload: {tramites: null, catNivelEstudio:'S[4,5,6,7]'}
       });
         break
    case 3:
       dispatch({
         type: types.cargarTramites,
         payload: {tramites: null, catNivelEstudio:'MS[1,2,3]'}
       });
         break
    case 4:
        dispatch({
            type: types.cargarTramites,
            payload: {tramites: null, catNivelEstudio:'O[]'}
        });
        break
    }
   dispatch({
     type: types.catSeleccionado,
     payload: value
   });
  }