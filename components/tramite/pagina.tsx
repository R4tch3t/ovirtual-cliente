import { FC } from 'react';
import Head from 'next/head';
import {Home} from '../../subPages/Home';
import TramiteLayout from '../../components/layouts/Tramite'
import { TypeTramite } from '../../interfaces';
import { TramiteHead } from './head';

interface Props {
    //id: number,
    tramite: TypeTramite
  }
  
const PaginaTramite: FC<Props> = ({children, tramite}) => {
    return (
        <>
            <Head>
            <title>Ovirtual - Tramite</title>
            </Head>
            <Home link='Tramites' >
            <TramiteLayout > 
                <TramiteHead 
                    nombre={tramite.nombre} 
                    descripcion={tramite.descripcion}
                    nivel={tramite.nivelAplica+""}
                />
                {children}
                {/*<TramiteTabs tramite={tramite} Tabs={Tabs} />*/}
            </TramiteLayout>
            </Home>
        </>
    )
}

export {PaginaTramite}