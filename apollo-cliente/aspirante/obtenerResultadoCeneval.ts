import client from "..";
import { gql } from "@apollo/client";

interface Query {
    consultaResultadoCeneval: {
        respResultadoCeneval: boolean,
        resultadoCeneval: TipoResultadoCeneval[] | null,
        msg: string|null,        
    }
}

type InputRegistroCeneval = {
    folio: number
    autorizado: number
}

export type TipoResultadoCeneval = {
    folio: number;
    tipoExa: string | null;
    apli: string | null;
    fechaApli: Date | null;
    cveInst: string | null;
    identifica: string | null;
    anoVer: number;
    autorizado: number;
    curp: string | null;
    nombre: string | null;
    diaNac: string | null;
    mesNac: string | null;
    anoNac: string | null;
    edoCiv: number;
    posUsu: number;
    icne: string | null;
    percen: number;
    porcence: number;
    nomasp: string | null;
    apeunoasp: string | null;
    apedosasp: string | null;
    cveentesc: string | null;
    cveplnest: string | null;
    vrsplnest: string | null;
    fecsys: Date | null;
    osuser: string | null;
    cveentescMov: string | null;
    cveplnestMov: string | null;
    vrsplnestMov: string | null;
    autorizadoback: number;
    plesxures: number;
    idusuaior: number;
}


export const consultaResultadoCenevalGQL = async (registroCeneval:InputRegistroCeneval) => {
    const { data } = await client.query<Query>({
        variables:{registroCeneval},
        query: gql`
          query ConsultaResultadoCeneval($registroCeneval: InputRegistroCeneval!) {
            consultaResultadoCeneval(registroCeneval: $registroCeneval) {
                respResultadoCeneval
                resultadoCeneval {
                    folio
                    tipoExa
                    apli
                    curp
                    fechaApli
                    cveInst
                    anoVer
                    identifica
                    autorizado
                    nombre
                    diaNac
                    mesNac
                    anoNac
                    edoCiv
                    posUsu
                    icne
                    percen
                    porcence
                    plesxures
                    idusuaior
                    autorizadoback
                    vrsplnestMov
                    cveplnestMov
                    cveentescMov
                    osuser
                    fecsys
                    vrsplnest
                    cveplnest
                    cveentesc
                    apedosasp
                    apeunoasp
                    nomasp
                }
                msg
            }
}
        `,
      });
      
      return data.consultaResultadoCeneval
}