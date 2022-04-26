import { useState } from 'react'
import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { types } from '../../types/tramites'
import { TypeCatTramite } from '../../interfaces'
import { ComboTramites } from './ComboTramites'

type TipoTab = {
  name: string,href:string,current: boolean
}

const tabs:TipoTab[] = [
  { name: 'My Account', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const TabsTramites = () => {
  const {tramitesState,dispatch} = useTramitesContext();
  const {tramites, catTramites, catSeleccionado} = tramitesState
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
//  const [mostrarCarga, setMostrarCarga] = useState(false)
  //const [servicioActual, setServicioActual] = useState(catTramites![0])
  const tramiteFiltrado =
    query === ''
      ? catTramites
      : catTramites?.filter((servicio) => {
          return servicio.nombre.toLowerCase().includes(query.toLowerCase())
      })
  

   const cambiarValorCombo = (value:any) => {
     console.log('value ,', value)
     switch(value.id){
      case 1:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 0, ttb: 4}
        });
         break
      case 2:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 3, ttb: 5}
        });
          break
      case 3:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 4, ttb: 6}
        });
          break
     }
    dispatch({
      type: types.catSeleccionado,
      payload: value
    });
   }

   return (
    <div>
      <div className="sm:hidden">
        <ComboTramites />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {catTramites?.map((tab) => (
              <a
                key={tab.id}
                href={undefined}
                onMouseDown={()=>cambiarValorCombo(tab)}
                className={classNames(
                  tab === catSeleccionado
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                    //'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab === catSeleccionado ? 'page' : undefined}
              >
                {tab.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export {TabsTramites}