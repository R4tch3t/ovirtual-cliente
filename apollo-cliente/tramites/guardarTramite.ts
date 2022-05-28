import client from "..";
import { gql } from "@apollo/client";

type Mutation = {
    guardarTramite: boolean
}

export interface TramiteAlumnoInput{
    tramiteId: number;   
    plesxurRef: number;
    userAlumnoId: number;
    matricula: string;
    datosTramite: string;
}

export const guardarTramiteGQL = async (tramite:TramiteAlumnoInput) => {
    const { data } = await client.mutate<Mutation>({
        variables:{tramite},
        mutation: gql`
            mutation GuardarTramite($tramite: TramiteAlumnoInput!) {
                guardarTramite(tramite: $tramite)
            }
        `,
      });
      
      return data?.guardarTramite
}