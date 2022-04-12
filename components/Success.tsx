import { CheckCircleIcon, XIcon } from '@heroicons/react/solid'

export default function Success({s, setSLog}:any) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-800">Éxito</h3>
          <div className="mt-2 text-sm text-green-700">

            {s&&s.map((v:any,i:any)=>{
                return <p key={i} > {v} </p> 
            })}
            
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                
                onMouseUp={()=>{
                   // document.location="login"
                }}
                className="bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
               <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">   
                    Login
                </a>
              </button>
              <button
                type="button"
                onMouseUp={()=>{
                    setSLog({band: false});
                }}
                className="ml-3 bg-green-50 px-2 py-1.5 rounded-md text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                Cerrar
              </button>
            </div>
          </div>
          </div>

          <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onMouseUp={()=>{
                    setSLog({band: false});
                  }}
                  className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
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