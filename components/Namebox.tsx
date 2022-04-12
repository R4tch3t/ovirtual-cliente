import type {NextPage} from 'next'

const Namebox: NextPage = () => {
    return (
        <div>
          <label htmlFor="name" className="ml-px pl-4 block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full"
              placeholder="Victor Santamaria"
              defaultValue={"Victor"}
            />
          </div>
        </div>
      )
}
export default Namebox