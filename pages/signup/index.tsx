import React from 'react';
import Router from 'next/router';
import {Home} from '../../subPages/Home';
import SignupLayout from '../../components/layouts/Signup'
import { RedirecApp } from '../../router/RedirecApp';
import Head from 'next/head';
import { Loading } from '@nextui-org/react';
import Cookies from 'js-cookie';
//import Login from "../login"
//import Registro from "../sigin"
const PerfilHome = () =>{
  const auth = RedirecApp();
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

  //console.log(auth)

  if(auth.logged){
    Router.replace("/");
  }

return (
      <>
        <Head>
          <title>Ovirtual - Chat</title>
        </Head>
        <Home link='Signup' >
          <SignupLayout />
        </Home>
      </>
);
}

/*// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  //const { data } = await  // your fetch function here 
  
  //const token = localStorage.getItem("token")
  const cookies = req.cookies;
  const {logged} = cookies
  //console.log(auth)
  if(!logged){
    return {
      redirect:{ 
        destination: '/',
        permanent: false}
    }
  }

  return {
    props: {
      logged: false
    }
  }
}*/

export default PerfilHome