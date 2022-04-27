import {useEffect} from 'react';
import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import { useTramitesContext } from "../../context/tramites/TramitesContext";
import { types } from "../../types/tramites";
import { ComboTramites } from "./ComboTramites"
import { fetchConToken } from '../../helpers/fetch';
import { TabsTramites } from './TabsTramites';
import { useSocketContext } from '../../context/SocketContext';

//import { ComboTramites } from "./ComboTramites"


const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]
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
    useEffect(()=>{
      socket?.on("getTramites",(tramites:any)=>{
          
          dispatch({
              type: types.cargarTramites,
              payload: {tramites,tta: 0, ttb: 0}
          })
      })
    },[socket,dispatch]);

    /*if(!tramites){
      useEffect(()=>{
        //const resp = await fetchConToken(`tramites/todos`);
        fetchConToken(`tramites/modTitulacion`).then((resp)=>{
          dispatch({
              type: types.cargarTramites,
              payload: resp.tramites
          });
        })
      },[dispatch])
    }*/

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
          {/*<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add user
            </button>
          </div>*/}
        </div>
        <Spacer y={2} />

        <TabsTramites />
        
        {/*<div className='sm:grid sm:grid-cols-3' >
                <div className='sm:grid sm:grid-cols-2' />
                <ComboTramites />
        </div>*/}

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
                {/*<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>*/}
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
                          tramite.TipoTramites?.sort((a,b)=>a.nivelEstudios-b.nivelEstudios)
                          .map((v,i)=>{
                            const slash = i > 0 ? " / " : ""
                            return slash + paraNivel(v.nivelEstudios)
                          })    
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
                      tramite.TipoTramites?.sort((a,b)=>a.nivelEstudios-b.nivelEstudios)
                      .map((v,i)=>{
                        const slash = i > 0 ? " / " : ""
                        return slash + paraNivel(v.nivelEstudios)
                      })
                      //paraNivel(tramite.nivelAplica)
                    }
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{tramite.descripcion}</td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{tramite.clave}</td>
                    <td className="px-3 py-4 text-sm text-gray-500">{tramite.fechaInicialValidacion}</td>
                    {/*<td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {person.name}</span>
                      </a>
                    </td>*/}
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