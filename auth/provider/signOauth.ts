import Cookies from "js-cookie";
import { fetchSinToken } from "../../helpers/fetch";
import { TypeAuthState } from "../../interfaces/TypesContext";

type user = {
    name:string,
    email:string
}

type resp = {
    respNewOuser:boolean,
    msg:string
}


const signOauth = async (user:user):Promise<[resp,TypeAuthState]>  => {
    const {name, email} = user
    const resp = await fetchSinToken("login/newO",{name,email},"POST");
    const json:TypeAuthState={}
    if(resp.ok){
        localStorage.setItem("token",resp.token);
        Cookies.set("token",resp.token);
        const {usuario} = resp
        json.id=usuario.id
        json.uuid=usuario.uuid
        json.checking=false
        json.logged=true
        json.activated=usuario.activated
        json.email=usuario.email
        json.usuario=usuario
        
    }
    return [resp,json];
}

export const signOauthApollo = (resp:any):[resp,TypeAuthState]  => {
    const json:TypeAuthState={}
    //if(resp.respNewOuser){
        localStorage.setItem("token",resp.token);
        Cookies.set("token",resp.token);
        const {usuario} = resp
        json.id=usuario.id
        json.uuid=usuario.uuid
        json.checking=false
        json.logged=true
        json.activated=usuario.activated
        json.email=usuario.email
        json.usuario=usuario
        console.log('apolloSingO: ',resp)
    //}
    // = resp.respNewOuser 
    
    if(resp.respNewOuser===false){
        json.vincularOauth=false
        resp.respNewOuser = true
        json.usuario?.matricula!=''
    }
    
    return [resp,json];
}

export default signOauth