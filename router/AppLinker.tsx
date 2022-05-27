import React from 'react';
import { Loading } from "@nextui-org/react";
import {Home} from '../subPages/Home';
import MainHomen from '../components/layouts/Home'
import {RedirecApp} from './RedirecApp';

const AppLinker = () =>{
  const auth = RedirecApp();

  if(!auth||auth.checking){
    return( 
    <div className='loadingDiv' > 
      <Loading> Cargando... </Loading>
    </div>
    )
  }

  if(!auth.logged){
    /*useEffect(()=>{
        verificaToken();
      },[]);*/
    //Router.push("/login");
  }

return (
  <>
    <Home link='Inicio' > 
      <MainHomen />
    </Home>
  </>
);
}
export default AppLinker