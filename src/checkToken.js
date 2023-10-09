import store from "./store";
import axios from "axios";


async function checkToken(){
    await axios.get('/api/checkToken').then(response=>{
        if (response.data['code'] == 0){
            store.dispatch('authenticate')
        }
        else{
            store.dispatch('logout')
        }
    })
}

export function cookieValidate(){
    setInterval(()=>{
        checkToken();
    },15000)
}
