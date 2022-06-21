import React, { useState } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { TypeTramite } from '../../../interfaces';
import { TramiteTabs, PaginaTramite, TableTramite } from '../../../components/tramite';
import { obtenerFormatoDescargablesGQL, obtenerTramites, tramitePorId, TypeFormatoDescargable } from '../../../apollo-cliente';

interface Props {
  id: number,
  tramite: TypeTramite,
  formatoDescargable: TypeFormatoDescargable[]
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();

  const table:any = {
    head: [ 'Nombre', 'Descripción' ],
    body: []
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

  props.formatoDescargable?.map((formato)=>{
    
    table?.body?.push({
      'Nombre': formato.nombre,
      'Responsable': formato.descripcion
    })

  })

  const {head, body}  = table

  return (
    <PaginaTramite tramite={props.tramite} >
      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
            <div className='relative bg-white p-6' >
              <TramiteTabs tramite={props.tramite} tabID={2} />
              <TableTramite head={head} body={body} />

            </div>
        </div>
    </PaginaTramite>
  )


}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const tramites:TypeTramite[] = await obtenerTramites()
  
  return {
    paths: tramites!.map(({id})=>({
      params: { id:id+"" }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {id} = params as {id: string} 
  const tramiteId = parseInt(id)
  const tramite:TypeTramite = await tramitePorId(tramiteId)
  const formatoDescargable = await obtenerFormatoDescargablesGQL(tramiteId)

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
      tramite,
      formatoDescargable
    },
    revalidate: 86400
  }
}

export default TramiteHome