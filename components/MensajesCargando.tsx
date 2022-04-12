
import Slide from "@mui/material/Slide"
import { Loading } from '@nextui-org/react'

const MensajeBase = ()=>{
  return(
    <div className='w-full chatDivCargando' >
      <div className="flex msjCargando">
        <div>
          
            <Loading type="spinner" size="lg" />
          
        </div>
        <div className="ml-4 flex-shrink-0">
          
        </div>
      </div>
      
    </div>
  )
}

export const MensajeCargando = () => {

    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className='w-full' >
          <MensajeBase />
        </div>
      </Slide>
    )
}
