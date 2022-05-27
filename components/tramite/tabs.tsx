import Link from "next/link"
import { FC } from "react"
import { TypeTramite } from "../../interfaces"

interface Props {
    tramite: TypeTramite,
    tabID: number
}

type TipoTabs = 
{
    name: string, 
    href: string , 
    current: boolean
}
  
function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const TramiteTabs: FC<Props> = ({tramite, tabID}) => {
    const tabs: TipoTabs[] = 
    [
      { name: 'Requisitos', href: `/tramite/${tramite.id}`, current: tabID===0 },
      { name: 'Modulos de atención', href: `/tramite/${tramite.id}/moduloAtencion`, current: tabID===1 },
      { name: 'Formatos para descargar', href: `/tramite/${tramite.id}/formatoDescargar`, current: tabID===2 },
      { name: 'Requisitos adicionales', href: `/tramite/${tramite.id}/reqAdicional`, current: tabID===3 },
      { name: 'Preguntas y respuestas', href: `/tramite/${tramite.id}/pregResp`, current: tabID===4 },
      { name: 'Costos', href: `/tramite/${tramite.id}/costos`, current: tabID===5 },
      { name: 'Procedimiento presencial', href: `/tramite/${tramite.id}/procedimientoPrecencial`, current: tabID===6 },
      { name: 'Procedimiento en línea', href: `/tramite/${tramite.id}/procedimientoLinea`, current: tabID===7 },
    ]
    
    return (    

        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
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
                            <Link 
                                key={tab.name}
                                href={tab.href} >
                                <a
                                    
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
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        </div>

      )
}

export {TramiteTabs}