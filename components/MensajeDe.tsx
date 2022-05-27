import spellDate from "../helpers/spellDate"
import Slide from "@mui/material/Slide"

const MensajeBase = ({name,txt,time}:any)=>{
  const date = spellDate(time);
  return(
    <div className='w-full chatDivDe' >
      <div className="flex msjDe">
        <div>
          <h5 className="text-lg font-bold whiteTxt">{name}</h5>
          <div className="wrapText">
            {txt}
          </div>
        </div>
        <div className="ml-4 flex-shrink-0">
          
            <img
              className="inline-block h-9 w-9 rounded-full"
              src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
              alt=""
            />
            
        </div>
      </div>
      <span className="text-sm text-gray-500" >{date}</span>
    </div>
  )
}

export const MensajeDe = ({ultimo,name,txt,time}:any) => {

    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className='w-full' >
          <MensajeBase name={name} txt={txt} time={time} />
        </div>
      </Slide>
    )    
}
