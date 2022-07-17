import { createContext, FC, useContext, useReducer, useEffect } from "react";
import { TypeNotiContext, TypeNotiState } from "../../interfaces";
import {notiReducer} from "./notiReducer";

const NotiContext = createContext({} as TypeNotiContext);

const initialState:TypeNotiState = {
    msjs: []
}

const NotiProvider:FC = ({children})=>{
    const [notiState, dispatch] = useReducer(notiReducer, initialState);
    useEffect(()=>{
        
    },[])
    return (
        <NotiContext.Provider value={{
           notiState,
           dispatch
        }} >
            {children}
        </NotiContext.Provider>
    )
} 

export function useNotiContext() {
    return useContext(NotiContext);
}

export default NotiProvider