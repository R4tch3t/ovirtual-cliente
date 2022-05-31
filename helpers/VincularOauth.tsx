import { signIn } from "next-auth/react";
import { Fragment, useRef, useState, useCallback } from "react";
import { vincularOusuarioGQL } from "../apollo-cliente/login/vincularOusuario";
import { useAppContext } from "../auth/authContext";
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import Router from 'next/router';
import { ModalError } from "../components/ModalError";

const VincularOauth = () => {
    const {auth,logout,signOauth} = useAppContext();
    const [loading, setLoading] = useState(false);
    const vincularOAuth = async ()=>{
        setLoading(true)
        let matricula:any = document.getElementById('matricula')!
        matricula = matricula.value!
        
        const user = {
            emailO: auth?.usuario?.email!,
            matricula,
            name: auth?.usuario?.nombre!,
        }
        console.log("vincuMal ",auth!)
        const respVinculacion = await vincularOusuarioGQL(user)
        console.log("respVinc ",respVinculacion)
        if(!respVinculacion?.respNewOuser){
            setLoading(false)
            return setOpenModalE(true)//setDataModalE({...dataModalE,open:true})
        }

        const userO = {
            name: auth?.usuario?.nombre!,
            email: auth?.usuario?.email!
        }
        await signOauth!(userO as any)
        setLoading(false)
    }
    
    const dataModal = {
        title: 'Error', 
        txt:'La cuenta debe estar vinculada a una matrícula, favor de introducir la matrícula.', 
        btn1:{txt:'Cerrar sesión', onClose: ()=>{}},
        input1: {
            label:'Matrícula',
            name:'matricula',
            placeholder:'01234567'
        },
        btn2: {
            txt:'Vincular matrícula', 
            loading,
            setLoading, 
            onClick: vincularOAuth
        }
      };
    const [openModalE, setOpenModalE] = useState(false)
    const dataModalE = {
        //open: false,
        title: 'Error', 
        txt:'Favor de verificar datos...', 
        btn1:{onClose: ()=>{setOpenModalE(false)} /*useCallback(()=>{setOpenModalE(false)},[setOpenModalE])*/ },
        btn2: {
            txt:'Aceptar',
            onClick: /*()=>{setOpenModalE(false)}*/useCallback(()=>{setOpenModalE(false)},[setOpenModalE])
        }
    };
    

      return (
        <>
            
            
            <ModalError open={auth?.vincularOauth===false} setOpen={()=>{ logout!() }} title={dataModal.title} 
                txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} input1={dataModal.input1} >
                    <ModalError open={openModalE} setOpen={()=>{  }} title={dataModalE.title} 
                        txt={dataModalE.txt} btn1={dataModalE.btn1} btn2={dataModalE.btn2} />        
            </ModalError>

            
        </>
      )
}

export{
    VincularOauth
}