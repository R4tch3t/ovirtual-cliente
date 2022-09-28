import { createContext, FC, useContext, useReducer } from "react";
import { TypeTramitesContext, TypeTramitesState } from "../../interfaces";
import {tramitesReducer} from "./tramitesReducer";

const TramitesContext = createContext({} as TypeTramitesContext);

const catTramites = 
[
    {id: 1, nombre: 'MODALIDADES DE TITULACIÓN'},
    {id: 2, nombre: 'NIVEL SUPERIOR'},
    {id: 3, nombre: 'NIVEL MEDIO SUPERIOR'},
    {id: 4, nombre: 'OTROS TRÁMITES'}
]

const initialState:TypeTramitesState = {
    procesoConfirmacionCompleto: null,
    tramites: null,
    catTramites,
    catSeleccionado: catTramites[0],
    catNivelEstudio:'T[4,5,6,7]',
    documentos: null,
    procedimientos: {
        preregistro: null,
        bajaTemporal: null,
        inscripcion: null,
        equivalencia: null,
        homologacion: null,
        revalidacion: null,
        cambioDeGrupo: null,
        cambioUnidadAcademica: null

    },
    tramiteAlumnoSeleccionado: null,
    nombreTramiteSeleccionado: null
    
}

const TramitesProvider:FC = ({children})=>{
    const [tramitesState, dispatch] = useReducer(tramitesReducer, initialState);
    return (
        <TramitesContext.Provider value={{
            tramitesState,
            dispatch
        }} >
            {children}
        </TramitesContext.Provider>
    )
} 

export function useTramitesContext() {
    return useContext(TramitesContext);
}

export default TramitesProvider