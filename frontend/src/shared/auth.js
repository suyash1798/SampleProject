export const addLocalStorageToken = (token)=>localStorage.setItem('token',token)

export const removeLocalStorageToken = ()=>localStorage.removeItem('token')

export const getLocalStorageToken = ()=>localStorage.getItem('token')