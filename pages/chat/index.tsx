import React from 'react';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import ChatLayout from '../../components/layouts/Chat'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';

const ChatHome = () =>{
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
          <title>Ovirtual - Chat</title>
        </Head>
        <Home link='Chat' >
          <ChatLayout />
        </Home>
      </>
);
}

export default ChatHome