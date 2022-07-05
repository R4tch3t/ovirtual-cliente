import { FC, useState } from "react";
import { Slide } from "@mui/material";
import { Loading, Spacer } from "@nextui-org/react";
import { PropsCard } from ".";
import Info from "../Info";
import Router from "next/router";
import { useAppContext } from '../../auth/authContext';


export const TramiteAspInscripcion:FC<PropsCard> = ({action}) => {
    const {auth} = useAppContext()
    const [cargando, setCargando] = useState(false)    

    const irAlTramite = () => {
        
        setCargando(true)
        const {NIVEL_INGRESAR} = auth?.usuario?.vwAspirante![0]!
        if(!NIVEL_INGRESAR){
            return
        }
        const tramiteId = NIVEL_INGRESAR===3?5:
                (NIVEL_INGRESAR===4||NIVEL_INGRESAR===5?40:
                    (NIVEL_INGRESAR===6?46:
                        (NIVEL_INGRESAR===7?47:48)
                    )
                )

        Router.push(`/tramite/${tramiteId}/iniciarTramite`)

    }

    return (
        <>            
            <div className="mt-8">
                <h3 className="text-lg font-medium">
                {/*<Link href={action.href} >*/}
                    {/*<a  className="focus:outline-none">*/}                                
                    <span className="absolute" aria-hidden="true" />
                    {action.name}
                    {/*</a>*/}
                {/*</Link>*/}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                    {action.descripcion}
                </p>
                <Spacer y={2} />
                <Info msg={<>Para realizar ó ver el estado de su tramite de inscripcion <a onMouseDown={irAlTramite} rel="noreferrer" className="underline" href={undefined} >ir al trámite</a>...</>} />
                
                <Slide  direction="up" in={true} mountOnEnter unmountOnExit>
                    <div className="w-full" >                                           
                    
                        <Spacer y={2} />
                        <button
                            type="button"
                            onMouseDown={irAlTramite}
                            style={{width: 160}}
                            className={`bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                            disabled={cargando}
                        >
                            {
                                cargando ? 
                                    <Loading className="w-8 h-5" type="points-opacity" color="white" size="sm" />
                                    :
                                    'Ir al trámite'
                            }
                        </button>

                    </div>
                </Slide>
                
                
            </div>
        </>)
}
