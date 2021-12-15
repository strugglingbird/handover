export const STORAGE_KEY = 'user_auth'

// Do user authorization verify
export function checkAuth () {
    const auth = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if(auth && auth.time) {
        const preTime = new Date(auth.time)
        const nowTime = new Date().setHours(-1)
        if(nowTime > preTime) {
            return false;
        }
        return auth && Object.keys(auth).length
    }
    else {
        return false;
    }
}