import { useState } from "react"
import { TableTramite } from "./table"

type TipoTabs = 
{
    name: string, 
    href: string | undefined, 
    current: boolean
}

const Tabs: TipoTabs[] = [
    { name: 'Requisitos', href: undefined, current: true },
    { name: 'Modulos de atención', href: undefined, current: false },
    { name: 'Formatos para descargar', href: undefined, current: false },
    { name: 'Requisitos adicionales', href: undefined, current: false },
    { name: 'Preguntas y respuestas', href: undefined, current: false },
    { name: 'Costos', href: undefined, current: false },
    { name: 'Procedimiento presencial', href: undefined, current: false },
    { name: 'Procedimiento en línea', href: undefined, current: false },
]
  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }

const TramiteTabs = () => {
    const [state, setState] = useState(
        {
            tabs: Tabs,
            table: {
                head: ['Documento', 'Descripción' ],
                body: [{'Documento': 'Documento1', 'Descripción': 'Descripcion1'}]
            } 
        })
    const {tabs}  = state
    const {head, body}  = state.table
    return (
        
        <div className="rounded-lg tramiteDiv bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-2 sm:grid sm:grid-cols-1 sm:gap-px">
            <div className='relative bg-white p-6' >

                <div>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                        Select a tab
                        </label>
                        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                        <select
                        id="tabs"
                        name="tabs"
                        className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                        defaultValue={tabs.find((tab) => tab.current)?.name}
                        >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                        </select>
                    </div>

                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                        <nav className="-mb-px flex" aria-label="Tabs">
                            {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                tab.current
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                            ))}
                        </nav>
                        </div>
                    </div>
                </div>
                <TableTramite head={head} body={body} />
            </div>
        </div>

      )
}

export {TramiteTabs}