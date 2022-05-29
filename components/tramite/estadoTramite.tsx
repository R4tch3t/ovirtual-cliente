const steps = [
    { id: '01', name: 'Iniciado', description: 'Estado inicial del trámite.', href: '#', status: 'complete' },
    { id: '02', name: 'En revisión', description: 'El trámite está siendo revisado.', href: '#', status: 'current' },
    { id: '03', name: 'Validación', description: 'El trámite se encuentra en validación.', href: '#', status: 'upcoming' },
    { id: '04', name: 'Correción', description: 'El trámite es enviado a correción.', href: '#', status: 'upcoming' },
    { id: '05', name: 'Aprobado', description: 'El trámite a sido aprobado.', href: '#', status: 'upcoming' },
    { id: '06', name: 'Finalizado', description: 'El trámite ha finalizado.', href: '#', status: 'upcoming' },
    { id: '07', name: 'Cancelado', description: 'El trámite a sido cancelado.', href: '#', status: 'upcoming' },
  ]
  
  export default function EstadoTramite() {

    return (
        <>
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
            {steps.map((step) => (
              <li key={step.name} className="md:flex-1">
                {step.status === 'complete' ? (
                  <a
                    href={step.href}
                    className="group pl-4 py-2 flex flex-col border-l-4 border-indigo-600 hover:border-indigo-800 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                  >
                    <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase group-hover:text-indigo-800">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </a>
                ) : step.status === 'current' ? (
                  <a
                    href={step.href}
                    className="pl-4 py-2 flex flex-col border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                    aria-current="step"
                  >
                    <span className="text-xs text-indigo-600 font-semibold tracking-wide uppercase">{step.id}</span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </a>
                ) : (
                  <a
                    href={step.href}
                    className="group pl-4 py-2 flex flex-col border-l-4 border-gray-200 hover:border-gray-300 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4"
                  >
                    <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase group-hover:text-gray-700">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
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