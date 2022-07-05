import client from "..";
import { gql } from "@apollo/client";
interface Mutation {
    setAvatar: {
        respSetAvatar: boolean,
    }
}

type UserAlumnoAvatar = {
    id: number;
}

type AvatarIn = {
    base64: string | null;
}


export const setAvatarGQL = async (alumno:UserAlumnoAvatar,archivo:AvatarIn) => {
    const { data } = await client.mutate<Mutation>({
        variables:{alumno, archivo},
        mutation: gql`
            mutation SetAvatar($archivo: AvatarIn, $alumno: UserAlumnoAvatar) {
                setAvatar(archivo: $archivo, alumno: $alumno) {
                    respSetAvatar
                }
            }
        `,
      });
      
      return data?.setAvatar
}