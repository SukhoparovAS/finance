import store from '@/store';

export default async function (url, method='GET', formData=null){
    const authToken = store.getters.getAuthToken
    return await fetch(url,{
        method: method,
        headers:{
            'Authorization':authToken
        },
        body: formData
    })
}