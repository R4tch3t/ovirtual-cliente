import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Router from 'next/router';
import {Home} from '../../../subPages/Home';
import PerfilLayout from '../../../components/layouts/PerfilExpediente'
import { RedirecApp } from '../../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import { TypeDocumento } from '../../../interfaces';
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { obtenerCatDocumentos } from '../../../apollo-cliente/tramites/obtenerCatDocumentos';

interface Props {
  id: number,
  documentos: TypeDocumento[]
}

const PerfilHome:NextPage<Props> = (props) =>{
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

  const documentos: TypeDocumento[] = []

  auth.usuario?.expediente?.map(e=>{
    const doc = props.documentos.find((d)=>{return d.id===e.documentoId})
    documentos.push(doc!)
  })

return (
      <>
        <Head>
          <title>Ovirtual - Chat</title>
        </Head>
        <Home link='Perfil' >
          <PerfilLayout mapDocInit={documentos} />
        </Home>
      </>
);
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const documentos:TypeDocumento[] = await obtenerCatDocumentos()

  if(documentos===null){
    return {
      redirect: {
        destination: '/perfil/expediente',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      documentos
    },
    revalidate: 86400
  }
}

export default PerfilHome