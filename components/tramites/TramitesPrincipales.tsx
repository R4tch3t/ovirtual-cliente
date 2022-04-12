import {
    ClipboardListIcon,
    IdentificationIcon,
    UserRemoveIcon,
    ThumbDownIcon,
    ClockIcon,
    PencilAltIcon,
    LibraryIcon
  } from '@heroicons/react/outline'
type TypeTramite={
    nombre: string,
    descripcion: string,
    icon: JSX.Element
}
const tramites:TypeTramite[] = [
    {
        nombre: 'Mis tramites',
        descripcion: 'Consulta tus tramites aquí.',
        icon: <ClipboardListIcon  className="h-6 w-6" aria-hidden="true" />
    },
    {
      nombre: 'Calificaciones',
      descripcion: 'Consulta tus calificaciones aquí.',
      icon: <PencilAltIcon className="h-6 w-6" aria-hidden="true" />
   
    },
    {
      nombre: 'Materias cursando',
      descripcion: 'Consulta tus materias aquí.',
      icon: 
          <>
              <LibraryIcon className="h-6 w-6" aria-hidden="true" />
          </>
    },
    {
        nombre: 'Reposición o nueva credencial',
        descripcion: 'Tramite para la reposición o solicitar una nueva credencial estudiantil.',
        icon: <IdentificationIcon className="h-6 w-6" aria-hidden="true" />
     
    },
    
    // More people...
  ]
  
  const TramitesPrincipales = () => {
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

            <div className="flex-1 min-w-0">
              <a href="#" className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">{tramite.nombre}</p>
                <p className="text-sm text-gray-500 truncate">{tramite.descripcion}</p>
              </a>
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