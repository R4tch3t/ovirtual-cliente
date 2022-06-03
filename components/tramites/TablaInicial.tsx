import {useEffect} from 'react';
import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useTramitesContext } from "../../context/tramites/TramitesContext";
import { types } from "../../types/tramites";
import { TabsTramites } from './TabsTramites';
import { useSocketContext } from '../../context/SocketContext';
import { obtenerTramites } from '../../apollo-cliente';

const paraNivel = (n:number|null) => {
  switch(n){
    case 3:
      return 'Bachillerato'
    case 4:
      return 'Técnico Enfermeria'
    case 5:
      return 'Licenciatura'
    case 6:
      return 'Especialidad'
    case 7:
      return 'Maestría'
    case 8:
      return 'Doctorado'
    default:
      return ''
  }
}
  const TablaInicial = () => {
    const {tramitesState, dispatch} = useTramitesContext();
    const {tramites} = tramitesState
    const {socket}:any = useSocketContext();

    //Escuchar los cambios en tramites 
    /*useEffect(()=>{
      socket?.on("getTramites",async()=>{
        const tramites = await obtenerTramites()

          dispatch({
              type: types.cargarTramites,
              payload: {tramites, catNivelEstudio:tramitesState.catNivelEstudio}
          })
      })
    },[socket,dispatch]);*/

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <Spacer y={2} />
        <div className="sm:flex sm:items-center">
          
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Trámites y Servicios para estudiantes en activo y egresados de la UAGro.</h1>
            <p className="mt-2 text-sm text-gray-700">
            A través de la presente sección puedes dar inicio y seguimiento a los diversos trámites y servicios disponibles, 
            es importante que leas correctamente las instrucciones. Antes de iniciar un nuevo trámite, 
            verifica que no tengas en activo el trámite que deseas iniciar, selecciona adecuadamente la pestaña 
            correspondiente al nivel de estudios correspondiente.
            </p>
          </div>
          
        </div>
        <Spacer y={2} />

        <TabsTramites />
                
        <Spacer y={2} />
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  #
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Trámite
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Nivel
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Descripcion
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Clave
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Fecha Inicial de Validación
                </th>
                
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {tramites && tramites.map((tramite,i) => (
                <Link key={tramite.id} href={`/tramite/${tramite.id}`} >
                  <tr  className='select-feed' >
                  <td className="px-3 py-4 text-sm text-gray-500">{i+1}</td>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {tramite.nombre}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Nivel</dt>
                        <dd className="mt-1 truncate text-gray-700">
                        {
                          tramite.nivelEstudio  
                        }
                        </dd>
                        <dt className="sr-only">Descripcion</dt>
                        <dd className="mt-1 truncate text-gray-700">{tramite.descripcion}</dd>
                        <dt className="sr-only sm:hidden">Clave</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{tramite.clave}</dd>
                      </dl>
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {
                       tramite.nivelEstudio
                    }
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{tramite.descripcion}</td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{tramite.clave}</td>
                    <td className="px-3 py-4 text-sm text-gray-500">{tramite.fechaInicialValidacion}</td>                    
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    )
  }

  export {TablaInicial}