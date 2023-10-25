import store from "./store";
import axios from "axios";

async function checkToken(){
    await axios.get('/api/checkToken').then(response=>{
        if (response.data['code'] == 0){
            store.dispatch('authenticate',response.data.resultData.username)
        }
        else{
            store.dispatch('logout')
        }
    })

    setTimeout(checkToken, 15000)
}

export function cookieValidate(){
    checkToken()
}
