import Link from "next/link"
import { FC } from "react"


interface TipoTable  {
    head: string[],
    body: any[]
}

const TableTramite: FC<TipoTable> = ({head, body}) => {
    let countB = 0;
    return (
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
                {head.map(
                    (v, i) => 
                        <th key={v}  scope="col" 
                            className={
                                i === 0 ? "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6":
                                "hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            } 
                        >
                            {v}
                        </th> 
                )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {body?.map((v,i) => {
                countB = 0;
            return (
              <Link key={i} href={`#`} >
                <tr  className='select-feed' >
                
                {head.map((h) => {
                    
                    if(countB>0){
                        return <td key={v[h] + i} className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                {v[h]}
                            </td>
                    }else{
                        countB++
                        return (
                            <td key={v[h] + i} 
                            className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6" >

                                {v[h]}

                                <dl className="font-normal lg:hidden">
                                <dt className="sr-only">head[countB]</dt>
                                <dd className="mt-1 truncate text-gray-700">
                                    {head[countB]}
                                </dd>
                                </dl>
                            </td>
                        )
                    }
                })}
                  
                </tr>
              </Link>
            )}
            
            )}
          </tbody>
        </table>
      </div>
    )
}

export { TableTramite }