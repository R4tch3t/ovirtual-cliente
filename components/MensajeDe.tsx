import spellDate from "../helpers/spellDate"
import Slide from "@mui/material/Slide"
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAvatarApollo } from "../auth/provider/getAvatar";
import { useChatContext } from "../context/chat/ChatContext";


const MensajeBase = ({de,name,txt,time}:any)=>{
  const {chatState} = useChatContext()
  const date = spellDate(time);
  const [avatar,setAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxYfvIZ4RJ4x79EtaIcgNs8EgQTx2C3eG-w&usqp=CAU")
  useEffect(()=>{
      getAvatarApollo(chatState?.chatActivo?.id!).then((avatar)=>{          
          setAvatar(avatar)
      })
  },[chatState?.chatActivo?.id])
  
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
          <div className="inline-block h-9 w-9 rounded-full overflow-hidden" >
            <Image
              className="inline-block h-9 w-9 rounded-full"
              width={'100%'}
              height={'100%'}
              placeholder='blur' 
              blurDataURL={avatar}
              src={avatar}
              alt=""
            />
          </div>
        </div>
      </div>
      <span className="text-sm text-gray-500" >{date}</span>
    </div>
  )
}

export const MensajeDe = ({de,ultimo,name,txt,time}:any) => {

    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <div className='w-full' >
          <MensajeBase de={de} name={name} txt={txt} time={time} />
        </div>
      </Slide>
    )    
}
