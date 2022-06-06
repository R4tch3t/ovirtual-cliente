import {fetchSinToken } from "../../helpers/fetch";
import { TypeAuthState } from "../../interfaces";
import Cookies from 'js-cookie'; 

const login = async (email:string, password:string):Promise<[{ok:boolean},TypeAuthState]> => {
        
        const resp = await fetchSinToken("login",{email,password},"POST");
        const json:TypeAuthState = {}
        
        if(resp.ok){
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
    console.log(resp)
    if(resp.respLogin){
        if(Cookies.get("expiresIn")==='1y'){
            Cookies.set("token",resp?.token!,{expires: 365}) 
        }else{
            Cookies.set("token",resp?.token!,{expires: 0.0023}) //0.00208333 = 3 minutos
        }
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