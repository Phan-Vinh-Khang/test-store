import jwtDecode from "jwt-decode";
let access_token = localStorage.getItem('access_token')
function Authorization() {
    const isAdmin = jwtDecode(access_token);
    console.log(access_token)
    if (isAdmin.roleid < 3) return true;
    else return false;
}
export default Authorization;
