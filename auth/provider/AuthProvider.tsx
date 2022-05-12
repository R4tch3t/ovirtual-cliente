import React, { createContext, FC, useCallback, useContext, useState } from "react";
import { useChatContext } from "../../context/chat/ChatContext";
import {fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { TypeAuthState, TypeContext, TypeLogin, TypeVincular, TypeResentemail, TypeSignup, TypeSignupO } from "../../interfaces";
import {types} from "../../types/types"; 
import Cookies from 'js-cookie';
import { useSession, signOut } from "next-auth/react";
import { useEffect } from 'react';
import loginRes, { loginApollo } from './login'
import signOauthRes from './signOauth'
import vincularMatriculaRes from './vincularMatricula'
import { useLogin } from "../../hooks";
import { loginGraphQL } from "../../apollo-cliente";
export const AuthContext = createContext({} as TypeContext);

const initialState: TypeAuthState = {
    id: 0,
    uuid: null,
    checking: true,
    logged: false,
    activated: true,
    usuario: null,
    email: null
}

export const AuthProvider: FC = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const {dispatch} = useChatContext();
    const {data, status} = useSession();
    //const LogginHook = useLogin(null,null)
    
    useEffect(()=>{
        if(status==="authenticated"){
            console.log({data: data});
            console.log({user: data?.user});
            console.log({user: data?.account});
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
        //const LogginHook = useLogin(null,null)
        //const {data} = useLogin(null,null)
        //const {data} = await LogginHook.refetch({email,password});
        const data = await loginGraphQL(email,password);
        //const [resp, auth] = await loginRes(email,password)
        const [resp, auth] = loginApollo(data)
        
        if(resp.ok){
            setAuth(auth);
        }
        return resp.ok
    }

    const signup:TypeSignup = async (user):Promise<boolean> => {
        const {matricula, email, password} = user
        const resp = await fetchSinToken("login/new",{matricula,email,password},"POST");
        console.log("registerProv");
        console.log(resp);
        if(resp.ok){
            return resp.ok;
        }
        return resp.msg;
    }

    const signOauth:TypeSignupO = async (user) => {
        const [resp,auth] = await signOauthRes(user)
        console.log('auth')
        console.log(auth)
        if(resp.ok){
            setAuth(auth);
            return resp.ok 
        }
        return resp.msg
    }

    const resentemail:TypeResentemail = async (user) => {
        const {email} = user
        const resp = await fetchSinToken("login/resentemail",{email},"POST");
        console.log("registerProv");
        console.log(resp);
        if(resp.ok){
            return resp.ok;
        }
        return resp.msg;
    }

    

    const verificaToken = useCallback( async()=>{
        const token = localStorage.getItem("token") || Cookies.get('next-auth.session-token')
        console.log(token,"verificaToken??",Cookies.get('token'))
        if(!token){
            setAuth({
                checking: false,  
                logged: false,
                activated: true,
            });
            return false;
        }

        const resp = await fetchConToken("login/renew")

        if(resp.ok){
            localStorage.setItem("token",resp.token);
            const {usuario} = resp
            setAuth({
                id: usuario.id,
                uuid: usuario.uuid,
                checking: false,
                logged: true,
                usuario,
                email: usuario.email,
                activated: usuario.activated,
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

    }, [setAuth,fetchConToken]);

    const vincularMatricula:TypeVincular = async (usuario) => {
        const [resp,auth] = await vincularMatriculaRes(usuario)
        if(resp.ok){
            setAuth(auth)
            return resp.ok
        }
        return resp.msg
        
    }

    const updateUser = useCallback( async(user,endpoint)=>{
        const token = localStorage.getItem("token")
        if(!token){
            setAuth({
                checking: false,
                logged: false,
            });
            return false;
        }

        const resp = await fetchConToken(endpoint,{user},"POST")

        if(resp.ok){
            localStorage.setItem("token",resp.token);
            Cookies.set("token",resp.token);
            const {usuario} = resp
            //if(status==='authenticated'){
                
            //}
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

    }, [setAuth,fetchConToken]);
    

    const logout = () => {
        localStorage.removeItem("token");
        dispatch({type: types.cerrarSesion});

        setAuth({
            checking: false,
            logged: false,
            activated: true,
        });

        signOut({redirect: false});
    }
    
    const actualizadoContra = async (id: number ) => {
        const resp = await fetchConToken("login/actualizadoContra",{id},"POST")
        return resp
    }

    return (
            <AuthContext.Provider  value={{
                auth,
                login,
                signup,
                verificaToken,
                vincularMatricula,
                updateUser,
                logout,
                resentemail,
                loading,
                actualizadoContra
            }} >
                { children }
            </AuthContext.Provider>
    )
}