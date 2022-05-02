import { TypeTramitesAction, TypeTramitesState } from "../../interfaces";
import {types} from "../../types/tramites";
import { TypeHomologacion } from '../../interfaces/TypesTramitesContext';

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
        case types.seleccionarPlan:
            const {planID, planElegido, localidad} = action.payload
            
            return {
                ...state,
                procedimientos: {
                    homologacion: {
                        planID,
                        planElegido,
                        localidad,
                        paso1: null,
                        paso2: null
                    }
                }
            }
            case types.cambiarPaso:
                const {nombrePaso, nombreCampo, valorCampo} = action.payload
                const homo:any = state.procedimientos.homologacion!
                const paso = homo[nombrePaso]
                return {
                    ...state,
                    procedimientos: {
                        homologacion: {
                            ...state.procedimientos.homologacion!,
                            [nombrePaso]: {
                                //...(state.procedimientos.homologacion![nombrePaso]),
                                ...paso,
                                [nombreCampo]: valorCampo
                            }
                        }
                    }
                }                    
        default: 
            return state;
    }
}
