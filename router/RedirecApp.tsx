import { useEffect } from 'react';
import { useAppContext } from '../auth/authContext';

export const RedirecApp=() => {
    const {auth, verificaToken} = useAppContext();
    console.log('RedirecApp ',auth)
    useEffect(()=>{  
        if(auth?.vincularOauth!==false){
            ( typeof verificaToken === 'function' )?verificaToken():null
        }

    },[verificaToken]);
    console.log('RedirecApp ',auth)

    return auth!
}
