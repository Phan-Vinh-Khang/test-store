import jwtDecode from "jwt-decode";
let access_token = localStorage.getItem('access_token')
function Authorization() {
    if (access_token != '') {
        const isAdmin = jwtDecode(access_token);
        if (isAdmin.roleid < 3) return true;
        else return false;
    }
    return false
}
export default Authorization;
