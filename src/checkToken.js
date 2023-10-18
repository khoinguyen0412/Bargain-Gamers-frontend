import store from "./store";

async function checkToken(){
    await this.axios.get('/api/checkToken').then(response=>{
        if (response.data['code'] == 0){
            store.dispatch('authenticate')
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
