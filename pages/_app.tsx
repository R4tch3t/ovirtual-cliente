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

moment.locale('es-mx');

/*type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}*/

function MyApp({ Component, pageProps }: AppProps) {
  //const getLayout = Component.getLayout ?? ((page) => page)

  return(  
    <SessionProvider>
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
    </SessionProvider>
  );
}

export default MyApp
