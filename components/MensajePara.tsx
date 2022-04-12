import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide"
import Grow from "@mui/material/Grow";
import spellDate from "../helpers/spellDate";

const MensajeBase = ({name,txt,time,readed}:any) => {
    const date = spellDate(time);
    return (
        <div className='chatDivPara' >
            <div className="sm:flex msjPara relative">
                <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                    {/*<svg
                    className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
                    preserveAspectRatio="none"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 200 200"
                    aria-hidden="true"
                    >
                    <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
                    </svg>*/}
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
                {/*<Grow
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={500} 
                >*/}    
                    <img
                        className="absolute top-0 right-0 block h-4 w-4 rounded-full ring-2 ring-green-400 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    {/*</Grow>*/}
                </Slide>    
                
                }

                
            </div>
            <span className="text-sm text-gray-500" >{date} {/*<b>{readed==='S'?'LEIDO':(readed==='N'?'NO LEIDO':'')} </b>*/}</span>
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
        
        {/*!ultimo&&
        <Fade in={true}>
            <div>
                <MensajeBase name={name} txt={txt} time={time} readed={readed} />
            </div>
        </Fade>*/
        }
        {/*ultimo &&
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div>
                <MensajeBase name={name} txt={txt} time={time} readed={readed} />
            </div>
        </Slide>*/
        }
        {/*i>0&&
        <MensajeBase name={name} txt={txt} time={time} readed={readed} />*/}
        </>
      )
}

export default ()=>null