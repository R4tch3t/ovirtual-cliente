import { TypeNotiAction, TypeNotiState } from "../../interfaces";
import {typesNoti} from "../../types/notificaciones";

export const notiReducer = (state:TypeNotiState,action:TypeNotiAction):TypeNotiState => {
    
        switch(action.type){
                case typesNoti.nuevoMsj:
                        let exist = false
                        const newState:any = [] 
                        state.msjs.map((m)=>{
                                const findM = action.payload.mensajes.find((f:any) => { return f.id===m.id})
                                
                                if(findM){ 
                                        //m={...findM}
                                        exist=true
                                }else{
                                        newState.push(m)
                                }
                        })
                        
                        if(exist) {
                                return {
                                        ...state,
                                        msjs: [...action.payload.mensajes,...newState]
                                }
                        }

                        return {
                                ...state,
                                msjs: [...action.payload.mensajes,...state.msjs]//[action.payload.mensaje,...state.msjs]
                        }
                //cargando nootificaciones...
                case typesNoti.notiMsjCargados:
                        return {
                                ...state,
                                msjs: action.payload.mensajes
                        }
                            
                default: 
                        return state;
        }
}
