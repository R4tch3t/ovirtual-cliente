import { FC } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid'
import { useTramitesContext } from '../../../context/tramites/TramitesContext';
import { TypePais } from '../../../interfaces';
import { Paso1, Paso2, Paso3, Paso4, Paso5 } from './formulario';
import { validarFormulario1 } from './formulario/paso1/helper';
import { validarFormulario2 } from './formulario/paso2/helper';
import { validarFormulario3 } from './formulario/paso3/helper';
import { types } from '../../../types/tramites';
import { validarFormulario4 } from './formulario/paso4/helper';
import { validarFormulario5 } from './formulario/paso5/helper';
import Fade from '@mui/material/Fade';
type Props = {
  paises: TypePais[]
}

const PasosHomologacion:FC<Props> = ({paises}) => {
  const {tramitesState, dispatch} = useTramitesContext()
  const {planElegido, localidad, paso1, paso2, paso3, paso4, paso5} = tramitesState.procedimientos.homologacion!
  const atras = (i: number) => {
    
  const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5']
  const nombreCampo='completo';
    pasos.map((paso)=>{
      dispatch({
        type: types.cambiarPaso,
        payload: {nombrePaso: paso,nombreCampo,valorCampo: false}
      });
    })
    navegarPaso(i)
}

  const navegarPaso = (count: number) => {
    const pasos = ['paso1', 'paso2', 'paso3', 'paso4', 'paso5']

    const nombreCampo='completo';
    let i = 0
    while(i<count-1){
      const paso = pasos[i]
      dispatch({
        type: types.cambiarPaso,
        payload: {nombrePaso: paso,nombreCampo,valorCampo: true}
      });
      i++;
    }
    
    dispatch({
      type: types.cambiarPaso,
      payload: {nombrePaso: pasos[i], nombreCampo,valorCampo: false}
    });

}

  const steps = [
    { id: 'PASO 1', name: 'Datos generales', href: undefined, 
    validarPaso: validarFormulario1(paso1!),
    atras:()=>{ atras(1)  }, 
    status: (paso1 !== null && paso1.completo) ?  'complete' : 'current' },
    { id: 'PASO 2', name: 'Domicilio', href: undefined, 
    validarPaso: validarFormulario2(paso2!),
    atras:()=>{ atras(2)  }, 
    siguiente:()=>{ navegarPaso(2)  },
    status: (paso2 !== null && paso2.completo) && paso1?.completo ?  'complete' : (paso1?.completo?'current' : 'upcoming') },
    { id: 'PASO 3', name: 'Multiculturalidad', href: undefined,
    validarPaso: validarFormulario3(paso3!),
    atras:()=>{ atras(3)  }, 
    siguiente:()=>{ navegarPaso(3)  },
    status: (paso3 !== null && paso3.completo) && paso2?.completo && paso1?.completo ?  'complete' : 
    ((paso2?.completo&&paso1?.completo)?'current' : 'upcoming') },
    { id: 'PASO 4', name: 'Datos escolares', href: undefined,
    validarPaso: validarFormulario4(paso4!),
    atras:()=>{ atras(4)  }, 
    siguiente:()=>{ navegarPaso(4)  },
    status: (paso4 !== null && paso4.completo) && paso3?.completo && paso2?.completo && paso1?.completo ?  'complete' : 
    ((paso3?.completo&&paso2?.completo&&paso1?.completo)?'current' : 'upcoming') },
    { id: 'PASO 5', name: 'Datos socioeconómicos', href: undefined,
    validarPaso: validarFormulario5(paso5!),
    atras:()=>{ atras(5)  }, 
    siguiente:()=>{ navegarPaso(5)  },
    status: (paso5 !== null && paso5.completo) && paso4?.completo && paso3?.completo && paso2?.completo && paso1?.completo ?  'complete' : 
    ((paso4?.completo&&paso3?.completo&&paso2?.completo&&paso1?.completo)?'current' : 'upcoming') },
  ]
  
  return (
    <div>
      <h1  style={{textAlign: 'center'}} className="text-lg font-medium">
        <p className="mt-2 text-xl text-gray-500">
          PLAN ELEGIDO: <b> {planElegido} </b>
        </p>

        <span className="mt-2 text-xl text-gray-500">
          <b> ({localidad}) </b>
        </span>

        <p className="mt-2 text-gray-500">
          Complete cuidadosamente la información que le es requerida en cada paso.
        </p>
        
      </h1>
      <nav aria-label="Progress" className='homoSteps'>
        <ol role="list" className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex-1 md:flex mg-b-0">
              {step.status === 'complete' ? (
                <a href={step.href} onMouseDown={step.atras} className="group flex items-center w-full">
                  <span className="px-6 py-4 flex items-center text-sm font-medium">
                    <span className={`flex-shrink-0 w-16 h-10 flex items-center justify-center bg-${step.validarPaso?'indigo-600':'red-500'} rounded-full group-hover:bg-${step.validarPaso?'indigo-800':'red-600'}`}>
                      {step.validarPaso&&<CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />}
                      {!step.validarPaso&&<XIcon className="w-6 h-6 text-white" aria-hidden="true" />}
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
                {((paso1 !== null && !paso1.completo) || paso1 === null ) && 
                  <Fade in={true}>
                    <div>
                      <Paso1 paises={paises} /> 
                    </div>
                  </Fade>
                }
                {((paso2 !== null && !paso2.completo) || paso2 === null ) && paso1?.completo===true && 
                  <Fade in={true}>
                    <div>
                      <Paso2 />
                    </div>
                  </Fade> 
                }
                {((paso3 !== null && !paso3.completo) || paso3 === null ) && paso1?.completo===true && paso2?.completo===true && 
                  <Fade in={true}>
                    <div>
                      <Paso3 />
                    </div>
                  </Fade> 
                }
                {((paso4 !== null && !paso4.completo) || paso4 === null ) && paso1?.completo===true && paso2?.completo===true 
                  && paso3?.completo===true && 
                  <Fade in={true}>
                    <div>
                      <Paso4 />
                    </div>
                  </Fade> 
                }
                {/*((paso5 !== null && !paso5.completo) || paso5 === null ) &&*/ paso1?.completo===true && paso2?.completo===true 
                  && paso3?.completo===true && paso4?.completo===true && 
                  <Fade in={true}>
                    <div>
                      <Paso5 />
                    </div>
                  </Fade>
                }
          </div>

      </div>
  )
}

export {PasosHomologacion}