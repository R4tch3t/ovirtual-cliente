import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { types } from '../../types/tramites'
import { ComboTramites } from './ComboTramites'
import { cambiarValorCombo } from './helper'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const TabsTramites = () => {
  const {tramitesState,dispatch} = useTramitesContext();
  const {catTramites, catSeleccionado} = tramitesState

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
                onMouseDown={()=>cambiarValorCombo(tab,dispatch)}
                className={classNames(
                  tab === catSeleccionado
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
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