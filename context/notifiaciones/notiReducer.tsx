import { TypeNotiAction, TypeNotiState } from "../../interfaces";
import {types} from "../../types/notificaciones";

export const notiReducer = (state:TypeNotiState,action:TypeNotiAction):TypeNotiState => {
    
        switch(action.type){
            case types.notiMsjCargados:
               
                            
            default: 
                return state;
        }
}
