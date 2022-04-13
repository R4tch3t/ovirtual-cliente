import React, { useEffect } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import TramiteLayout from '../../components/layouts/Tramite'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../helpers/fetch';
import { TypeTramitesState } from '../../interfaces';

interface Props {
  id: number,
  tramite: string
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
            Tramite seleccionado? {props.id} {props.tramite}
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
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  //const resp = await fetchSinToken(`tramites/todos`);
  const {id} = params as {id: string} 
  
  return {
    props: {
      id,
      tramite: 'tramite 1'
    },
    revalidate: 86400
  }
}

export default TramiteHome