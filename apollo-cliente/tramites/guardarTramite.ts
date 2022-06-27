import client from "..";
import { gql } from "@apollo/client";

type Mutation = {
    guardarTramite: boolean
    estadoRevision: boolean
}

export interface TramiteAlumnoInput{
    tramiteId: number;   
    plesxurRef: number;
    userAlumnoId: number;
    email: string;
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

export const estadoRevisionGQL = async (tramiteId:number) => {
    const { data } = await client.mutate<Mutation>({
        variables:{tramiteId},
        mutation: gql`
            mutation EstadoRevision($tramiteId: Int!) {
                estadoRevision(tramiteId: $tramiteId)
            }
        `,
    });
      
      return data?.estadoRevision
}