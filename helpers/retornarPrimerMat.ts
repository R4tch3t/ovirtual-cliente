export const retornarPrimerMat = (matricula: string) => {
    const primerMat = JSON?.parse!(matricula!)![0]!
    return primerMat.matricula
}