import axios from './ApiAxios';
class AuthUtils {
    static verifyLogin=function (onSuccess,onFail) {
        axios.get("/verifyLogin")
            .then( (response) => {
                //console.log(response.data);
                onSuccess(response.data)
            })
            .catch( (error) => {
                onFail();
                console.log(error);
            })
    }
}

export default AuthUtils;