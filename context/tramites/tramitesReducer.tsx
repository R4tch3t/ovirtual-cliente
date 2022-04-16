import { TypeTramitesAction, TypeTramitesState } from "../../interfaces";
import {types} from "../../types/tramites";

export const tramitesReducer = (state:TypeTramitesState,action:TypeTramitesAction):TypeTramitesState => {
    switch(action.type){
        case types.cargarTramites:
            return {
                ...state,
                tramites: action.payload.tramites,
                tta: action.payload.tta,
                ttb: action.payload.ttb
            }
        case types.catSeleccionado:
            return {
                ...state,
                catSeleccionado: action.payload
            }                    
        default: 
            return state;
    }
}
