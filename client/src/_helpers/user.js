export function userId() {
    // return authorization header with jwt token
    let user = getUser();

    if (user) {
        return user.userId;
    } else {
        return null;
    }
}

export function getUser(){
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return user;
    } else {
        return null;
    }
}