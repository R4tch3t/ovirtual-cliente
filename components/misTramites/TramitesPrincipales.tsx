import {
    ClipboardListIcon,
    IdentificationIcon,
    PencilAltIcon,
    LibraryIcon
} from '@heroicons/react/outline'
import Link from 'next/link'
import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { types } from "../../types/tramites";

type TypeTramite={
    nombre: string,
    descripcion: string,
    icon: JSX.Element,
    href: string
}
const tramites:TypeTramite[] = [
    {
        nombre: 'Mis trámites',
        descripcion: 'Consulta tus tramites aquí.',
        icon: <ClipboardListIcon  className="h-6 w-6" aria-hidden="true" />,
        href: 'misTramites'
    },
    {
      nombre: 'Calificaciones',
      descripcion: 'Consulta tus calificaciones aquí.',
      icon: <PencilAltIcon className="h-6 w-6" aria-hidden="true" />,
      href: 'calificaciones'
    },
    {
      nombre: 'Materias cursando',
      descripcion: 'Consulta tus materias aquí.',
      icon: 
          <>
              <LibraryIcon className="h-6 w-6" aria-hidden="true" />
          </>,
      href: 'materiasCursando'
    },
    {
        nombre: 'Reposición o nueva credencial',
        descripcion: 'Tramite para la reposición o solicitar una nueva credencial estudiantil.',
        icon: <IdentificationIcon className="h-6 w-6" aria-hidden="true" />,
        href: 'nuevaCredencial'
    },
    
    // More people...
  ]
  
  const TramitesPrincipales = () => {
    const {dispatch} = useTramitesContext();
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {tramites.map((tramite,i) => (
          <div
            key={i}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div className="flex-shrink-0">
              {tramite.icon}
            </div>

            <div className="flex-1 min-w-0" onMouseDown={()=>{
                dispatch({
                  type: types.seleccionarTramiteAlumno,
                  payload: {tramiteId: null}
                });
            }} >
              {i<1 &&
                <a href={undefined} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{tramite.nombre}</p>
                  <p className="text-sm text-gray-500 truncate">{tramite.descripcion}</p>
                </a>
              }
              {i>0 &&
              <Link href={tramite.href}>
                <a href={undefined} className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">{tramite.nombre}</p>
                  <p className="text-sm text-gray-500 truncate">{tramite.descripcion}</p>
                </a>
              </Link>
              }

            </div>

          </div>
        ))}
      </div>
    )
  }

  export
  {
    TramitesPrincipales
  }