import { ExclamationIcon } from '@heroicons/react/solid'

export default function Warning({msg}:any) {
  return (
    <div className="rounded-md bg-yellow-50 border-l-4 border-yellow-400 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
              {msg}
            {/*You have no credits left.{' '}
            <a href="#" className="font-medium underline text-yellow-700 hover:text-yellow-600">
              Upgrade your account to add more credits.
            </a>*/}
          </p>
        </div>
      </div>
    </div>
  )
}