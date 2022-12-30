export const isAuthenticated = () => {
    
    const cookie = getCookie("auth-token")

    if(cookie != undefined) {
        return true
    }
    else{
        return false 
    }
}

export const getUser = () => {
    return getCookie("auth-token");
}

export const clearCookie = () => {
    const cookie = getCookie("auth-token");
    document.cookie = `auth-token=; expires=${new Date(Date.now())}`
    console.log(getCookie('auth-token'));
}

const getCookie = function (name) {
    var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
};
