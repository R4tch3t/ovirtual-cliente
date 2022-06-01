import { TipoUsuario } from "../apollo-cliente";

export type TypeLogin = (email:string,password:string) => Promise<boolean>;
export type TypeSignup = (user:TypeUser) => Promise<boolean|string>;
export type TypeSignupO = (user:TypeUserO) => Promise<boolean|string>;
export type TypeVerificaToken = () => Promise<boolean>;
export type TypeVincular = (user:TypeUserO) => Promise<boolean|string>;
export type TypeUpdateUser = (user:TypeUser,endpoint:string) => Promise<boolean>;
export type TypeLogout = () => void
export type TypeResentemail = (user:TypeUser) => Promise<any>

export interface TypeUser {
    matricula: string,
    email: string, 
    password: string
}

export interface TypeUserO {
    name: string,
    matricula: string,
    email: string, 
}

export interface TypeAuthState {
    id?:number,
    uuid?:string|null,
    checking?:boolean,
    logged?:boolean,
    activated?:boolean,
    usuario?:TipoUsuario|null,
    email?:string | null,
    vincularOauth?: boolean
}

export interface TypeContext {
    auth: TypeAuthState|null,
    login: TypeLogin|null,
    signup: TypeSignup|null,
    signOauth: TypeSignupO|null,
    verificaToken: TypeVerificaToken|null,
    vincularMatricula: TypeVincular,
    updateUser: TypeUpdateUser|null,
    logout: TypeLogout | null,
    resentemail: TypeResentemail | null,
    loading: () => void,
    actualizadoContra: (id: number) => Promise<any>
}