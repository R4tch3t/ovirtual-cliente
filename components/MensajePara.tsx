import Slide from "@mui/material/Slide"
import Image from "next/image";
import spellDate from "../helpers/spellDate";
import { useEffect, useState } from "react";
import { useAppContext } from '../auth/authContext';
import { getAvatarApollo } from "../auth/provider/getAvatar";
import { useChatContext } from '../context/chat/ChatContext';


const MensajeBase = ({de,para,name,txt,time,readed}:any) => {
    const {auth} = useAppContext()
    const {chatState} = useChatContext()
    const date = spellDate(time);
      
    const localFoto = localStorage.getItem('fotoPerfil') 
    const imageUrl=auth?.usuario?.avatar! ? auth?.usuario?.avatar! : 
      (localFoto?localFoto:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/480px-Avatar_icon_green.svg.png")
      
    const [avatar,setAvatar] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/480px-Avatar_icon_green.svg.png")

    useEffect(()=>{
        getAvatarApollo(chatState?.chatActivo?.id!).then((avatar)=>{          
            setAvatar(avatar)
        })
    },[chatState?.chatActivo?.id])  
    return (
        <div className='chatDivPara' >
            <div className="sm:flex msjPara relative">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    <div className="inline-block h-9 w-9 rounded-full" >                    
                        <Image
                            className="inline-block h-9 w-9 rounded-full"
                            width={'100%'}
                            height={'100%'}
                            placeholder='blur' 
                            blurDataURL={imageUrl}
                            src={imageUrl}
                            alt=""
                        />
                    </div>
                </div>
                <div >
                    <h4 className="text-lg font-bold titlePara">{name}</h4>
                    <div className="wrapText" >
                        {txt}
                    </div>

                </div>
                {readed==='N'&&<span className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white bg-blue-400" />}
                {readed==='S'&&
                
                <Slide direction="down" in={true} mountOnEnter unmountOnExit>   
                    <div className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-400 rounded-full" >                 
                        <Image
                            width={'100%'}
                            height={'100%'}
                            placeholder='blur' 
                            blurDataURL={avatar}
                            className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-400 rounded-full"
                            src={avatar}
                            alt=""
                        />
                    </div>
                </Slide>    
                
                }

                
            </div>
            <span className="text-sm text-gray-500" >{date}</span>
        </div>
        )
}

export const MensajePara = ({de, para, ultimo,name,txt,time,readed}:any) =>{
    return (<>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>    
                <div>
                    <MensajeBase de={de} para={para} name={name} txt={txt} time={time} readed={readed} />
                </div>
            </Slide>
        </>
      )
}
