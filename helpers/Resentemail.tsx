import { Loading } from "@nextui-org/react";
import { useState } from "react";
import client from "../apollo-cliente";
import { useAppContext } from "../auth/authContext";
import { ModalError } from "../components/ModalError";


const Resentemail = () => {
    const {auth,logout,resentemail}:any = useAppContext();
    const [dataModal, setDataModal]:any = useState({
        title: 'Error', 
        txt:'La cuenta no está activada, favor de verificar su correo y activarla.', 
        btn1:{txt:'Cerrar sesión', onClose: ()=>{}},
        btn2: {txt:'Reenviar correo de verificación', 
        onClick: async()=>{
            const {btn2} = dataModal
            await client.cache.reset()
            //await client.clearStore();            
                setDataModal({
                    ...dataModal,
                    btn2:{
                        onClick:btn2.onClick,
                        txt: <Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />
                    }
                })
                console.log(auth)
                await resentemail(auth)
                
                setDataModal({
                    ...dataModal,
                    btn2:{
                        onClick:btn2.onClick,
                        txt: 'Reenviar correo de verificación'
                    }
                })
            
        }}
      });
      
      return (
      <>
         <ModalError open={!auth.activated} setOpen={()=>{logout()}} title={dataModal.title} 
          txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} />
          
      </>
      )
}

export{
    Resentemail
}