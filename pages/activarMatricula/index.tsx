
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ModalSuccess } from '../../components/ModalSucces';
import { useAppContext } from '../../auth/authContext';
import { ModalError } from '../../components/ModalError';
import Cookies from 'js-cookie';


const ActivarMatricula: NextPage = () => {
  const {auth,activarMatricula,resentemail} = useAppContext();
  const [modalS, setModalS] = useState(false)
  const [modalE, setModalE] = useState(false)
  const [dataModal, setDataModal]:any = useState({title: '', txt:'', btn1:{txt:'',onClose:setModalS}})
  const router = useRouter()

  useEffect(()=>{
    const {token} = router.query as {token:string}
    setDataModal({
      title: "Éxito", txt: 'La cuenta se ha activado...', 
      btn1: {txt:"Ir al inicio", onClose:setModalS} 
    })
    console.log('token ',token)
    if(!token){
      return 
    }
    activarMatricula!(token).then((r)=>{
      
      if(r){
        Cookies.set("expiresIn",'3m',{expires: 365});
        setDataModal({title: "Éxito", txt: "La cuenta se ha activado...", btn1: {txt:"Ir al inicio", onClose:setModalS} })
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
      <ModalSuccess open={modalS} setOpen={()=>{
        
        
        setModalS(false)
        router.replace('/')

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
