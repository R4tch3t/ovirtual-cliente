import client, { TipoUsuario } from "..";
import { gql } from "@apollo/client";

interface Mutation {
    upRead: boolean
}



export const upReadGQL = async (de: number, para: number) => {
    const { data } = await client.mutate<Mutation>({
        variables:{de,para},
        mutation: gql`
            mutation UpRead($de: Int, $para: Int) {
                upRead(de: $de, para: $para)
            }
        `,
      });
      
      return data?.upRead
}