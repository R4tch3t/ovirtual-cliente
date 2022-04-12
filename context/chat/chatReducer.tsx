import { TypeChatAction, TypeChatState } from "../../interfaces";
import {types} from "../../types/types";

export const chatReducer = (state:TypeChatState,action:TypeChatAction):TypeChatState => {
    
    //try{
        switch(action.type){
            case types.cerrarSesion:
                return {
                    id:0,uuid:null,
                    chatActivo:{id: null,uuid:null},//uuid al que se le enviara msj
                    usuarios: [],
                    mensajes: [],
                    cargando: true,
                    topeMsjs: false
                }
            case types.usuariosCargados:
                return {
                    ...state,
                    usuarios: action.payload
                }
            case types.activarChat:
                if(state.chatActivo.id===action.payload.id){
                    return state
                }
                return {
                    ...state,
                    chatActivo: action.payload,
                    mensajes:[],
                    cargando: true
                }
            case types.nuevoMensaje:
                
                //column normal
                //const ultimoMsg = state.mensajes[state.mensajes.length-1]

                //column reverse
                const ultimoMsg = state.mensajes[0]
                
                if((state.chatActivo.id===action.payload.de||
                state.chatActivo.id===action.payload.para)&&(!ultimoMsg||ultimoMsg.id!==action.payload.id)){

                    return {
                        ...state,
                        mensajes: [action.payload,...state.mensajes]
                    }
                }else{
                    return state;
                }
            case types.cargarMensajes:
                return {
                    ...state,
                    mensajes: action.payload,
                    cargando: false,
                    topeMsjs: false
                }
            case types.paginarMensajes:
                const ultimoResp = action.payload[action.payload.length-1]  
                const ultimo = state.mensajes[state.mensajes.length-1]  
                if(ultimoResp&&ultimoResp.id!==ultimo.id){
                    return {
                        ...state,
                        mensajes: [...state.mensajes,...action.payload],
                        cargando: false
                    }
                }else{
                    return {...state,topeMsjs:true}
                }
            
            /*case types.animacion:
                return {
                    ...state,
                    animacion: action.payload
                }*/                
            default: 
                return state;
        }
    /*}catch(e){
        console.log(e)
    }*/
}
