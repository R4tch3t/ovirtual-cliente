import { useEffect } from 'react';
import { useAppContext } from '../auth/authContext';

export const RedirecApp=() => {
    const {auth, verificaToken} = useAppContext();

    useEffect(()=>{  
        if(auth?.vincularOauth!==false){
            ( typeof verificaToken === 'function' )?verificaToken():null
        }

    },[verificaToken]);

    return auth!
}
