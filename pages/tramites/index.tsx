import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import TramitesLayout from '../../components/layouts/Tramites'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import { useTramitesContext } from '../../context/tramites/TramitesContext';
import { TypeTramitesState } from '../../interfaces/TypesTramitesContext';
import filtroTramites from '../../helpers/filtroTramites';
import { obtenerTramites } from '../../apollo-cliente/tramites/obtenerTramites';

const TramitesHome:NextPage<TypeTramitesState> = (props) =>{
  const auth = RedirecApp();
  const {tramitesState} = useTramitesContext();
  const {tramites, tta,ttb} = tramitesState
  let fTramites = filtroTramites(props.tramites!,tta,ttb)
  
  if(!tramites || tramites === props.tramites){
    tramitesState.tramites=fTramites
  }
    
  if(auth.checking){
    return( 
      <div className='loadingDiv' > 
        <Loading> Cargando... </Loading>
      </div>
    )
  }

  if(!auth.logged||(auth.usuario&&auth.usuario.matactiva === 0)){
    Router.replace("/");
  }
  
return (
      <>
        <Head>
          <title>Ovirtual - Tramites</title>
        </Head>
        <Home link='Tramites' >
          <TramitesLayout />
        </Home>
      </>
);
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {  
  const tramites = await obtenerTramites()
  return {
    props: {
      tramites
    },
    revalidate:   10
  }
}

export default TramitesHome