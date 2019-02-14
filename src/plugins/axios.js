import Vue from 'vue'
import axios from 'axios'

//forma 1 de incluir axios globalmente e inserindo headers
// axios.defaults.baseURL = 'https://curso-vue-12277.firebaseio.com/'
// axios.defaults.headers.common ['authorization'] = 'abcd123'
// axios.defaults.headers.get ['accepts'] = 'aplication/json'

Vue.use({
    install (Vue) {
        //forma 1 de incluir axios globalmente e inserindo headers
        // Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL : 'https://curso-vue-12277.firebaseio.com/',
            headers : {
                'authorization' : 'abcd123'
            }
        })
        
    }
})
Vue.prototype.$http.interceptors.request.use(config => {

    return config
}, error => Promise.reject(error))

// Vue.prototype.$http.interceptors.response.use(res => {
//     const array = []
//     for (let chave in res.data) {
//         array.push({ id: chave, ...res.data[chave] })
//     }
//     res.data = array
//     return res
// }, error => Promise.reject(error))