import {fetchSinToken } from "../../helpers/fetch";
import { TypeAuthState } from "../../interfaces";
import Cookies from 'js-cookie'; 

const login = async (email:string, password:string):Promise<[{ok:boolean},TypeAuthState]> => {
        
        const resp = await fetchSinToken("login",{email,password},"POST");
        const json:TypeAuthState = {}
        
        if(resp.ok){
            localStorage.setItem("token",resp.token);
            Cookies.set("token",resp.token);
            const {usuario} = resp
            json.checking=false
            json.logged=true
            json.activated = usuario.activated;
            json.email=usuario.email;
            json.usuario=usuario
        }
        
        return [{ok: resp.ok},json]
    
}

export const loginApollo = (resp:any):[{respLogin:boolean},TypeAuthState] => {
          
    const json:TypeAuthState = {}
    if(resp.respLogin){
        localStorage.setItem("token",resp.token);
        Cookies.set("token",resp.token);
        const {usuario} = resp
        json.checking=false
        json.logged=true
        json.activated = usuario.activated;
        json.email=usuario.email;
        json.usuario=usuario
    }
    return [{respLogin: resp.respLogin},json]

}

export default login