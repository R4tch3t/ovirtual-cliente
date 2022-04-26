import React, { useEffect } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import TramiteLayout from '../../components/layouts/Tramite'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../helpers/fetch';
import { TypeTramitesState, TypeTramite } from '../../interfaces';
import { TramiteHead, TramiteTabs } from '../../components/tramite';

interface Props {
  id: number,
  tramite: TypeTramite
}

const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();

  if(auth.checking){
    return( 
      <div className='loadingDiv' > 
        <Loading> Cargando... </Loading>
      </div>
    )
  }

  //console.log(auth)

  if(!auth.logged||(auth.usuario&&auth.usuario.matactiva === 0)){
   
    Router.replace("/");
  }

return (
      <>
        <Head>
          <title>Ovirtual - Tramite</title>
        </Head>
        <Home link='Tramites' >
          <TramiteLayout > 
            <TramiteHead 
              nombre={props.tramite.nombre} 
              descripcion={props.tramite.descripcion}
              nivel={props.tramite.nivelAplica+""} />
              <TramiteTabs />
          </TramiteLayout>
        </Home>
      </>
);
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const { data } = await  // your fetch function here 
  const {tramites}:TypeTramitesState = await fetchSinToken(`tramites/todos`);
  
  return {
    paths: tramites!.map(({id})=>({
      params: { id:id+"" }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  //const resp = await fetchSinToken(`tramites/todos`);
  const {id} = params as {id: string} 
  const resp = await fetchSinToken(`tramites/${id}`);
  const {ok,tramite} = resp
  if(!ok){
    return {
      redirect: {
        destination: '/tramites',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      id,
      tramite
    },
    revalidate: 86400
  }
}

export default TramiteHome