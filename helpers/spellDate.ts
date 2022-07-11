import moment from 'moment'
const spellDate = (fecha:any) => {
    const date = moment(fecha);
    return date.format('hh:mm a | MMMM Do')
}

const diffDate = (d1:any,d2:any)=>{
    d1 = moment(d1)
    d2 = moment(d2)
    const duration = moment.duration(d2.diff(d1));
    let as:any = parseInt(duration.asMonths()+"");
    if(as){
        if(as===1){
            return as+" Mes"
        }else{
            return as+" Meses"
        }
    }
    as = parseInt(duration.asWeeks()+"");
    if(as){
        if(as===1){
            return as+" Semana"
        }else{
            return as+" Semanas"
        }
    }
    as = parseInt(duration.asDays()+"");
    if(as){
        if(as===1){
            return " ayer"
        }else{
            return as+" Días"
        }
    }
    as = parseInt(duration.asHours()+"");
    if(as){
        return as+"h"
    }
    as = parseInt(duration.asMinutes()+"");
    if(as){
        return as+"m"
    }
    as = parseInt(duration.asSeconds()+"");
        return as+"s"
    
}

export {diffDate}

export default spellDate