import React, { useState } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../../helpers/fetch';
import { TypeTramitesState, TypeTramite, TypeUnidadesAcademicas, TypePais } from '../../../interfaces';
import { TramiteTabs, PaginaTramite, TableTramite } from '../../../components/tramite';
import { PasosHomologacion } from '../../../components/tramite/homologacion';
import { UnidadesAcademicas } from '../../../components/tramite/unidadAcademica';
import { useTramitesContext } from '../../../context/tramites/TramitesContext';

interface Props {
  id: number,
  tramite: TypeTramite,
  unidadesAcademicas: TypeUnidadesAcademicas[],
  paises: TypePais[]
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const {tramitesState} = useTramitesContext()
  const {homologacion} = tramitesState.procedimientos
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
              <TramiteTabs tramite={props.tramite} tabID={7} />
              {/*<TableTramite head={head} body={body} />*/}

              {!homologacion && <UnidadesAcademicas unidadesAcademicas={props.unidadesAcademicas} />}

              {homologacion && <PasosHomologacion paises={props.paises} />}

              
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
  const respTramite = await fetchSinToken(`tramites/${id}`);
  const respUnidades = await fetchSinToken(`tramites/unidadesAcademicas/6`);
  const respPaises = await fetchSinToken(`tramites/paises`,{},'POST');
  const {ok,tramite} = respTramite
  const {unidadesAcademicas} = respUnidades
  const {paises} = respPaises

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
      tramite,
      unidadesAcademicas,
      paises
    },
    revalidate: 86400
  }
}

export default TramiteHome