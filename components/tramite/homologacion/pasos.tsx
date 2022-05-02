import { FC } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { TypePais } from '../../../interfaces';
import { Paso1, Paso2 } from './formulario';
import { validarFormulario1 } from './formulario/paso1/helper';
import { types } from '../../../types/tramites';
type Props = {
  paises: TypePais[]
}

const PasosHomologacion:FC<Props> = ({paises}) => {
  const {tramitesState, dispatch} = useTramitesContext()
  const {planElegido, localidad, paso1, paso2} = tramitesState.procedimientos.homologacion!
  const cambiarPaso = (nombrePaso:string, valorCampo: boolean) => {
      //const nombrePaso='paso1';

      const pasos = ['paso1', 'paso2']

      // set undefined
      const nombreCampo='completo';

      pasos.map((paso)=>{

        //const valorCampo=undefined

        dispatch({
            type: types.cambiarPaso,
            payload: {nombrePaso: paso,nombreCampo,valorCampo: valorCampo?false:undefined}
        });  
      })
      
      
      //const valorCampo=false

      dispatch({
          type: types.cambiarPaso,
          payload: {nombrePaso,nombreCampo,valorCampo}
      });
  }
  const steps = [
    { id: 'PASO 1', name: 'Datos generales', href: undefined, 
    atras:()=>{ cambiarPaso('paso1', false)  }, 
    status: (paso1 !== null && paso1.completo) ?  'complete' : 'current' },
    { id: 'PASO 2', name: 'Domicilio', href: undefined, 
    siguiente:()=>{ cambiarPaso('paso1', true)  },
    status: (paso2 !== null && paso2.completo) && paso1?.completo ?  'complete' : (paso1?.completo?'current' : 'upcoming') },
    { id: 'PASO 3', name: 'Multiculturalidad', href: '#', status: 'upcoming' },
    { id: 'PASO 4', name: 'Datos escolares', href: '#', status: 'upcoming' },
    { id: 'PASO 5', name: 'Datos socioeconómicos', href: '#', status: 'upcoming' },
  ]
  const validoPaso1 = validarFormulario1()
  return (
    <div>
      <h3  style={{textAlign: 'center'}} className="text-lg font-medium">
        <p className="mt-2 text-gray-500">
          PLAN ELEGIDO: <b> {planElegido} </b>
        </p>

        <span className="mt-2 text-gray-500">
          <b> ({localidad}) </b>
        </span>

        <p className="mt-2 text-sm text-gray-500">
          Complete cuidadosamente la información que le es requerida en cada paso.
        </p>
        
      </h3>
      <nav aria-label="Progress" className='homoSteps'>
        <ol role="list" className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex-1 md:flex mg-b-0">
              {step.status === 'complete' ? (
                <a href={step.href} onMouseDown={step.atras} className="group flex items-center w-full">
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className={`flex-shrink-0 w-16 h-10 flex items-center justify-center bg-${validoPaso1?'indigo-600':'red-500'} rounded-full group-hover:bg-${validoPaso1?'indigo-800':'red-600'}`}>
                      {validoPaso1&&<CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />}
                      {!validoPaso1&&<XIcon className="w-6 h-6 text-white" aria-hidden="true" />}
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                  </span>
                </a>
              ) : step.status === 'current' ? (
                <a href={step.href} className="px-6 py-4 flex items-center text-sm font-medium" aria-current="step">
                  <span className="flex-shrink-0 w-16 h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                </a>
              ) : (
                <a href={step.href} onMouseDown={step.siguiente} className="group flex items-center">
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className="flex-shrink-0 w-16 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
          <div className='homoSteps' >
                {((paso1 !== null && !paso1.completo) || paso1 === null ) && <Paso1 paises={paises} /> }
                {((paso2 !== null && !paso2.completo) || paso2 === null ) && paso1?.completo===true && 
                  <Paso2 paises={paises} /> 
                }
          </div>

      </div>
  )
}

export {PasosHomologacion}