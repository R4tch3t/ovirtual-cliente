import React, { useState, useEffect } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { TypeTramite, TypeUnidadesAcademicas, TypePais } from '../../../interfaces';
import { TramiteTabs, PaginaTramite } from '../../../components/tramite';
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { obtenerTramites, planesOfertados, tramitePorId, Paises } from '../../../apollo-cliente';
import { cargarPreregistroDB } from '../../../components/tramite/preregistro/formulario/cargarFormularioDB';
import { usePreregistroPorCurp } from '../../../hooks/useQuery';

interface Props {
  id: string,
  tramite: TypeTramite,
  unidadesAcademicas: TypeUnidadesAcademicas[],
  paises: TypePais[]
}


const TramiteHome:NextPage<Props> = (props) =>{
  const auth = RedirecApp();
  const {dispatch} = useTramitesContext()
  const [state, setState]:any = useState(
    {
        table: {
            head: [ 'Nombre', 'Responsable', 'Telefono' ],
            body: [] 
        } 
    }
  );
  const {data} = usePreregistroPorCurp(auth?.usuario?.alumno?.crpentalu!);
  useEffect(()=>{
    cargarPreregistroDB(data!,dispatch)
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


  props.tramite.tramitesModuloAtencions?.map((modulo)=>{
    
    state.table.body.push({
      'Nombre': modulo.nombre,
      'Responsable': modulo.responsable,
      'Telefono': modulo.telefono
    })
  })

  return (
    <PaginaTramite tramite={props.tramite} >
      <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
            <div className='relative bg-white p-6' >
              <TramiteTabs tramite={props.tramite} tabID={7} />
              
              
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
  const tramite:TypeTramite = await tramitePorId(parseInt(id))
  const unidadesAcademicas = await planesOfertados(6)
  const paises = await Paises()
  
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
      paises
    },
    revalidate: 86400
  }
}

export default TramiteHome