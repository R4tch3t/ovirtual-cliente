import client from "..";
import { gql } from "@apollo/client";

interface Mutation {
    bajarDocumento: {
        respSubirDocumento: boolean,
        documento: TipoDocumento;
        finalizado: boolean;
        msg: string|null,
    }
}

type TipoAlumno = {
    id: number;
    expedienteId: number|null;
    buffer: number;
}

type TipoDocumento = {
    bajando: number,
    buffer: number,
    part64: string,
}

export const bajarDocumentoGQL = async (alumno:TipoAlumno) => {
    const { data } = await client.mutate<Mutation>({
        variables:{alumno},
        mutation: gql`
            mutation BajarDocumento($alumno: DownAlumno) {
                bajarDocumento(alumno: $alumno) {
                    respBajarDocumento
                    documento {
                        bajando
                        buffer
                        part64
                    }
                    finalizado
                    msg
                }
            }
        `,
      });
      
      return data?.bajarDocumento
}