import client from "..";
import { gql } from "@apollo/client";

interface Query {
    consultaAspCURP: {
        respAspCurp: boolean,
        resultadoAspRegistro: TipoResultadoAspRegistro | null,
        CURP: string|null,
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
    ASPIRANTE_ESTADO: number;
    ESTADO: string
    NOMBRE: string
    CURP: string
    ID_PLAN: number
    UA: string
    PLANESTUDIOS: string
    CLAVE_UNICA_REGISTRO: string
    FOLIO_CENEVAL: number
    MATRICULA: string
    ID_REGISTRO: number
    PERTENECE_PUEBLO_ORIGINARIO: string
    TIENE_DISCAPACIDAD: string
    AFRO_MEXICANO_GUERRERENSE: string
    RESIDENTE_SIERRA_GUERRERO: string
    HIJO_MIGRANTE_GUERRERENSE: string
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
                    ASPIRANTE_ESTADO
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
                    PERTENECE_PUEBLO_ORIGINARIO
                    TIENE_DISCAPACIDAD
                    AFRO_MEXICANO_GUERRERENSE
                    RESIDENTE_SIERRA_GUERRERO
                    HIJO_MIGRANTE_GUERRERENSE
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
                CURP
            }
        }
        `,
      });
      
      return data.consultaAspCURP
}