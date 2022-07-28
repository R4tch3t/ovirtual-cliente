/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, FC } from 'react'
import { Transition } from '@headlessui/react'
import { useAppContext } from '../../auth/authContext';
import { useNotiContext } from '../../context/notificaciones/NotiContext';
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid"
import { setReadedNotiTramiGQL } from '../../apollo-cliente/notificacion';
import Router from 'next/router';


type Props = {
  tramite: any
  //nombre: string,
  //mensaje: string,
  //de: number
}

export const NotiTramite:FC<Props> = ({tramite}) => {
  const {titulo, mensaje, idUser, estado} = tramite
  const {auth} = useAppContext()
  const [show, setShow] = useState(auth?.logged!)

  const onClick = async () => {  
    const {idUser, idTramite, uuid} = tramite
    setShow(false)
    const upTrami = {
      idUser,
      idTramite
    }
    await setReadedNotiTramiGQL(upTrami)
    await Router.push(`/misTramites?t=${uuid}`)
  }

  return (
    <>      
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5">
              <div className="w-0 flex-1 p-4 border-r">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">

                  {(estado === 4||estado===8) &&
                    <ExclamationIcon className="flex-shrink-0 h-6 w-6 text-yellow-600" aria-hidden="true" />
                  }

                  {(estado === 5 || estado === 6) &&
                    <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-600" aria-hidden="true" />
                  }

                  {(estado === 7) &&
                    <ExclamationIcon className="flex-shrink-0 h-6 w-6 text-red-600" aria-hidden="true" />
                  } 

                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{titulo}  </p>
                    <p className={`mt-1 text-sm text-${(estado===4||estado===8) ? 'yellow' : 
                      ((estado===5||estado===6)?'green':'red')}-500`}>{mensaje}</p>
                  </div>
                </div>
              </div>

             <div className="flex">
                <div className="flex flex-col divide-y divide-gray-200">
                  <div className="h-0 flex-1 flex">
                    <button
                      type="button"
                      className="w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500"
                      onClick={onClick}
                    >
                      Ver
                    </button>
                  </div>
                  <div className="h-0 flex-1 flex">
                    <button
                      type="button"
                      className="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-red-500 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            
              
            </div>
          </Transition>
      </>
  )
}