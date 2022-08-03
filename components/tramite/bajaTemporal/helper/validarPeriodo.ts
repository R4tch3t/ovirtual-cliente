

const validarPeriodo = (inputs:any) => {
    const {value}:any = document.getElementById('periodoBaja')
    const valida = value ? value.match(/^[0-9]{4,4}-[0-9]{4,4}$/i):false;
    const name = 'periodoLectivo'
    if(!valida){
      inputs[1] = {...inputs[1],[name]:{
        color: 'error', 
        helper: 'Periodo de baja temporal INVÁLIDO',
        statusColor: 'error'
      }}
      return false
    }

    if(valida){
        inputs[1] = {...inputs[1],[name]:{
            color: 'primary', 
            helper: 'Periodo de baja temporal ¡VALIDO!',
            statusColor: 'primary'
        }}
    }
    
    return true
};

export {validarPeriodo}