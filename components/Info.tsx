import { InformationCircleIcon } from '@heroicons/react/solid'
import {ArrowUpIcon, ArrowDownIcon} from '@heroicons/react/outline'
const Info = ({msg, bandUpArr, bandDownArr}:any) => {
    return (
        <div className="rounded-md bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">{msg}</p>
              <p className="mt-3 text-sm md:mt-0 md:ml-6">
                <a className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                {bandUpArr!==true&&!bandDownArr&&<span aria-hidden="true">&rarr;</span>}
                {bandUpArr===true&&<ArrowUpIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />}
                {bandDownArr===true&&<ArrowDownIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />}
                </a>
              </p>
            </div>
          </div>
        </div>
      )
}

export default Info