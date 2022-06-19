import client from "..";
import { gql } from "@apollo/client";

interface Query {
    consultaAspCURP: {
        respAspCurp: boolean,
        resultadoAspRegistro: TipoResultadoAspRegistro | null,
        msg: string|null,        
    }
}

type InputRegistroCeneval = {
    folio: number
    curp: string
}

export type TipoAspirante = {
    curp: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    telefonoCelular: string;
    correoElectronico: string;
}

export type TipoResultadoAspRegistro = {
    ID: number;
    ESTADO: string;
    CURP: string
    NOMBRE: string
    ID_PLAN: string
    UA: string
    PLANESTUDIOS: string
    CLAVE_UNICA_REGISTRO: string
    FOLIO_CENEVAL: number
    MATRICULA: string
    ID_REGISTRO: number
    PERTENECEPUEBLOORIGINARIO: string
    CALLE_ACTUAL: string
    NUM_EXTERIOR_ACTUAL: string
    NUM_INTERIOR_ACTUAL: string
    COLONIA_ACTUAL: string
    CODIGO_POSTAL_ACTUAL: number
    TELEFONO_CELULAR: string
    TELEFONO_PARTICULAR: string
    CORREO_ELECTRONICO: string
    NACIONALIDAD: string
    ASPREGISTRO_ID: number
    ZONA_ESCOLAR: number
    CLAVE_UNIDAD_ACADEMICA: string
    CLAVE_PLAN_ESTUDIOS: string
    VERSION_PLAN_ESTUDIOS: number
    STATUS: string
}


export const consultaAspCURPGQL = async (registroCeneval:InputRegistroCeneval) => {
    const { data } = await client.query<Query>({
        variables:{registroCeneval},
        query: gql`
          query ConsultaAspCURP($registroCeneval: InputAspCURP!) {
            consultaAspCURP(registroCeneval: $registroCeneval) {
                respAspCurp
                resultadoAspRegistro {
                    ID
                    ESTADO
                    CURP
                    NOMBRE
                    ID_PLAN
                    UA
                    PLANESTUDIOS
                    CLAVE_UNICA_REGISTRO
                    FOLIO_CENEVAL
                    MATRICULA
                    ID_REGISTRO
                    PERTENECEPUEBLOORIGINARIO
                    CALLE_ACTUAL
                    NUM_EXTERIOR_ACTUAL
                    NUM_INTERIOR_ACTUAL
                    COLONIA_ACTUAL
                    CODIGO_POSTAL_ACTUAL
                    TELEFONO_CELULAR
                    TELEFONO_PARTICULAR
                    CORREO_ELECTRONICO
                    NACIONALIDAD
                    ASPREGISTRO_ID
                    ZONA_ESCOLAR
                    CLAVE_UNIDAD_ACADEMICA
                    CLAVE_PLAN_ESTUDIOS
                    VERSION_PLAN_ESTUDIOS
                    STATUS
                }
                msg
            }
        }
        `,
      });
      
      return data.consultaAspCURP
}