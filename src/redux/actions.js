export const handleLogin = (data) => {
    return {
        type: 'login',
        data: data
    }
}
export const handleLoginInput = (data, label) => {
    if (label == 'email') {
        return {
            type: 'loginInput/email',
            data: data
        }
    }
    else {
        return {
            type: 'loginInput/password',
            data: data
        }
    }
}