import React from 'react';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import PerfilLayout from '../../components/layouts/Perfil'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
const PerfilHome = () =>{
  const auth = RedirecApp();

  if(auth.checking){
    return( 
      <div className='loadingDiv' > 
        <Loading> Cargando... </Loading>
      </div>
    )
  }

  if(!auth.logged){
    Router.replace("/");
  }

return (
      <>
        <Head>
          <title>Ovirtual - Perfil</title>
        </Head>
        <Home link='Perfil' >
          <PerfilLayout />
        </Home>
      </>
);
}

export default PerfilHome