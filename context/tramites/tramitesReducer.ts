import { TypeTramitesAction, TypeTramitesState } from "../../interfaces";
import {types} from "../../types/tramites";
import { TypeHomologacion } from '../../interfaces/TypesTramitesContext';

export const tramitesReducer = (state:TypeTramitesState,action:TypeTramitesAction):TypeTramitesState => {
    let aspiranteId = null
    let planID = null
    let planElegido = null
    let localidad = null
    let paso1 = null
    let paso2 = null
    let paso3 = null
    let paso4 = null
    let paso5 = null
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
            //{planID, planElegido, localidad} = action.payload
            planID = action.payload.planID
            planElegido = action.payload.planElegido
            localidad = action.payload.localidad
            
            return {
                ...state,
                procedimientos: {
                    homologacion: {
                        aspiranteId: null,
                        planID,
                        planElegido,
                        localidad,
                        paso1: null,
                        paso2: null,
                        paso3: null,
                        paso4: null,
                        paso5: null
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
            case types.cargarHomologacionDB:
                aspiranteId = action.payload.aspiranteId
                planID = action.payload.planID
                planElegido = action.payload.planElegido
                localidad = action.payload.localidad
                paso1 = action.payload.paso1
                paso2 = action.payload.paso2
                paso3 = action.payload.paso3
                paso4 = action.payload.paso4
                paso5 = action.payload.paso5

                return {
                    ...state,
                    procedimientos: {
                        homologacion: {
                            aspiranteId,
                            planID,
                            planElegido,
                            localidad,
                            paso1,
                            paso2,
                            paso3,
                            paso4,
                            paso5
                        }
                    }
                }                    
        default: 
            return state;
    }
}