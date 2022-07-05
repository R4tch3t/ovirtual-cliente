import client from "..";
import { gql } from "@apollo/client";

interface Query {
    getAvatar: {
        respGetAvatar: boolean,
        avatar: TipoAvatar;
        finalizado: boolean;
    }
}

type TipoUser = {
    idUser: number;
    buffer: number;
}

type TipoAvatar = {
    bajando: number,
    buffer: number,
    part64: string,
}

export const getAvatarGQL = async (user:TipoUser) => {
    const { data } = await client.query<Query>({
        variables:{user},
        query: gql`
            query GetAvatar($user: user!) {
                getAvatar(user: $user) {
                    respGetAvatar
                    avatar {
                        bajando
                        buffer
                        part64
                    }
                    finalizado
                }
            }
        `,
      });
      
      return data?.getAvatar
}