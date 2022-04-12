import { useEffect, useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import { Loading } from '@nextui-org/react'
import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { fetchConToken } from '../../helpers/fetch'
import { types } from '../../types/tramites'
import { TypeTramite, TypeCatTramite } from '../../interfaces'

/*type TypeServicio = {
  id: number,
  nombre: string,
}
const servicios:TypeServicio[] = [
  {id: 1, nombre: 'MODALIDADES DE TITULACIÓN'},
  {id: 2, nombre: 'NIVEL SUPERIOR'},
  {id: 3, nombre: 'NIVEL MEDIO SUPERIOR'},
  {id: 4, nombre: 'OTROS TRÁMITES'}
]*/

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const Cargando = () => {
    return (
        <div className='w-full' style={{textAlign: 'center'}} >
            <Loading className="w-5 h-5" type="points-opacity" color="primary" size="sm" />
        </div>
    )
}

const ComboTramites = () => {
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
  
  
   /*const cargarTramites = async () => {
        console.log('cargando..?')
        setFocused(true)
        setMostrarCarga(true)
        //const headers={skip,take}
        if(!tramites){
          const resp = await fetchConToken(`tramites/todos`);
          
          dispatch({
              type: types.cargarTramites,
              payload: resp.tramites
          });
        }
        
        //event.target.onchange(event);    
        setMostrarCarga(false)
        //setQuery('')

   }
   
   const onBlur = () =>{
    setFocused(false);
    setMostrarCarga(false)
   }*/

   const cambiarValorCombo = (value:any) => {
    dispatch({
      type: types.catSeleccionado,
      payload: value
    });
   }

  return (
    <Combobox as="div" value={catSeleccionado} onChange={cambiarValorCombo}  >
      <Combobox.Label className="block text-sm font-medium text-gray-700">Selecciona una categoría para los trámites</Combobox.Label>
      <div className="relative mt-1"  >
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          
          //onFocus={cargarTramites}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(CatTramite:TypeCatTramite) => CatTramite.nombre}
          //value={servicios[0].nombre}
          //defaultValue={servicios[0].nombre}
          //onBlur={onBlur}
        />
                                          {/* ${!focused?'w-full':''} mejor edicion del input, pero perdida de la anchura del boton */}      
        <Combobox.Button className={`absolute ${!focused?'w-full':'w-full'} inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none`}>
          <SelectorIcon className="h-5 w-5 text-gray-400 absolute right-0" aria-hidden="true" />
        </Combobox.Button>
          {/*mostrarCarga &&
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          
            <div
              className={
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                   'text-gray-900'
                )
              }
            >
              
                <>
                  <div className="flex items-center">
                      <Cargando />
                  </div>


                </>
              
            </div>
          
        </div>*/
        }
        {(tramiteFiltrado&&tramiteFiltrado!.length > 0) && (
          <Combobox.Options  className="absolute z-999 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {tramiteFiltrado!.map((servicio) => (
              <Combobox.Option
                key={servicio.id}
                value={servicio}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                        
                      {/*<span
                        className={classNames(
                          'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                          tramite.necesitaValidacion===1 ? 'bg-green-400' : 'bg-gray-200'
                        )}
                        aria-hidden="true"
                      />*/}

                      <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>
                        {servicio.nombre}
                        {/*<span className="sr-only"> is {tramite.necesitaValidacion===1 ? 'online' : 'offline'}</span>*/}
                      </span>

                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}

                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  
  )
}

export {ComboTramites}