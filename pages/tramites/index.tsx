import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import TramitesLayout from '../../components/layouts/Tramites'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import { fetchSinToken } from '../../helpers/fetch';
import { useTramitesContext } from '../../context/tramites/TramitesContext';
import { types } from '../../types/tramites';
//import Login from "../login"
//import Registro from "../sigin"
import { TypeTramitesState } from '../../interfaces/TypesTramitesContext';
import filtroTramites from '../../helpers/filtroTramites';
//import  from 'react';

const TramitesHome:NextPage<TypeTramitesState> = (props) =>{
  const auth = RedirecApp();
  const {tramitesState} = useTramitesContext();
  const {tramites, tta,ttb} = tramitesState

  if(!tramites){
    //useCallback(()=>{
      //const resp = await fetchConToken(`tramites/todos`);
      //fetchConToken(`tramites/modTitulacion`).then((resp)=>{
        const tramites = filtroTramites(props.tramites!,tta,ttb)/*props.tramites!.filter((tramite) => {
         // console.log(tramite.nivelAplica)
          const tipoTramites = tramite.TipoTramites?.filter((tt)=>{
            return tt.tipoTramite > 0 && tt.tipoTramite < 4
          })

          return tipoTramites!.length>0
          //return tramite.nivelAplica! > 4 && tramite.nivelAplica! < 9
        }).sort((a,b)=>{
          const ta = a.TipoTramites && a.TipoTramites.length>0 && a.TipoTramites[0]?.id ? a.TipoTramites[0].id : a.id
          const tb = b.TipoTramites && b.TipoTramites.length>0 && b.TipoTramites[0]?.id ? b.TipoTramites[0].id : b.id 
          return ta-tb
        });*/

        console.log(tramites)
        console.log(props.tramites)
        //try{
          tramitesState.tramites=tramites
        /*dispatch({
            type: types.cargarTramites,
            payload: tramites
        });*/
      /*}catch(e){
        console.log(e)
      }*/
      //})
    //},[dispatch])()
  }

//const {auth, verificaToken}:any = useAppContext();
  
  /*useEffect(()=>{
    verificaToken();
  },[]);*/

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
  //const { data } = await  // your fetch function here 
  const resp = await fetchSinToken(`tramites/todos`);
  
  return {
    props: {
      tramites: resp.tramites
    }
  }
}

export default TramitesHome