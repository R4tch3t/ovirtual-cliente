import client from "..";
import { gql } from "@apollo/client";
interface Query {
    necesarioCambiarPass: {
        respNecesarioCambiarPass: boolean;
        msg: string;
    }
}


export const necesarioCambiarPassGQL = async (id:number) => {
    const { data } = await client.query<Query>({
        variables:{id},
        query: gql`
          query NecesarioCambiarPass($id: Int) {
            necesarioCambiarPass(id: $id) {
                respNecesarioCambiarPass
                msg
            }
        }
        `,
      });
      
      return data.necesarioCambiarPass
}