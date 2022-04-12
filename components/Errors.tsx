import { XCircleIcon, XIcon  } from '@heroicons/react/solid'

export const Errors=({e, setELog}:any) => {
  const title = e&&e.length<2?"Se encontro el siguiente error en la consulta:":
    (`Se encontraron ${e.length} errores en la consulta`)
    /*<div className="rounded-md bg-red-50 p-4" style={{position: 'fixed', width: '100%'}} >*/
  
    return (
    <div className="rounded-md bg-red-50 p-4"  >
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800"> {title}  </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc pl-5 space-y-1">
                    {e&&e.map((v:any,i:any)=>{
                        return <li key={i} > {v} </li> 
                    })}
                </ul>
              </div>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onMouseUp={()=>{
                    setELog({band: false})
                  }}
                  className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                >
                  <span className="sr-only">Cerrar</span>
                  <XIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ()=>null