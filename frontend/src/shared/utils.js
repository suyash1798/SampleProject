export const addLocalStorageToken = (token)=>localStorage.setItem('token',token)

export const removeLocalStorageToken = ()=>localStorage.removeItem('token')

export const getLocalStorageToken = ()=>localStorage.getItem('token')

export const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;