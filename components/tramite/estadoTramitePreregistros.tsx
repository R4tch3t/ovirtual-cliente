import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid"
import { FC } from "react"


type Props = {
  estadoId: number 
}
const EstadoTramite:FC<Props> = ({estadoId}) => {

  const steps = [
    { id: '01', name: 'Iniciado', description: 'Estado inicial del trámite.', href: undefined, 
      status: estadoId>1?'complete':(estadoId===1?'current':'upcoming') },
    { id: '02', name: 'En revisión', description: 'El trámite está siendo revisado.', href: undefined, 
      status: estadoId>2?'complete':(estadoId===2?'current':'upcoming') },
    { id: '03', name: 'Validación', description: 'El trámite se encuentra en validación.', href: undefined, 
      status: estadoId>3?'complete':(estadoId===3?'current':'upcoming') },
    { id: '04', name: 'Correción', description: 'El trámite es enviado a correción.', href: undefined, 
      status: (estadoId>4&&estadoId!==8)?'complete':((estadoId===4||estadoId===8)?'current':'upcoming') },
    { id: '05', name: 'Aprobado', description: 'El trámite a sido aprobado.', href: undefined, 
      status: (estadoId>5&&estadoId!==8)?'complete':(estadoId===5?'current':'upcoming') },
    { id: '06', name: 'Finalizado', description: 'El trámite ha finalizado.', href: undefined, 
      status: (estadoId>6&&estadoId!==8)?'complete':(estadoId===6?'current':'upcoming') },
    { id: '07', name: 'Cancelado', description: 'El trámite ha sido cancelado.', href: undefined, 
      status: (estadoId>7&&estadoId!==8)?'complete':(estadoId===7?'current':'upcoming') },
    { id: '08', name: 'Enviado a la Escuela', description: 'El trámite ha sido enviado a la escuela.', href: undefined, 
      status: (estadoId>9)?'complete':(estadoId===9?'current':'upcoming') },
    { id: '09', name: 'Aprobado por la Escuela', description: 'El trámite ha sido aprobado por la escuela.', href: undefined, 
      status: (estadoId>10)?'complete':(estadoId===10?'current':'upcoming') },
    { id: '10', name: 'Rechazado por la Escuela', description: 'El trámite ha sido rechazado por la escuela.', href: undefined, 
      status: (estadoId>11)?'complete':(estadoId===11?'current':'upcoming') },
    { id: '11', name: 'Finalizado por la Escuela', description: 'El trámite ha sido finalizado por la escuela.', href: undefined, 
      status: (estadoId>12)?'complete':(estadoId===12?'current':'upcoming') },
  ]

    return (
        <>
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
            {steps.map((step) => (
              <li key={step.name} className="md:flex-1">
                {step.status === 'complete' ? (
                  <a
                    href={step.href}
                    className={`group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
                  >
                    <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                      {step.id}
                    </span>
                    <span className="text-xs font-medium">{step.name}</span>
                  </a>
                ) : step.status === 'current' ? (
                  <a
                    href={step.href}
                    className={`pl-4 py-2 flex flex-col border-l-4 
                      ${(estadoId===4||estadoId===8)?'border-yellow-500':
                      ((estadoId===5||estadoId===6)?'border-green-600':
                      estadoId===7?'border-red-600':'border-indigo-600')} 
                      md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4`}
                    aria-current="step"
                  >
                    { (estadoId===4||estadoId===8) &&
                      <ExclamationIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                    }
                    { (estadoId===7) &&
                      <ExclamationIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
                    }
                    { (estadoId===5 || estadoId===6) &&
                      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    }
                    <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">{step.id}</span>
                    <span className="text-xs font-medium">{step.name}</span>
                  </a>
                ) : (
                  <a
                    href={step.href}
                    className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                  >
                    <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                      {step.id}
                    </span>
                    <span className="text-xs font-medium">{step.name}</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div style={{height: 30}} />
        </>
      )
  }

  export default EstadoTramite