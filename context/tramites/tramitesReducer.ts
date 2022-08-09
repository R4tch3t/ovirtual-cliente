import { TypeTramitesAction, TypeTramitesState } from "../../interfaces";
import {types} from "../../types/tramites";

export const tramitesReducer = (state:TypeTramitesState,action:TypeTramitesAction):TypeTramitesState => {
    let usuarioId = null
    let procedure = null
    let plesXur = null
    let aspiranteId = null
    let planID = null
    let unidadAcademica = null
    let planElegido = null
    let nivelIngresar = null
    let tramiteId = null
    let localidad = null
    let periodoLectivo = null
    let causaBaja = null
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
                catNivelEstudio: action.payload.catNivelEstudio
            }
        case types.catSeleccionado:
            return {
                ...state,
                catSeleccionado: action.payload
            }
        case types.seleccionarPlan:

            planID = action.payload.planID
            planElegido = action.payload.planElegido
            nivelIngresar = action.payload.nivelIngresar
            tramiteId = action.payload.tramiteId
            localidad = action.payload.localidad
            
            return {
                ...state,
                procedimientos: {
                    ...state.procedimientos,
                    preregistro: {
                        aspiranteId: null,
                        planID,
                        planElegido,
                        nivelIngresar,
                        tramiteId,
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
                const prereg:any = state.procedimientos.preregistro!
                const paso = prereg[nombrePaso]
                return {
                    ...state,
                    procedimientos: {
                        ...state.procedimientos,
                        preregistro: {
                            ...state.procedimientos.preregistro!,
                            [nombrePaso]: {
                                ...paso,
                                [nombreCampo]: valorCampo
                            }
                        }
                    }
                }
            case types.cargarPreregistroDB:
                aspiranteId = action.payload.aspiranteId
                planID = action.payload.planID
                planElegido = action.payload.planElegido
                nivelIngresar = action.payload.nivelIngresar
                tramiteId = action.payload.tramiteId
                localidad = action.payload.localidad
                paso1 = action.payload.paso1
                paso2 = action.payload.paso2
                paso3 = action.payload.paso3
                paso4 = action.payload.paso4
                paso5 = action.payload.paso5

                return {
                    ...state,
                    procedimientos: {
                        ...state.procedimientos,
                        preregistro: {
                            aspiranteId,
                            planID,
                            planElegido,
                            nivelIngresar,
                            tramiteId,
                            localidad,
                            paso1,
                            paso2,
                            paso3,
                            paso4,
                            paso5
                        }
                    }
                }
            case types.seleccionarPlanProcedure:
                /// hacerla universal para cualquier tramite
                usuarioId = action.payload.usuarioId
                plesXur = action.payload.plesXur
                planElegido = action.payload.planElegido
                unidadAcademica = action.payload.unidadAcademica
                procedure = action.payload.procedure
                
                return {
                    ...state,
                    procedimientos: {
                        ...state.procedimientos,
                        [procedure]: {
                            usuarioId,
                            plesXur,
                            planElegido,
                            unidadAcademica,
                            periodoLectivo,
                            causaBaja,
                            validoParaTramitar: false
                        }
                    },
                    nombreTramiteSeleccionado: procedure

                }    
            case types.cambiarEstado:
                let {nombreTramite, nombreValor, valor} = action.payload
                const tramites:any = state.procedimientos 
                const tramite = tramites[nombreTramite]

                return {
                    ...state,
                    procedimientos: {
                        ...state.procedimientos,
                        [nombreTramite]: {
                            ...tramite,
                            [nombreValor]: valor
                        }
                    }
                }
            case types.seleccionarTramiteAlumno:
                tramiteId = action.payload.tramiteId

                return {
                    ...state,
                    tramiteAlumnoSeleccionado: tramiteId
                }
            case types.ponerTramiteEnNulo:
                
                return {
                    ...state,
                    procedimientos: {
                        ...state.procedimientos,
                        [state.nombreTramiteSeleccionado!]: null
                    }
                }
            case types.confirmacionCompleta:
                if(action?.payload?.bandera!){
                    return {
                        ...state,
                        procesoConfirmacionCompleto: {
                            ...state.procesoConfirmacionCompleto,
                            bandera: true
                        }                    
                    }
                }else if(action?.payload?.urlPDF!){
                    const {urlPDF} = action.payload
                    return {
                        ...state,
                        procesoConfirmacionCompleto: {
                            ...state.procesoConfirmacionCompleto,
                            urlPDF
                        }                    
                    }
                }
        default: 
            return state;
    }
}
