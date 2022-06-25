
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ModalSuccess } from '../../components/ModalSucces';
import { useAppContext } from '../../auth/authContext';
import { ModalError } from '../../components/ModalError';
import Cookies from 'js-cookie';
import { Loading } from '@nextui-org/react';


const ActivarMatricula: NextPage = () => {
  const {auth,activarMatricula,resentemail} = useAppContext();
  const [modalS, setModalS] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [dataModal, setDataModal]:any = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalS}})
  const router = useRouter()
  
  useEffect(()=>{
    const {token, tramiteId} = router.query as {token:string,tramiteId:string}
    
    setDataModal({
      title: "Éxito", txt: 'La cuenta se ha activado...', 
      btn1: {txt:"Ir al inicio", onClose:setModalS} 
    })
    
    if(!token){
      return 
    }
    activarMatricula!(token).then((r)=>{
      
      if(r){
        Cookies.set("expiresIn",'3m',{expires: 365});
        setDataModal({title: "Éxito", txt: "La cuenta se ha activado...", btn1: {txt:`Ir al ${tramiteId?'trámite':'inicio'}`, onClose:setModalS} })
        setModalS(true)
      }else{
        setDataModal({
          title: "Error", 
          txt: "El usuario NO fue activado, intenta reenviar el correo de activacion ó contactate con algún administrador...", 
          input1: {
            label:'Matrícula',
            name:'matricula',
            placeholder:'01234567'
          },
          btn1: {txt:"Regresar al inicio", onClose:setModalE},
          btn2: {txt:"Reenviar correo de activación...", onClick: ()=>{
            const matricula = (document.getElementById('matricula') as any).value
            const newAuth = {matricula}
            resentemail!(newAuth! as any)
            router.replace('/')
        }} 
        })
        setModalE(true);
      }

    })
      
      //
  },[router])
    
    return <>
      <ModalSuccess open={modalS} setOpen={async()=>{
        const {tramiteId} = router.query as {tramiteId:string}
        setDataModal({...dataModal, btn1:{
          ...dataModal.btn1,
          txt:<Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />
        }})
        
        if(tramiteId){
          await router.replace(`/tramite/${tramiteId}/iniciarTramite`)
        }else{
          await router.replace('/')
        }
        setModalS(false)
        //router.replace('/')

      }} 
      title={dataModal.title} 
      txt={dataModal.txt} btnTxt={dataModal.btn1.txt} />
      <ModalError open={modalE} 
        setOpen={()=>{
          
          setModalE(false)
          router.replace('/')

        }} 
        title={dataModal.title} input1={dataModal.input1}
        txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} />
    </>
}

export default ActivarMatricula
