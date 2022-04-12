import { useEffect } from 'react';
import { useAppContext } from '../auth/authContext';

export const RedirecApp=() => {
    const {auth, verificaToken}:any = useAppContext();
    
    useEffect(()=>{
        verificaToken();
    },[verificaToken]);

    /*console.log(auth)*/

    /*if(auth.logged){
        Router.push("/");
    }*/
    //const auth = useVerificaToken()
    return auth
}

//export default ()=>null