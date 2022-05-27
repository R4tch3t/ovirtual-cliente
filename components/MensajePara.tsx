import Slide from "@mui/material/Slide"
import spellDate from "../helpers/spellDate";

const MensajeBase = ({name,txt,time,readed}:any) => {
    const date = spellDate(time);
    return (
        <div className='chatDivPara' >
            <div className="sm:flex msjPara relative">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    
                    <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://pm1.narvii.com/6442/ba5891720f46bc77825afc5c4dcbee06d3c66fe4_hq.jpg"
                        alt=""
                    />

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
                    <img
                        className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-400 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </Slide>    
                
                }

                
            </div>
            <span className="text-sm text-gray-500" >{date}</span>
        </div>
        )
}

export const MensajePara = ({ultimo,name,txt,time,readed}:any) =>{
    return (<>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>    
                <div>
                    <MensajeBase name={name} txt={txt} time={time} readed={readed} />
                </div>
            </Slide>
        </>
      )
}
