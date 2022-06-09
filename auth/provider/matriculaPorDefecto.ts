import { fetchConToken } from "../../helpers/fetch";
import { TypeAuthState, TypeUserO } from "../../interfaces/TypesContext";

type resp = {
    respMatriculaPorDefecto: boolean,
    msg: string
}


export const matriculaPorDefectoApollo = (resp:any):[resp,TypeAuthState] => {
    const json:TypeAuthState = {}
    if(resp.respMatriculaPorDefecto){
        
        const {usuario} = resp
        json.id=usuario.id
        json.uuid=usuario.uuid
        json.checking=false
        json.logged=true
        json.activated=true
        json.email=usuario.email
        json.usuario=usuario
        

    }

    return [resp, json]

}
