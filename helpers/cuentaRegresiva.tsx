import {useEffect, useState} from 'react';
import { useAppContext } from '../auth/authContext';
import { ModalWarning } from "../components/ModalWarning";
import Cookies from 'js-cookie';

let segActual = [25]
export let primerContador:any = null
export let ultimoContador:any = null
export let ultimosSegundos:any = null
export let globalIsOpenRecount = false
let globalSetOpen:any = null
let globalSetRecount:any = null
export const globalRecount = () =>{
    segActual[0]=26        
    globalSetOpen!(false)
    clearTimeout(ultimosSegundos);
    globalSetRecount!(true)
}

export const CuentaRegresiva = () => {
    const {auth,logout} = useAppContext();
    const [open, setOpen] = useState(false)
    const [ultimosSeg, setUltimosSeg] = useState(25)
    const [recount, setRecount] = useState(false)
    const dataModal = {
        title: '¡Advertencia!', 
        txt:'¡La sesión está apunto de expirar!.',
        txt2:ultimosSeg+' Segundos', 
        btn1:{txt:'Cerrar sesión', onClose: ()=>{}},
        btn2: {txt:'Seguir conectado', 
        onClick: ()=>{
            globalRecount()    
        }}
      };
      const closeSession = () =>{
        logout!()
        setOpen(false)
        ultimoContador=null
      }
      globalSetOpen=setOpen
      globalSetRecount=setRecount
      globalIsOpenRecount=open

      ultimosSegundos = () =>{
          
        if(segActual[0]>0){  
            
            ultimoContador = setTimeout(
                ()=>{
                    segActual[0]--;
                    setUltimosSeg!(segActual[0])
                    ultimoContador=null
                    if(ultimosSegundos!==null){
                        ultimosSegundos!()
                    }
                    
                },1000)
                
        }else if (segActual[0]===0){
            
            if(open){
                closeSession()
            }
        }
        
      }

      const iniciarCuentaRegresiva = () =>{
        
        primerContador = setTimeout(()=>{
            if(auth?.logged&&Cookies.get('expiresIn')==='3m'){
                if(ultimoContador===null){
                    segActual[0]=25
                    setUltimosSeg(25)
                    setOpen(true)    
                    ultimosSegundos()
                }else{
                    segActual[0]=25
                    setUltimosSeg(25)
                    setOpen(true)
                    clearTimeout(ultimosSegundos);
                }
            }

        },141000) //141000 = 2.35 minutos
    }

    useEffect(()=>{

        if((!auth?.checking&&auth?.logged&&setRecount)){
            setRecount(true)
        }
    
    },[auth])

    useEffect(()=>{

        if(recount){
            setRecount(false)
            clearTimeout(primerContador);
            iniciarCuentaRegresiva()
        }
    
    },[recount])
      
    return (
        <ModalWarning open={open} setOpen={closeSession} title={dataModal.title} 
            txt={dataModal.txt} txt2={dataModal.txt2} btn1={dataModal.btn1} btn2={dataModal.btn2} 
          >
              
        </ModalWarning>
    )
}