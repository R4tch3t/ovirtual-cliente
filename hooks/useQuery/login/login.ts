
import { useQuery, gql } from "@apollo/client";

interface Query {
    login: {
        ok: boolean,
        msg: string|null,
        usuario:TipoUsuario|null,
        token: string|null
    }
}

export type TipoUsuario = {
    id: number;
    uuid: string | null;
    matricula: string | null;
    nombre: string | null;    
    online: number | null;
    activated: number | null;
    matactiva: number | null;
    lastConn: Date | null;
}

const QUERY = gql`
    query Login($password: String!, $email: String!) {
        login(password: $password, email: $email) {
            ok
            msg
            usuario {
                id
                uuid
                matricula
                nombre
                email                
                online
                activated
                matactiva
                lastConn
            }
            token
        }
    }
`;

const useLogin = (password:string|null,email:string|null) => {

    return useQuery<Query>(QUERY);
}

export {useLogin}