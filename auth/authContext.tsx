import { useContext } from "react";
import { AuthProvider, AuthContext } from './provider'

export default AuthProvider

export function useAppContext() {
    return useContext(AuthContext);
} 