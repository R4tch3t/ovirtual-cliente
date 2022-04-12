import { useState } from "react";
import { useAppContext } from "../auth/authContext";
import { ModalError } from "../components/ModalError";

const Resentemail = () => {
    const {auth,logout,resentemail}:any = useAppContext();
    const [dataModal, setDataModal] = useState({
        title: 'Error', 
        txt:'La cuenta no está activada, favor de verificar su correo y activarla.', 
        btn1:{txt:'Cerrar sesión', onClose: ()=>{}},
        btn2: {txt:'Reenviar correo de verificación', 
        onClick: ()=>{
            resentemail(auth)
        }}
      });
      return (
      <>
        {!auth.activated && <ModalError open={!auth.activated} setOpen={()=>{logout()}} title={dataModal.title} 
        txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} />}
      </>)
}

export{
    Resentemail
}