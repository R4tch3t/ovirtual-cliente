import { FC } from 'react';
import Head from 'next/head';
import {Home} from '../../subPages/Home';
import TramiteLayout from '../../components/layouts/Tramite'
import { TypeTramite } from '../../interfaces';
import { TramiteHead } from './head';

interface Props {
    tramite: TypeTramite;
    linkChildren?: string;
  }
  
const PaginaTramite: FC<Props> = ({children, tramite, linkChildren}) => {
    return (
        <>
            <Head>
            <title>Ovirtual - Tramite</title>
            </Head>
            <Home link='Tramites' >
            <TramiteLayout > 
                <TramiteHead 
                    tramiteId={tramite.id}
                    nombre={tramite.nombre} 
                    descripcion={tramite.descripcion}
                    nivel={tramite.nivelEstudio}
                    linkChildren={linkChildren!}
                />
                {children}
            </TramiteLayout>
            </Home>
        </>
    )
}

export {PaginaTramite}