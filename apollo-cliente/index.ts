import { ApolloClient, InMemoryCache } from "@apollo/client";
import { url } from "../variables/url";

//Evitar error de certificados, ADVERTENCIA permitira interceptar datos entre cliente y servidor
//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    
});

export * from './tramites' 
export * from './login'

export default client;