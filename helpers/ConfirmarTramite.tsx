import { useState } from "react";
import { ModalWarning } from "../components/ModalWarning";

type Props = {
  onSubmit: () => Promise<void>,
  open: boolean,
  setOpen: any
}

const ConfirmarTramite = ({onSubmit, open, setOpen}:Props) => {
    const [dataModal, setDataModal] = useState({
        title: '¡Advertencia!', 
        txt:'¿Está seguro de enviar el trámite?.', 
        btn1:{txt:'Cancelar', onClose: ()=>{}},
        btn2: {txt:'Aceptar', 
        onClick: async ()=>{
           await onSubmit()
           setOpen(false)
        }}
      });
      
      return (
        <>
          {<ModalWarning open={open} setOpen={()=>{setOpen(false)}} title={dataModal.title} 
            txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} 
          />}

        </>
      )
}

export{
  ConfirmarTramite
}