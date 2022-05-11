
import { useMutation, gql } from "@apollo/client";

export type TipoAspirante = {
    paisId: number | null | undefined;
    curp: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string | null;
    telefonoCelular: string;
    telefonoParticular: string | null;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    correoElectronico: string;
    estado: number;
    nacionalidad: string;
}

export type TipoAspRegistro = {
    aspiranteId: number | undefined | null;
    planOfertadoId: number;
    nivelIngresar: number;
    egresadoUagro: number | null;
    claveEscuelaUagro: string | null;
    nombreEscuelaProcedencia: string | null;
    matricula: string | null;
    claveUnicaRegistro: string | undefined | null;
    ciclo: number | null;
    consecutivoPlesxures: number | null;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    cancelado: number;
    folioCeneval: number | null;
    estado: number;
    referencia: string | null;
}

export type TipoAspDomiciliario = {
    aspiranteIdId: number | null;
    localityId: number;
    calleActual: string;
    numExteriorActual: string;
    numInteriorActual: string | null;
    coloniaActual: string;
    codigoPostalActual: number;
}

export type TipoAspMulticulturalidad = {
    puebloOriginarioIdId: number | null;
    discapacidadIdId: number | null;
    aspiranteIdId: number | null;
    pertenecePuebloOriginario: number;
    tieneDiscapacidad: number;
    afroMexicanoGuerrerense: number;
    residenteSierraGuerrero: number;
    hijoMigranteGuerrerense: number;
}

export type TipoAspSocioEconomicos = {
    
    aspiranteIdId: number;
    tipoEmpleoMadre: number;
    tipoEmpleoPadre: number;
    promedioIngresoMensual: number;
    porcentajeIngresoGastoFam: number | null;
    porcentajeFamIngresosMens: number | null;
    gastoPersonalSemanal: number;
    trabaja: number;
}

interface Mutation {
    nuevoAsp: boolean
}

const NUEVOASPQUERY = gql`
    mutation NuevoAsp($asp: AspiranteInput, $aspReg: AspRegistroInput, $aspDomi: AspDomiciliarioInput, $aspMulti: AspMulticulturalidadInput, $aspSocioEco: AspSocioEconomicosInput) {
        nuevoAsp(asp: $asp, aspReg: $aspReg, aspDomi: $aspDomi, aspMulti: $aspMulti, aspSocioEco: $aspSocioEco)
    }
`;

const useNuevoAsp = () => {
    return useMutation<Mutation>(NUEVOASPQUERY);
}

export {useNuevoAsp}