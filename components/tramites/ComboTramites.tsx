import { useState } from 'react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { Combobox } from '@headlessui/react'
import { Loading } from '@nextui-org/react'
import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { TypeCatTramite } from '../../interfaces'
import { cambiarValorCombo } from './helper'

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
  const {catTramites, catSeleccionado} = tramitesState
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const tramiteFiltrado =
    query === ''
      ? catTramites
      : catTramites?.filter((servicio) => {
          return servicio.nombre.toLowerCase().includes(query.toLowerCase())
      })

   const onChange = (value:any) => {
    cambiarValorCombo(value,dispatch)
   }

  return (
    <Combobox as="div" value={catSeleccionado} onChange={onChange}  >
      <Combobox.Label className="block text-sm font-medium text-gray-700">Selecciona una categoría para los trámites</Combobox.Label>
      <div className="relative mt-1"  >
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(CatTramite:TypeCatTramite) => CatTramite.nombre}
        />
        <Combobox.Button className={`absolute ${!focused?'w-full':'w-full'} inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none`}>
          <SelectorIcon className="h-5 w-5 text-gray-400 absolute right-0" aria-hidden="true" />
        </Combobox.Button>
          
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
                                              
                      <span className={classNames('ml-3 truncate', selected && 'font-semibold')}>
                        {servicio.nombre}
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