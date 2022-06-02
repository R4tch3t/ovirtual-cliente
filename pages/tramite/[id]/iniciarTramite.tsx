import React, { useState, useEffect } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { TypeTramite, TypeUnidadesAcademicas, TypePais } from '../../../interfaces';
import { PaginaTramite, SeleccionarPlan } from '../../../components/tramite';
import { PasosHomologacion } from '../../../components/tramite/homologacion';
import { UnidadesAcademicas } from '../../../components/tramite/unidadAcademica';
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { obtenerTramites, planesOfertados, tramitePorId, Paises } from '../../../apollo-cliente';
import { cargarHomologacionDB } from '../../../components/tramite/homologacion/formulario/cargarFormularioDB';
import { usePreregistroPorCurp } from '../../../hooks/useQuery';
import { BajaTemporal } from '../../../components/tramite/bajaTemporal';
import { obtenerRequisitosGQL, TipoRequisitos } from '../../../apollo-cliente/tramites/obtenerRequisitos';
import { CatDocumentos } from '../../../helpers/expedientes';

interface Props {
  id: string,
  tramite: TypeTramite,
  unidadesAcademicas: TypeUnidadesAcademicas[],
  paises: TypePais[],
  requisitos: TipoRequisitos[]
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const {tramitesState,dispatch} = useTramitesContext()
  const {homologacion} = tramitesState.procedimientos
  
  const {data} = usePreregistroPorCurp(auth?.usuario?.alumno?.crpentalu!);
  useEffect(()=>{
    cargarHomologacionDB(data!,dispatch)
  },[data,dispatch])

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
  const mapDocInit: CatDocumentos[] = []
  props.requisitos.map((r)=>{
    mapDocInit.push(r.documento)
  });

  return (

    <PaginaTramite tramite={props.tramite} linkChildren={'iniciarTramite'} >
      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
          <div className='relative bg-white p-6' >

            {
              props.id==="15" && <>
                {!homologacion && <UnidadesAcademicas unidadesAcademicas={props.unidadesAcademicas} />}

                {homologacion && <PasosHomologacion paises={props.paises} />}
              </>
            }

            {
              props.id==="1" && 
              <>
                {!tramitesState.procedimientos.bajaTemporal && <SeleccionarPlan />}
                {tramitesState.procedimientos.bajaTemporal && <BajaTemporal tramiteId={parseInt(props.id)!} mapDocInit={mapDocInit} />}

              </>
            }
            
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
  const unidadesAcademicas = await planesOfertados(6)
  const paises = await Paises()
  const requisitos = await obtenerRequisitosGQL(tramiteId)
  
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
      unidadesAcademicas,
      paises,
      requisitos
    },
    revalidate: 86400
  }
}

export default TramiteHome