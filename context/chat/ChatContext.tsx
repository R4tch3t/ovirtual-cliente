import { createContext, FC, useContext, useReducer } from "react";
import { TypeChatContext, TypeChatState } from "../../interfaces";
import {chatReducer} from "./chatReducer";

const ChatContext = createContext({} as TypeChatContext);

const initialState:TypeChatState = {
    id:0,uuid:null,
    chatActivo:{id: null,uuid:null},//uuid al que se le enviara msj
    usuarios: [],
    mensajes: [],
    cargando: true, 
    topeMsjs: false//chat seleccionaado
}

const ChatProvider:FC = ({children})=>{
    const [chatState, dispatch] = useReducer(chatReducer, initialState);
    return (
        <ChatContext.Provider value={{
           chatState,
           dispatch
        }} >
            {children}
        </ChatContext.Provider>
    )
} 

export function useChatContext() {
    return useContext(ChatContext);
}

export default ChatProvider