import Axios from 'axios'
export default Axios.create({
    baseURL: 'http://megahack.kaolinhub.com.br/api/',
    headers:{
        'Access-Control-Allow-Origin': '*',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
    },  
})