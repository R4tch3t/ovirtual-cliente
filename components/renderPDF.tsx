import React, { FC } from "react";
import ReactDOM from 'react-dom';
import {
  PDFViewer,
  Page,
  Text,
  Document,
  Font,
  StyleSheet,
  View,
  Image
} from "@react-pdf/renderer";
const LogoH = "/headTramite.jpg";
const LogoF = "/footTramite.jpg";

const RobT = "/Typography/Roboto-Thin.ttf";
const Rob = "/Typography/Roboto-Italic.ttf";
const RobB = "/Typography/Roboto-Bold.ttf";
const RobBI = "/Typography/Roboto-Bold.ttf";

   
 Font.register({
  family: 'Roboto',
  format: "truetype",
  fonts: [{
    src: RobT,
    fontWeight: 'thin'
  },
  {
    src: Rob,
    fontStyle: 'italic'
  }, {
    src: RobB,
    fontWeight: 'bold'
  }, {
    src: RobBI,
    fontStyle: 'italic',
    fontWeight: 'bold'
 
  }]
  
});


interface Props {
  tramiteId?: number,
  titulo?: string,
  matricula?: string,
  nombre?: string,
  apellidos?:string,
  unidadAcademica?: string,
  planEstudios?: string,
  fechaCreacion?: Date,
  datosTramite?: string,
}
interface State extends Props{
  url: string | null,
  d: Date | null
}
const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
const nombreCampos:any = {
  'periodoLectivo':'Periodo Lectivo de la Baja:',
  'causaBaja': 'Causa de la Baja:'
}
const ReturnTable:FC<Props> = ({tramiteId, matricula,nombre,apellidos,unidadAcademica,planEstudios, datosTramite}) => {
  const splitApe = apellidos?.split('*')
  const primerApellido = splitApe![0]
  const segundoApellido = splitApe![1]
  const objectTramite = JSON.parse(datosTramite!)
  const keys = Object.keys(objectTramite)
  
  const styles = StyleSheet.create({
    headT: {
      fontFamily: "Roboto",
      fontWeight: 'thin'
    },
    headTB: {
      fontFamily: "Roboto",
      fontWeight: 'bold'
    },
    columnDirection: {
      position: 'absolute',
      top: 330,
      left: 15,
      transform: 'rotate(-90deg)'
    },
    table: { 
      display: "flex", 
      width: "90%", 
      left: 30,
      borderRadius: 50,
      borderStyle: "solid", 
      borderWidth: 1, 
    }, 
    tableRow: { 
      margin: "auto",
      height: 25, 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "10%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0, 
      borderBottomWidth: 0 
    },
    tableCol2: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0
    },
    tableCol3: {
      width: "65%",
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0
    },
    tableCell: { 
      marginLeft: 10, 
      marginTop: 2,
      marginBottom: 1,
      fontSize: 9,
      textAlign: 'left'
    },
    
    floatBorder: {
      position: 'absolute',
      left: '30%', 
      width: '69%',  
      borderBottomWidth: 0, 
      borderTopWidth: 1, 
      borderLeftWidth: 0, 
      borderRightWidth: 0
    }

  });
  return <>
      <View style={styles.columnDirection} >
                        
        <Text style={[styles.headTB,{fontSize: 11}]} >Datos del Alumno</Text>
        
      </View>
      
      <View style={styles.table}> 
        
        <View style={[styles.floatBorder,{top: 24}]} ></View>

        <View style={[styles.tableRow]}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Matrícula:</Text> 
          </View> 

          <View style={[styles.tableCol3, {borderRightWidth: 0, borderBottom: 0}]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{matricula}</Text> 
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Nombre:</Text> 
          </View> 

          <View style={[styles.tableCol3]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{nombre}</Text> 
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Primer Apellido:</Text> 
          </View> 

          <View style={[styles.tableCol3]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{primerApellido}</Text> 
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Segundo Apellido:</Text> 
          </View> 

          <View style={[styles.tableCol3]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{segundoApellido}</Text> 
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Unidad Académica:</Text> 
          </View> 

          <View style={[styles.tableCol3]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{unidadAcademica}</Text> 
          </View>
        </View>

        <View style={styles.tableRow}> 
          <View style={[styles.tableCol]}> 
              
          </View>
          
          <View style={[styles.tableCol2]}> 
            <Text style={[styles.tableCell,styles.headTB]}>Plan de estudios:</Text> 
          </View> 

          <View style={[styles.tableCol3]} >  
              <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{planEstudios}</Text> 
          </View>
        </View>

        {keys.map((k,i)=>{
          if(i===keys.length-2){
            return (
              <View key={k} style={styles.tableRow}> 
                <View style={[styles.tableCol]}> 
                    
                </View>
                
                <View style={[styles.tableCol2]}> 
                  <Text style={[styles.tableCell,styles.headTB]}>{nombreCampos[k]}</Text> 
                </View> 
      
                <View style={[styles.tableCol3, {borderBottomWidth: 0}]} >  
                    <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{objectTramite[k]}</Text> 
                </View>
              </View> 
            )
          }else if(i===keys.length-1) {
            return(
              <View key={k} style={styles.tableRow}> 
                <View style={[styles.tableCol, {borderBottomWidth: 0 }]}> 
                    
                </View>
                
                <View style={[styles.tableCol2, {borderBottomWidth: 0}]}> 
                  <Text style={[styles.tableCell,styles.headTB]}>{nombreCampos[k]}</Text> 
                </View> 

                <View style={[styles.tableCol3, {borderTopWidth: 0, borderBottomWidth: 0}]} >  
                    <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{objectTramite[k]}</Text> 
                </View>
              </View>
            )
          }else{
            <View key={k} style={styles.tableRow}> 
              <View style={[styles.tableCol]}> 
                  
              </View>
              
              <View style={[styles.tableCol2]}> 
                <Text style={[styles.tableCell,styles.headTB]}>{nombreCampos[k]}</Text> 
              </View> 
    
              <View style={[styles.tableCol3]} >  
                  <Text style={[styles.tableCell,styles.headT,{margin: 'auto'}]}>{objectTramite[k]}</Text> 
              </View>
            </View>
          }
        })}
        

        <View style={[styles.floatBorder,{bottom: 25}]} ></View>
      </View>
  </>
}

class RenderPDF extends React.Component<Props> {
  
  state:State = { url: null, d: null };
  constructor(props:Props){
    super(props);
    const d = new Date();
    this.state={
      url:null,
      d,
      tramiteId: props.tramiteId,
      titulo: props.titulo, 
      matricula: props.matricula,
      nombre: props.nombre,
      apellidos: props.apellidos,
      unidadAcademica: props.unidadAcademica,
      planEstudios: props.planEstudios,
      fechaCreacion: props.fechaCreacion,
      datosTramite: props.datosTramite
    }
  }

  onRender = async ({ blob }:any) => {
    const {titulo} = this.state!
    this.setState({ url: URL.createObjectURL(blob) });
    let pdfWindow = window!.open(this.state.url!)!;

    const downloadLink = document.createElement("a");

    downloadLink.href = this.state.url!;
    downloadLink.download = titulo!+'.pdf';
    downloadLink.click();
  };
 
  styles = StyleSheet.create({
    logoH: {
      position: "absolute",
      width: "100%",
      height: 100,
      
    },
    logoF: {
      position: "absolute",
      width: '100%',
      height: 100,
      bottom: 0
    },
    headV: {
      textAlign: 'center',
      margin: 100
    },
    headV2: {
      textAlign: 'left',
      marginTop: -100,
      marginLeft: 50
    },
    headV3: {
      textAlign: 'right',
      marginRight: 50
    },
    headT: {
      fontFamily: "Roboto",
      fontWeight: 'thin'
    },
    headTB: {
      fontFamily: "Roboto",
      fontWeight: 'bold'
    },
    midV: {
      textAlign: 'justify',
      marginLeft: 50,
      marginRight: 50
    },
    midV2: {
      textAlign: 'center',
      marginLeft: 50,
      marginRight: 50,
      marginTop: 5
    },
    headTI: {
      fontFamily: "Roboto",
      fontStyle: 'italic'
    },
    cajaFirma: {
      width: "100%",
      backgroundColor: 'gray',
      opacity: 0.70,
      height: 25,
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
      borderRightWidth: 0
    },
    footV: {
      textAlign: 'justify',
      marginTop: 10,
      marginLeft: 50,
      marginRight: 50
    },
    footVD: {
      position: 'absolute',
      bottom: 60,
      right: 120
    }
  });

  render() {
    const {
      tramiteId,
      titulo, matricula, nombre,
      apellidos,
      unidadAcademica, planEstudios,
      fechaCreacion,
      datosTramite
    } = this.state
   
    const d = this.state.d?.toLocaleDateString()
    
    return (
      
                 <div> 

                  <PDFViewer style={{ width: 0, height: 0 }}  >
                  <Document  onRender={this.onRender} title={`${titulo}.pdf`} >
                    <Page size="LETTER" wrap>
                    <Image src={LogoH}  style={this.styles.logoH} />
                      {/*
                      <Image src={LogoD} style={this.styles.logoD} />*/}
                      <View style={this.styles.headV} >
                        <Text>
                          <Text style={[this.styles.headT,{fontSize: 11}]} >Solicitud para tramitar </Text> 
                          <Text style={[this.styles.headTB,{fontSize: 12}]} >BAJA TEMPORAL</Text> 
                        </Text>
                        <Text style={[this.styles.headT,{margin:5, fontSize: 11}]} >Fecha: {fechaCreacion}</Text>

                      </View>
                      <View style={this.styles.headV2} >
                        <Text style={[this.styles.headTB,{fontSize: 10}]} >M.C. ALEJANDRO BUENO ACUÑA</Text>
                        <Text style={[this.styles.headT,{fontSize: 10, marginTop: 3}]} >DIRECTOR DE ADMINISTRACIÓN ESCOLAR</Text>
                        <Text style={[this.styles.headTB,{fontSize: 10, marginTop: 3}]} >P R E S E N T E</Text>
                      </View>
                      <View style={this.styles.headV3} >
                        <Text style={[this.styles.headTB,{fontSize: 9}]} >At’n: Dr. Rubén Darío Hernández González</Text>
                        <Text style={[this.styles.headT,{fontSize: 9, marginTop: 3}]} >Jefe del Departamento de Educación Superior y Posgrado</Text>
                        <Text style={[this.styles.headT,{fontSize: 9, marginTop: 3}]} >Jefe del Departamento de Administración Escolar Zona Sur</Text>
                        <Text style={[this.styles.headT,{fontSize: 9, marginTop: 3}]} >Jefe del Departamento de Administración Escolar Zona Norte</Text>
                        <Text style={[this.styles.headTB,{fontSize: 9, marginTop: 3}]} >P R E S E N T E S</Text>
                      </View>
                      
                      <ReturnTable 
                        tramiteId={tramiteId}
                        matricula={matricula}
                        nombre={nombre}
                        apellidos={apellidos}
                        unidadAcademica={unidadAcademica}
                        planEstudios={planEstudios} 
                        datosTramite={datosTramite}
                      />

                      <View style={this.styles.midV} >

                        <Text style={[this.styles.headT,{fontSize: 9}]} >
                          Solicito a usted me autorice la baja temporal de estudios, con fundamento en el{' '}
                          <Text style={[this.styles.headTB,{fontSize: 9}]} >
                            Articulo 40
                            <Text style={[this.styles.headT,{fontSize: 9}]} > del Reglamento Escolar Vigente,{' '}
                              <Text style={[this.styles.headTI,{fontSize: 9}]} >
                                “El estudiante causará baja temporal en los siguientes casos:”{' '}
                                <Text style={[this.styles.headTB,{fontSize: 9}]} >
                                  Fracción I{' '}
                                </Text>
                                <Text style={[this.styles.headTI,{fontSize: 9, fontStyle: 'italic'}]} >
                                    “A solicitud del interesado, por un ciclo escolar, este periodo 
                                    concedido no será tomado en cuenta para computar el tiempo de permanencia 
                                    establecido en el programa educativo”.{' '}
                                    <Text style={[this.styles.headTB,{fontSize: 9}]} >
                                      Se anexa kardex actualizado.{' '}
                                    </Text>
                                </Text>
                              </Text>  
                            </Text>
                          </Text>
                        </Text>
                        
                      </View>

                      <View style={this.styles.midV2} >
                        <Text style={[this.styles.headT,{fontSize: 8}]} >
                          Atentamente    
                        </Text>
                      </View>

                      <View style={[this.styles.midV2,{marginTop: 35}]} >
                        <Text style={[this.styles.headT,{fontSize: 8, textDecoration: 'underline'}]} >
                          {'                                                 '}    
                        </Text>
                        <Text style={[this.styles.headT,{fontSize: 8}]} >
                          {'Firma del alumno'}    
                        </Text>
                      </View>

                      <View style={[this.styles.midV2, {width: '27%', marginTop: 20}]} >
                        
                        <Text style={[this.styles.headT,{fontSize: 8}]} >
                          Vo. Bo.    
                        </Text>
                        <View style={[this.styles.cajaFirma]} >
                          <Text style={[this.styles.headT,{fontSize: 7}]} >
                            Firma y sello de la Dirección de la Unidad Académica
                          </Text>
                        </View>

                      </View>

                      <View style={[this.styles.midV2, {width: '27%', marginLeft: '65%', marginTop: -35}]} >
                        <Text style={[this.styles.headT,{fontSize: 8}]} >
                          Autorizó   
                        </Text>
                        <View style={[this.styles.cajaFirma]} >
                          <Text style={[this.styles.headT,{fontSize: 7}]} >
                            Firma y sello Eduación Superior y Posgrado
                          </Text>
                        </View>
                      </View>

                      <View style={[this.styles.footV]} >
                        <Text style={[this.styles.headTB,{fontSize: 9}]} >
                          NOTA:{' '}
                          <Text style={[this.styles.headT,{fontSize: 9}]} >
                            Después de firmado y sellado por la Dirección de{' '}
                            <Text style={[this.styles.headTB,{fontSize: 9}]} >Unidad Académica</Text>{' '} y el {' '} 
                            <Text style={[this.styles.headTB,{fontSize: 9}]} >Departamento de Educación Superior y Posgrado</Text>{' '} deberá 
                            entregarse a la Unidad Académica dentro de los tiempos establecidos de acuerdo al calendario y reglamento escolar vigente que dice{' '}
                            <Text style={[this.styles.headTI,{fontSize: 9}]} > “Todo movimiento escolar se autorizarán los primeros diez días hábiles, al inicio de cada semestre”.</Text>{' '}
                            <Text style={[this.styles.headTB,{fontSize: 9}]} >En caso de no entregarlo o que la Unidad Académica 
                              no lo registre en el SASE quedará sin efecto la autorización.</Text>
                          </Text>
                        </Text>
                      </View>
                      
                      <Image src={LogoF}  style={this.styles.logoF} />

                      <View style={[this.styles.footVD]} >
                        <Text style={[this.styles.headT,{fontSize: 10}]} >
                          {d}
                        </Text>
                      </View>

                    </Page>
                  </Document>
                  </PDFViewer>
                
      </div>
    );
                      
  }
}
export default RenderPDF;