import Image from 'next/image'
import { FC, useState } from 'react'
import { useTramitesContext } from '../../../context/tramites/TramitesContext'
import { TypeUnidadesAcademicas } from '../../../interfaces'

import IconUni from '../../../public/iconUni.png'
import { types } from '../../../types/tramites'
import { SearchIcon } from '@heroicons/react/solid'
import Info from '../../Info'

type Props = {
  unidadesAcademicas: TypeUnidadesAcademicas[],
  tramiteId: number | null 
}

const icon = <Image
  placeholder='blur' 
  blurDataURL={IconUni.blurDataURL} src={IconUni} width={60} height={60} />
const colores = [
  {
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
  },
  {
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
  },
  {
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
  },
  {  
      iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50' },
  {
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
  },
  {
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
  },
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

const UnidadesAcademicas:FC<Props> = ({unidadesAcademicas, tramiteId}) => {
  const {dispatch}:any = useTramitesContext();
  let c = -1
  const y = new Date().getFullYear()
  const seleccionarPlan = (planID: number, planElegido: string, 
    nivelIngresar: number, tramiteId: number | null, localidad: string,
    ) => {
    dispatch({
      type: types.seleccionarPlan,
      payload: {
        planID, planElegido, nivelIngresar,
        tramiteId, localidad
      }
    });
  }
  const [query, setQuery] = useState('')
  const nacionalidadFiltrado =
    query === ''
      ? unidadesAcademicas
      : unidadesAcademicas?.filter((unidad) => {
          const queryToLow = query.toLowerCase()
          return unidad.nombrePlanEstudios.toLowerCase().includes(queryToLow) || 
            unidad.nombreUnidadAcademica.toLowerCase().includes(queryToLow)
      });
    return (
      <div>
        
          <h1  style={{textAlign: 'center'}} className="text-lg font-medium">
            {/*<p className="mt-2 text-xl text-gray-500">
              Proceso de Admisión de: <b> Especialidades, Maestrías y Doctorados. </b>
            </p>*/}

            <span className="mt-2 text-xl text-gray-500">
              {/*<b> {y + " - " +(y+1)}. </b>*/}
              <b> PREREGISTRO </b>
            </span>

            <p className="mt-2 text-gray-500">
              Elija la Unidad Académica y Plan de Estudios al que deseás ingresar:
            </p>
            
          </h1>

          <div className="relative mt-5 mb-5">
            <SearchIcon
                className="pointer-events-none absolute top-2.5 left-4 h-5 w-5 text-gray-900 text-opacity-40"
                aria-hidden="true"
            />
            <input                
                className="w-full py-2 pl-10 pr-3 border rounded-md leading-5 focus:text-gray-900 focus:bg-opacity-100 focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Buscar..."
                autoComplete='off'
                
                onChange={(event) => { 
                    setQuery(event.target.value)
                    
                }}
            />
          </div>

        <div className={`rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid 
                          sm:grid-cols-${nacionalidadFiltrado.length>2?3:(!nacionalidadFiltrado.length?1:nacionalidadFiltrado.length)} 
                            sm:gap-px`}>
          {!nacionalidadFiltrado.length &&           
            <Info msg={'No se encontró ningún dato...'}  />
          }
          {nacionalidadFiltrado.map((unidad, unidadIdx) => {
            c = colores.length-1 === c ? 0 : c+1
            return(
            <div
              key={unidad.id}
              onMouseDown={()=>{
                const {id, nivelPlanEstudios, localidad} = unidad;
                const planElegido = unidad.nombrePlanEstudios + " - " + unidad.nombreUnidadAcademica;
                seleccionarPlan(id, planElegido, nivelPlanEstudios, tramiteId, localidad) 
              }}
              className={classNames(
                unidadIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                unidadIdx === 1 ? 'sm:rounded-tr-lg' : '',
                unidadIdx === unidadesAcademicas.length - 2 ? 'sm:rounded-bl-lg' : '',
                unidadIdx === unidadesAcademicas.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
              )}
            >
              <div style={{textAlign: 'center'}} >
                <span
                  className={classNames(
                    colores[c].iconBackground,
                    colores[c].iconForeground,
                    'rounded-lg inline-flex p-3 ring-4 ring-white'
                  )}
                  
                >
                     {icon} 
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <a href={undefined} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {unidad.nombrePlanEstudios}
                  </a>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {unidad.nombreUnidadAcademica}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Ubicación: <b>{unidad.localidad}</b>
                </p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          )}
          
          )
        }
        </div>
      </div>
    )
}

export  {
    UnidadesAcademicas
}