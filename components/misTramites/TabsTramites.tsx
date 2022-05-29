import { useTramitesContext } from '../../context/tramites/TramitesContext'
import { types } from '../../types/tramites'
import { ComboTramites } from './ComboTramites'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}


const TabsTramites = () => {
  const {tramitesState,dispatch} = useTramitesContext();
  const {catTramites, catSeleccionado} = tramitesState
  
   const cambiarValorCombo = (value:any) => {
     switch(value.id){
      case 1:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 0, ttb: 4}
        });
         break
      case 2:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 3, ttb: 5}
        });
          break
      case 3:
        dispatch({
          type: types.cargarTramites,
          payload: {tramites: null, tta: 4, ttb: 6}
        });
          break
     }
    dispatch({
      type: types.catSeleccionado,
      payload: value
    });
   }

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
                onMouseDown={()=>cambiarValorCombo(tab)}
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