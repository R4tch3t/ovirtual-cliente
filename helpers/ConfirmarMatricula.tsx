import { FC } from "react";
import { ModalWarning } from "../components/ModalWarning";

type Props = {
  onSubmit: () => Promise<any>,
  open: boolean,
  setOpen: any,
  
}

const ConfirmarMatricula:FC<Props> = ({onSubmit, open, setOpen, children}) => {
    const dataModal = {
      title: '¡Advertencia!', 
      txt:'¿Está seguro de vincular una nueva matrícula?.', 
      btn1:{txt:'Cancelar', onClose: ()=>{}},
      btn2: {txt:'Aceptar', 
      onClick: async ()=>{
          await onSubmit()
      }}
    };
      
      return (
        <>
          {
            <ModalWarning open={open} setOpen={()=>{setOpen(false)}} title={dataModal.title} 
              txt={dataModal.txt} btn1={dataModal.btn1} btn2={dataModal.btn2} 
            >
              {children}
            </ModalWarning>
          }

        </>
      )
}

export{
  ConfirmarMatricula
}