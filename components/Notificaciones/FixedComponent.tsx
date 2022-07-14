import { FC } from "react"

export const Notificacion:FC = ({children}) => {
    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
            style={{zIndex: 999999}}
        >
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {children}
            </div>
        </div>
    )
}