import { Slide } from "@mui/material"
import { Input, Loading, Spacer } from "@nextui-org/react"
import Link from "next/link"
import { FC, useState } from "react"
import { InscripcionCard } from "./InscripcionCard"
import { NormalCard } from "./NormalCard"
/*import client from "../../apollo-cliente"
import { actualizarEstadoGQL, consultaAspCURPGQL, consultaResultadoCenevalGQL} from "../../apollo-cliente/aspirante"
import { validarCURP } from "../helpers/validarCURP"
import { ModalInscripcion } from "./ModalInscripcion"
import { ModalSuccess } from "./ModalSucces"
import { ModalWarning } from "./ModalWarning"
*/
//const theme = createTheme()
interface Actions {
    icon: (props: React.ComponentProps<'svg'>)=>JSX.Element,
    name: string,
    href: string,
    descripcion: string,
    iconForeground: string,
    iconBackground: string,
    inputs?: JSX.Element,
    botones?: JSX.Element
}

type Props = {
    nCol: number,
    card?: string,
    actions: Actions[]
}

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

export type PropsCard = {
    action: Actions
}


const HomeActions:FC<Props> = ({nCol,card, actions}) => {
    


    return (
        <div className={`rounded-lg mb-5 bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-${nCol} sm:gap-px`}>
                        <h2 className="sr-only" id="quick-links-title">
                          Links rápidos
                        </h2>
                        {actions.map((action, actionIdx) => (
                          <div
                            key={action.name}
                            className={classNames(
                              actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                              actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                              actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                              'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500'
                            )}
                          >

                            {!card && <NormalCard action={action} />}
                            {card === 'inscripciones' && <InscripcionCard action={action} />}

                          </div>
                        ))}
                      </div>
    )
}

export default HomeActions