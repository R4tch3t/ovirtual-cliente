import { FC } from "react"
import { setReadedNotiTramiGQL } from "../../../apollo-cliente/notificacion"
import { useNotiContext } from "../../../context/notificaciones/NotiContext";
import { useChatContext } from "../../../context/chat/ChatContext";
import Router from "next/router";
import { NewNotiTramite } from "../../../hooks/useQuery/notificaciones";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid"

interface Props {
    item: NewNotiTramite
}

export const FlayoutItemTramite:FC<Props> = ({item}) => {
const {estado} = item


const onClick = async () => {
    const upTrami = {
        idUser: item.idUser,
        idTramite: item.idTramite
    }
    await setReadedNotiTramiGQL(upTrami)
    await Router.push(`/misTramites?t=${item.uuid}`)
    
}

    return (
        <div
            onMouseDown={onClick}
            className="cursor-pointer border-t-2 border-r-2 border-l-2 border-b-2 -m-3 p-3 flex items-start rounded-lg hover:bg-gray-100 transition ease-in-out duration-150"
        >
            {(estado === 4) &&
             <ExclamationIcon className="flex-shrink-0 h-6 w-6 text-yellow-600" aria-hidden="true" />
            }

            {(estado === 5 || estado === 6) &&
             <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-600" aria-hidden="true" />
            }

            {(estado === 7) &&
             <ExclamationIcon className="flex-shrink-0 h-6 w-6 text-red-600" aria-hidden="true" />
            }
            
            <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{item.titulo}</p>
            <p className="mt-1 text-sm text-sky-500">{item.mensaje}</p>
            {/*<p className="mt-1 text-sm text-red-500">{date}</p>*/}
            </div>
        </div>
    )
}