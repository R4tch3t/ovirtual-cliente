import Link from 'next/link'
import Router from 'next/router';
import React from 'react';
import { Loading } from "@nextui-org/react";
import {Home} from '../subPages/Home';
import MainHomen from '../components/layouts/Home'
import {RedirecApp} from './RedirecApp';
//import Login from "../login"
//import Registro from "../sigin"
const AppLinker = () =>{
  const auth = RedirecApp();
//const {auth, verificaToken}:any = useAppContext();
  
  /*useEffect(()=>{
    verificaToken();
  },[]);*/

  if(!auth||auth.checking){
    return( 
    <div className='loadingDiv' > 
      <Loading> Cargando... </Loading>
    </div>
    )
  }

  //console.log(auth)

  if(!auth.logged){
    /*useEffect(()=>{
        verificaToken();
      },[]);*/
    //Router.push("/login");
  }

return (<>
    {/*<header >
        <Link href="/" > </Link>
        <Link href="/login" > </Link>
        <Link href="/signup" > </Link>
        <Link href="/perfil" > </Link>
        <Link href="/chat" > </Link>
        <ul>
            <li>
            <Link href="/">
                <a>Home</a>
            </Link>
            </li>
            <li>
            <Link href="/login">
                <a>login</a>
            </Link>
            </li>
            <li>
            <Link href="/sigin">
                <a>sigin</a>
            </Link>
            </li>
            <li>
            <Link href="/post/second">
                <a>Second Post</a>
            </Link>
            </li>
        </ul>
    </header>*/}
    {/*auth.logged&&<Chat/>*/}
    <Home link='Inicio' > 
      <MainHomen />
    </Home>
    </>
);
}
export default AppLinker