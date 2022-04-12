import { useState } from "react"

const Input = ({l,v, email, pass, id}:any) => {
    const [value, setValue] = useState(v)
    const onChange=({target}:any)=>{
        const {value} = target
        setValue(value)
    }
    if(pass){
        return (
            <div className="inputTop" >
              
              <div className="mt-1">
                <input
                  type="password"
                  name={id}
                  id={id}
                  value={value}
                   onChange={onChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          )
    }else
    if(email){
        return (
            <div className="inputTop" >
              
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={value}
                   onChange={onChange}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
              </div>
            </div>
          )
    }else
    return (
        <div className="relative inputTop border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
          >
            {l}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={value}
            onChange={onChange}
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Jane Doe"
          />
        </div>
    )
}

export default Input