import client from "..";
import { gql } from "@apollo/client";
interface Mutation {
    subirDocumento: {
        respSubirDocumento: boolean,
        documento: TipoDocumento;
        msg: string|null,
    }
}

type TipoAlumno = {
    id: number;
    expedienteId: number|null;
}

type TipoArchivo = {
    nombre: string;
    descripcion: string;
    tipoDocumentoId: number;
    base64: string | null;
}

type TipoDocumento = {
    id: number,
    nombre: string,
    descripcion: string,
    tipoDocumentoId: number,
    expedienteId: number,
    
}

export const subirDocumentoGQL = async (alumno:TipoAlumno,archivo:TipoArchivo) => {
    const { data } = await client.mutate<Mutation>({
        variables:{alumno, archivo},
        mutation: gql`
            mutation SubirDocumento($archivo: Archivo, $alumno: UserAlumno) {
                subirDocumento(archivo: $archivo, alumno: $alumno) {
                    respSubirDocumento
                    documento {
                        id
                        nombre
                        descripcion
                        tipoDocumentoId
                        expedienteId
                    }
                    msg
                }
            }
        `,
      });
      
      return data?.subirDocumento
}