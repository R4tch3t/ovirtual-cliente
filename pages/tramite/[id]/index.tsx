import React, { useState } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { TypeTramite } from '../../../interfaces';
import { TramiteTabs, PaginaTramite, TableTramite } from '../../../components/tramite';
import { obtenerTramites, tramitePorId } from '../../../apollo-cliente';
import { obtenerRequisitosGQL, TipoRequisitos } from '../../../apollo-cliente/tramites/obtenerRequisitos';


interface Props {
  id: number,
  tramite: TypeTramite,
  requisitos: TipoRequisitos[]
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const table:any = {
            head: ['Documento', 'Descripción', 'Copias', 'Requiere Original' ],            
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

  //props.requisitos=props.requisitos.sort((a,b)=>{return a.id-b.id})

  props.requisitos.map((r)=>{
    table?.body?.push({
      'Documento': r.documento.nombre,
      'Descripción': r.descripcion,
      'Copias': r.numeroCopias,
      'Requiere Original': r.requiereOriginal?'Si':'No',
    })
  });



  const {head, body}  = table


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
  const tramiteId = parseInt(id);
  const tramite:TypeTramite = await tramitePorId(tramiteId)
  const requisitos = await obtenerRequisitosGQL(tramiteId)
  
  if(tramite===null){
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
      requisitos
    },
    revalidate: 86400
  }
}

export default TramiteHome