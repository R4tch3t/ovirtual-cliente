import React, { useState } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../../helpers/fetch';
import { TypeTramitesState, TypeTramite } from '../../../interfaces';
import { TramiteTabs, PaginaTramite, TableTramite } from '../../../components/tramite';

interface Props {
  id: number,
  tramite: TypeTramite
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const [state, setState] = useState(
    {
        table: {
            head: ['Modulo de atención', 'Descripción' ],
            body: [{'Modulo de atención': props.tramite.documentoObtiene, 'Descripción': 'Descripcion1'}]
        } 
    }
  );
  
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


const {head, body}  = state.table


  return (
    <PaginaTramite tramite={props.tramite} >
      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
            <div className='relative bg-white p-6' >
              <TramiteTabs tramite={props.tramite} tabID={0} />
              <TableTramite head={head} body={body} />

            </div>
        </div>
    </PaginaTramite>
  )

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