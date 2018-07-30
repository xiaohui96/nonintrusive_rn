import axios from './ApiAxios';
class AuthUtils {
    static verifyLogin=function (onSuccess) {
        axios.get("/verifyLogin")
            .then( (response) => {
                //console.log(response.data);
                onSuccess(response.data)
            })
            .catch( (error) => {
                console.log(error);
            })
    }
}

export default AuthUtils;