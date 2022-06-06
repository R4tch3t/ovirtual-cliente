import React, { createContext, FC, useCallback, useState } from "react";
import { useChatContext } from "../../context/chat/ChatContext";
import { TypeAuthState, TypeContext, TypeLogin, TypeVincular, TypeResentemail, TypeSignup, TypeSignupO } from "../../interfaces";
import {types} from "../../types/types"; 
import Cookies from 'js-cookie';
import { useSession, signOut } from "next-auth/react";
import { useEffect } from 'react';
import { loginApollo } from './login'
import { signOauthApollo } from './signOauth'
import { vincularMatriculaApollo } from './vincularMatricula'
import client, { loginGraphQL, newOuserGraphQL, newUserGraphQL, renovarTokenGraphQL } from "../../apollo-cliente";
import { necesarioCambiarPassGQL, vincularMatriculaGQL, actualizarUsuarioGQL } from "../../apollo-cliente/perfil";
import { reenviaremailGraphQL } from "../../apollo-cliente/login/reenviaremail";
import { CuentaRegresiva, globalIsOpenRecount, globalRecount } from "../../helpers/cuentaRegresiva";

export const AuthContext = createContext({} as TypeContext);

const initialState: TypeAuthState = {
    id: 0,
    uuid: null,
    checking: true,
    logged: false,
    activated: true,
    usuario: null,
    email: null,
}

export const AuthProvider: FC = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const {dispatch} = useChatContext();
    const {data, status} = useSession();

    useEffect(()=>{
        if(status==="authenticated"){
            const {tipoCuenta}:any = data?.user
            switch(tipoCuenta){
                case 'oauth':                    
                    signOauth(data?.user as any)
                    break;
                default:                    
                    const {matricula,password}:any = data?.user
                    login(matricula, password);
                break; 
            }
            
        }
    },[status, data]);

    const loading = () => {
        setAuth({
            checking: true,
            logged: false,
            activated: true,
        });
    }

    
    const login:TypeLogin = async (email:string, password:string) => {
        const data = await loginGraphQL(email,password);
        const [resp, auth] = loginApollo(data)
        
        if(resp.respLogin){
            
            setAuth(auth);
            
        }
        return resp.respLogin
    }

    const signup:TypeSignup = async (user):Promise<boolean> => {        
        const nuevoUsuario = {
            matricula: user?.matricula!,
            email: user?.email!
        }
        const resp = await newUserGraphQL(nuevoUsuario)
        if(resp?.respNewUser){
            return resp?.respNewUser;
        }
        return resp?.msg as any;
    }

    const signOauth:TypeSignupO = async (user) => {
        const nU = {
            name: user.name!,
            email: user.email!
        }

        const data = await newOuserGraphQL(nU);
        const [resp, auth] = signOauthApollo(data);
        
        if(resp.respNewOuser){
            setAuth(auth);
            return resp.respNewOuser
        }
        return resp.msg
    }

    const resentemail:TypeResentemail = async (user) => {
        const {email, matricula} = user!
        const resp = await reenviaremailGraphQL({email, matricula})
        
        if(resp.respReenviaremail){
            return resp.respReenviaremail;
        }

        return resp.msg;
    }

    

    const verificaToken = useCallback( async()=>{
        const token = Cookies.get("token") || Cookies.get('next-auth.session-token')
        
        if(!token){            
            setAuth({
                checking: false,  
                logged: false,
                activated: true,
                
            });
            return false;
        }

        const resp = await renovarTokenGraphQL(Cookies.get("token")!)
        
        if(resp.respRenovarToken){
            if(localStorage.getItem("expiresIn")==='1y'){
                Cookies.set("token",resp?.token!,{expires: 365}) 
            }else{
                Cookies.set("token",resp?.token!,{expires: 0.0023}) //0.00208333 = 3 minutos
            }
            
            const {usuario}:any = resp
            setAuth({
                id: usuario?.id,
                uuid: usuario?.uuid,
                checking: false,
                logged: true,
                usuario,
                email: usuario?.email,
                activated: usuario?.activated,
            });
            return true;
        }else{
            setAuth({
                id: 0,
                uuid: null,
                checking: false,
                logged: true,
                activated: true,
            });
            return false
        }

    }, [setAuth]);

    const vincularMatricula:TypeVincular = async (usuario:any) => {
        const u = {
            id: usuario.id!,
            name: usuario.name!,
            email: usuario.email!,
            matricula: usuario?.matricula!
        }
    
        const data = await vincularMatriculaGQL(u)
        const [resp,auth] = vincularMatriculaApollo(data)
        if(resp.respVincularMatricula){
            setAuth(auth)
            return resp.respVincularMatricula
        }
        return resp.msg
        
    }

    const updateUser = useCallback( async(user,endpoint)=>{
        const token = Cookies.get("token")
        if(!token){
            setAuth({
                checking: false,
                logged: false,
            });
            return false;
        }
        
        const ActualizarU = {
            id: user.id!,
            uuid: user.uuid!,
            nombre: user.nombreUsuario!,
            name: user.name!,
            apellidos: user.apellidos!,
            email: user.email!,
            newEmail: user.newEmail!,
            password: user.password!
        }
        
        const resp = await actualizarUsuarioGQL(ActualizarU!)
        if(resp?.respActualizarUsuario){
            if(localStorage.getItem("expiresIn")==='1y'){
                Cookies.set("token",resp?.token!,{expires: 365}) 
            }else{
                Cookies.set("token",resp?.token!,{expires: 0.0023}) //0.00208333 = 3 minutos
            }
            const {usuario}:any = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                usuario,
                email: usuario.email,
                activated: usuario.activated,
            });
            //Cierre de OAUTH
            signOut({redirect: false})
            return true;
        }else{
            return false
        }

    }, [setAuth]);
    

    const logout = async () => {
        Cookies.remove('token')
        
        await client.clearStore()
        dispatch({type: types.cerrarSesion});

        setAuth({
            checking: false,
            logged: false,
            activated: true,
        });

        await signOut({redirect: false});
    }
    
    const actualizadoContra = async (id: number ) => {
        const resp = await necesarioCambiarPassGQL(id)
        return resp
    }
    
    return (
            <AuthContext.Provider  value={{
                auth,
                login,
                signup,
                signOauth,
                verificaToken,
                vincularMatricula,
                updateUser,
                logout,
                resentemail,
                loading,
                actualizadoContra
            }} >

                    <div className="h-full" onMouseMove={()=>{
                    
                        if(!globalIsOpenRecount&&localStorage.getItem("expiresIn")==='3m'){
                            const token = Cookies.get("token")
                            if(token){
                                
                                Cookies.set("token",token!,{expires: 0.0023}) //0.00208333 = 3 minutos
                            }
                            globalRecount()
                        }
                    
                    }} >
                        <CuentaRegresiva />
                        { children }
                    </div>
                    
            </AuthContext.Provider>
    )
}