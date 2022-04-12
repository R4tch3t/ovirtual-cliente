import {fetchSinToken } from "../../helpers/fetch";
import { TypeAuthState } from "../../interfaces";
import Cookies from 'js-cookie'; 

const login = async (email:string, password:string):Promise<[{ok:boolean},TypeAuthState]> => {
        
        const resp = await fetchSinToken("login",{email,password},"POST");
        console.log("loginAuthProv");
        console.log(resp)
        const json:TypeAuthState = {}
        //json.resp=resp
        if(resp.ok){
            localStorage.setItem("token",resp.token);
            Cookies.set("token",resp.token);
            const {usuario} = resp
            //json.usuario={}
            //json.usuario.id=usuario.id;
            //json.usuario.uuid=usuario.uuid;
            json.checking=false
            json.logged=true
            json.activated = usuario.activated;
            json.email=usuario.email;
            json.usuario=usuario
            //})
        }
        return [{ok: resp.ok},json]
    
}

export default login