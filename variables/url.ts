/*const url = "http://localhost:3000/graphql";
const urlApi = "http://localhost:3000/api";
const urlBase = "http://localhost:3001/";
const urlSocket = "http://localhost:3000/";
*/
//URLS DE RESPUESTA DEL SERVIDOR Y URL BASE DEL CLIENTE
/*const url = "http://10.1.9.28:3000/graphql";
const urlApi = "http://10.1.9.28:3000/api";
const urlSocket = "http://10.1.9.28:3000/";
const urlBase = "http://10.1.9.28:3001/";*/

//API relative url
const server = "http://localhost:3000/"

const url = `${server}graphql`;
const urlApi = `${server}api`//process.env.URL_API//process.env.API_URL?.toString()+"api"//"http://localhost:3000/api"//`${process.env.API_URL}api`;
const urlBase = "http://localhost:3001/";
const urlSocket = server;

export {url,urlApi,urlBase,urlSocket}