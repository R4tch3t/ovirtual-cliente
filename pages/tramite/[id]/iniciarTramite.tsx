import React, { useEffect } from 'react';
import { GetStaticProps,GetStaticPaths, NextPage } from 'next';
import Router from 'next/router';
import { RedirecApp } from '../../../router/RedirecApp';
import { Loading } from '@nextui-org/react';
import { TypeTramite, TypeUnidadesAcademicas, TypePais } from '../../../interfaces';
import { PaginaTramite, SeleccionarPlan } from '../../../components/tramite';
import { PasosPreregistro } from '../../../components/tramite/preregistro';
import { UnidadesAcademicas } from '../../../components/tramite/unidadAcademica';
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { obtenerTramites, planesOfertados, tramitePorId, Paises, TipoNivelEstudio, obtenerNivelEstudios } from '../../../apollo-cliente';
//import { cargarPreregistroDB } from '../../../components/tramite/preregistro/formulario/cargarFormularioDB';
//import { usePreregistroPorCurp } from '../../../hooks/useQuery';
import { BajaTemporal } from '../../../components/tramite/bajaTemporal';
import { obtenerRequisitosGQL, TipoRequisitos } from '../../../apollo-cliente/tramites/obtenerRequisitos';
import { CatDocumentos } from '../../../helpers/expedientes';

//import HeadSeleccionarInscripcion from '../../../components/tramite/inscripcion/headSelecionarPlan';
import HeadSeleccionarPlanBajaTemporal from '../../../components/tramite/bajaTemporal/headSelecionarPlan';
import HeadSeleccionarPlanCambioDeGrupo from '../../../components/tramite/cambioDeGrupo/headSelecionarPlan';
import HeadSeleccionarPlanCambioUnidadAcademica from '../../../components/tramite/cambioUnidadAcademica/headSelecionarPlan';


import { Equivalencia } from '../../../components/tramite/equivalencia'
import { Homologacion } from '../../../components/tramite/homologacion';
import { Revalidacion } from '../../../components/tramite/revalidacion'
import { Inscripcion } from '../../../components/tramite/inscripcion';import { CambioDeGrupo } from '../../../components/tramite/cambioDeGrupo';
import { CambioUnidadAcademica } from '../../../components/tramite/cambioUnidadAcademica';
;
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
  const {preregistro, bajaTemporal, cambioDeGrupo, cambioUnidadAcademica} = tramitesState.procedimientos
  
  /*const {data} = usePreregistroPorCurp(auth?.usuario?.alumno?.crpentalu!);
  useEffect(()=>{
    cargarPreregistroDB(data!,dispatch)
  },[data,dispatch])*/

  if(auth?.checking!){
    return( 
      <div className='loadingDiv' > 
        <Loading> Cargando... </Loading>
      </div>
    )
  }

  if((!auth?.logged!&&(props.id!=="14"&&props.id!=="15"&&props.id!=="16")) || 
    (auth?.usuario!&&auth?.usuario?.matactiva! === 0)
  ){
    Router.replace("/");
  }

  const mapDocInit: CatDocumentos[] = []
  props.requisitos.map((r)=>{
    mapDocInit.push(r.documento)
  });

  return (

    <PaginaTramite tramite={props.tramite} linkChildren={'iniciarTramite'} >
      <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
          <div className='relative bg-white p-6' >

            {/*
              props.id==="2" && <>
                {!preregistro && <UnidadesAcademicas unidadesAcademicas={props.unidadesAcademicas} />}

                {preregistro && <PasosPreregistro paises={props.paises} />}
              </>*/
            }
            

            {
              props.id==="1" && 
              <>
                {!bajaTemporal && <HeadSeleccionarPlanBajaTemporal >
                    <SeleccionarPlan nombreContextState='bajaTemporal' />
                  </HeadSeleccionarPlanBajaTemporal>
                }
                {bajaTemporal && <BajaTemporal tramiteId={parseInt(props.id)!} mapDocInit={mapDocInit} />}

              </>
            }

            {
              (props.id==="5"||props.id==="40"
              ||props.id==="46"||props.id==="47"
              ||props.id==="48") && 
              <>
                {/*!inscripcion && <HeadSeleccionarInscripcion 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!} >
                    <SeleccionarPlan nombreContextState='inscripcion' />
                  </HeadSeleccionarInscripcion>
                */}
                <Inscripcion 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  mapDocInit={mapDocInit} />

              </>
            }

            {
              props.id==="14" && auth.logged && <>
                
                 <Equivalencia 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  mapDocInit={mapDocInit} />
              </>
            }

            {
              props.id==="15" && auth.logged && <>
                
                <Homologacion 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  unidadesAcademicas={props.unidadesAcademicas}
                  paises={props.paises}
                  mapDocInit={mapDocInit} />
              </>

            }

            {
              props.id==="16" && auth.logged && <>
                
                <Revalidacion 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  mapDocInit={mapDocInit} />
              </>
            }

            {
              (props.id==="14"||props.id==="15"||props.id==="16") && 
                !auth.logged &&
                  <>
                    {/*!preregistro && <HeadSeleccionarPlanHomologacion >
                        <SeleccionarPlan nombreContextState='homologacion' />
                      </HeadSeleccionarPlanHomologacion>
                    */}
                    {!preregistro && <UnidadesAcademicas unidadesAcademicas={props.unidadesAcademicas} tramiteId={parseInt(props.id)!} />}

                    {preregistro && <PasosPreregistro paises={props.paises} />}
                  </>
            }

            {
              props.id==="20" && 
              <>
                {!cambioDeGrupo && <HeadSeleccionarPlanCambioDeGrupo 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                >
                    <SeleccionarPlan nombreContextState='cambioDeGrupo' />
                  </HeadSeleccionarPlanCambioDeGrupo>
                }
                {cambioDeGrupo && <CambioDeGrupo 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  mapDocInit={mapDocInit} />}

              </>
            }

          {
              props.id==="23" && 
              <>
                {!cambioUnidadAcademica && <HeadSeleccionarPlanCambioUnidadAcademica
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                >
                    <SeleccionarPlan nombreContextState='cambioUnidadAcademica' />
                  </HeadSeleccionarPlanCambioUnidadAcademica>
                }
                {cambioUnidadAcademica && <CambioUnidadAcademica 
                  titulo={props.tramite.nombre!} 
                  descripcion={props.tramite.descripcion!}
                  tramiteId={parseInt(props.id)!} 
                  mapDocInit={mapDocInit}
                  unidadesAcademicas={props.unidadesAcademicas} />}

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
  const unidadesAcademicas = await planesOfertados(3)
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