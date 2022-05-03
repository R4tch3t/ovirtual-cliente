import client from "..";
import { gql } from "@apollo/client";

const Paises = async () => {
    const { data } = await client.query({
        query: gql`
          query Paises {
            paises {
                id
                abreviatura
                nombrePais
            }
        }
        `,
    });
      return data.paises
}

export {Paises}