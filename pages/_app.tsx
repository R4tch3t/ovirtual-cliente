import '../styles/globals.css'
import type { AppProps } from 'next/app'
import  AuthProvider  from '../auth/authContext'
import SocketProvider  from '../context/SocketContext';
import ChatProvider  from '../context/chat/ChatContext';
import TramitesProvider  from '../context/tramites/TramitesContext';
import moment from "moment"
import 'moment/locale/es-mx'
import { NextUIProvider } from '@nextui-org/react';
import { graytheme } from '../themes';
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-cliente";
import NotiProvider from '../context/notificaciones/NotiContext';
moment.locale('es-mx');


function MyApp({ Component, pageProps }: AppProps) {

  return(  
    <ApolloProvider client={client}>
      <SessionProvider>
        <NotiProvider>
          <ChatProvider>
            <AuthProvider> 
              <TramitesProvider>
                <SocketProvider>
                  <NextUIProvider theme={graytheme} >
                    <Component {...pageProps} />
                  </NextUIProvider>
                </SocketProvider>
              </TramitesProvider>
            </AuthProvider>
          </ChatProvider>
        </NotiProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp
