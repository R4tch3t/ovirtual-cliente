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
    tramites: null,
    catTramites,
    catSeleccionado: catTramites[0],
    tta: 0,
    ttb: 4
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