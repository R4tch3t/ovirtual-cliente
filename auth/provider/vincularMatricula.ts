import { fetchConToken } from "../../helpers/fetch";
import { TypeAuthState, TypeUserO } from "../../interfaces/TypesContext";

type resp = {
    ok: boolean,
    msg: string
}
const vincularMatricula = async (usuario:TypeUserO):Promise<[resp,TypeAuthState]> => {
        
    const resp = await fetchConToken("login/vincularMatricula",{usuario},"POST");
    const json:TypeAuthState = {}
    if(resp.ok){
        
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

export default vincularMatricula