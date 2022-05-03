import React, { useState } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../../helpers/fetch';
import { TypeTramitesState, TypeTramite } from '../../../interfaces';
import { TramiteTabs, PaginaTramite, TableTramite } from '../../../components/tramite';
import { obtenerTramites, tramitePorId } from '../../../apollo-cliente';

interface Props {
  id: number,
  tramite: TypeTramite
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const [state, setState]:any = useState(
    {
        //tabs: Tabs,
        table: {
            head: [ 'Nombre', 'Responsable', 'Telefono' ],
            body: [] 
            //body: [{'Nombre': props.tramite.tramitesModuloAtencions, 'Descripción': 'Descripcion1'}]
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

  //state.table.body = []
  props.tramite.tramitesModuloAtencions?.map((modulo)=>{
    
    state.table.body.push({
      'Nombre': modulo.nombre,
      'Responsable': modulo.responsable,
      'Telefono': modulo.telefono
    })
  })
// const {tabs}  = state
const {head, body}  = state.table


  return (
    <PaginaTramite tramite={props.tramite} >
      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
            <div className='relative bg-white p-6' >
              <TramiteTabs tramite={props.tramite} tabID={1} />
              <TableTramite head={head} body={body} />

            </div>
        </div>
    </PaginaTramite>
  )


}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //const { data } = await  // your fetch function here 
  //const {tramites}:TypeTramitesState = await fetchSinToken(`tramites/todos`);
  const tramites:TypeTramite[] = await obtenerTramites()
  
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
  //const resp = await fetchSinToken(`tramites/${id}`);
  //const {ok,tramite} = resp
  const tramite:TypeTramite = await tramitePorId(parseInt(id))
  if(!tramite){
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