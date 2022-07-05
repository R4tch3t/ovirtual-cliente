import React, { createContext, FC, useCallback, useState } from "react";
import { useChatContext } from "../../context/chat/ChatContext";
import { TypeAuthState, TypeContext, TypeLogin, TypeVincular, TypeResentemail, TypeSignup, TypeSignupO, TypeMatriculaPorDefecto, TypeActivarMatricula, TypeEliminarExpediente, TypeGetAvatar } from "../../interfaces";
import {types} from "../../types/types"; 
import Cookies from 'js-cookie';
import { useSession, signOut } from "next-auth/react";
import { useEffect } from 'react';
import { loginApollo } from './login'
import { signOauthApollo } from './signOauth'
import { vincularMatriculaApollo } from './vincularMatricula'
import client, { loginGraphQL, newOuserGraphQL, newUserGraphQL, renovarTokenGraphQL } from "../../apollo-cliente";
import { necesarioCambiarPassGQL, vincularMatriculaGQL, actualizarUsuarioGQL, matriculaPorDefectoGQL, activarMatriculaGQL } from "../../apollo-cliente/perfil";
import { reenviaremailGraphQL } from "../../apollo-cliente/login/reenviaremail";
import { CuentaRegresiva, globalIsOpenRecount, globalRecount } from "../../helpers/cuentaRegresiva";
import { matriculaPorDefectoApollo } from "./matriculaPorDefecto";
import { activarMatriculaApollo } from "./activarMatricula";
import { getAvatarApollo } from "./getAvatar";

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

    useEffect(()=>{
        if(auth?.usuario?.id!>0&&!auth?.usuario?.avatar!){
            getAvatar(auth?.usuario?.id!)
        }
    },[auth?.usuario?.id!,auth?.usuario?.avatar!])

    const loading = () => {
        setAuth({
            checking: true,
            logged: false,
            activated: true,
        });
    }

    const activarMatricula:TypeActivarMatricula = async (token:string) => {
        const data = await activarMatriculaGQL({token});
        const [resp, auth] = activarMatriculaApollo(data)
        
        if(resp.respLogin){
            
            setAuth(auth);
            
        }
        return resp.respLogin
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
            if(Cookies.get("expiresIn")==='1y'){
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

    const matriculaPorDefecto:TypeMatriculaPorDefecto = async (usuario:any) => {
        const u = {
            id: usuario.id!,
            matricula: usuario?.matricula!
        }
    
        const data = await matriculaPorDefectoGQL(u)
        const [resp,auth] = matriculaPorDefectoApollo(data)
        if(resp.respMatriculaPorDefecto){
            
            setAuth(auth)
            return resp.respMatriculaPorDefecto
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
            if(Cookies.get("expiresIn")==='1y'){
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
        if(Cookies.get('expiresIn')==='3m'){
            Cookies.remove('expiresIn')
        }
        localStorage.removeItem('fotoPerfil')
        await client.cache.reset()
        
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
    
    const eliminarExpedienteAuth:TypeEliminarExpediente = (id) => {
        
            const {usuario} = auth! 
            const filterExp = usuario?.expediente?.filter((e)=>{return e.id!==id})
            setAuth({...auth,
                usuario:{
                    ...usuario!,
                    expediente:filterExp!
                }
            });
            
        
        return true
    }

    const getAvatar:TypeGetAvatar = async(idUser) => {
        
        const {usuario} = auth! 
        getAvatarApollo(idUser)!.then((avatar)=>{
            setAuth({...auth,
                usuario:{
                    ...usuario!,
                    avatar
                }
            });
        })
    
        return true
    }

    return (
            <AuthContext.Provider  value={{
                auth,
                activarMatricula,
                login,
                signup,
                signOauth,
                verificaToken,
                vincularMatricula,
                matriculaPorDefecto,
                updateUser,
                logout,
                resentemail,
                loading,
                actualizadoContra,
                eliminarExpedienteAuth,
                getAvatar
            }} >

                    <div className="h-full" onMouseMove={()=>{
                    
                        if(!globalIsOpenRecount&&Cookies.get("expiresIn")==='3m'){                            
                            globalRecount()
                        }
                    
                    }} >
                        <CuentaRegresiva />
                        { children }
                    </div>
                    
            </AuthContext.Provider>
    )
}