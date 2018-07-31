import Reflux from 'reflux';

import AuthActions from '../actions/AuthActions';
import {hex_md5} from '../Pages/utils/md5';
import axios from '../Pages/utils/ApiAxios';

class AuthStore extends Reflux.Store {
    constructor() {
        super();
        this.listenables = AuthActions;
        this.state = {
            loginFailed: false,
            User: undefined,
        }
    }

    onLogin( formData,router ) {
        console.log("Login");
        formData.password = hex_md5(formData.password);
        console.log(formData);
        axios.post("/login", formData)
            .then( (response) => {
                //console.log(response);
                if( response.code == 100 ) {

                    router.verifyUser();

                    Actions.RealtimePower_key({user:this.state.user});

                    /*
                    if(response.data.role=='2') {
                        history.push('/admin');
                    }
                    else{
                        history.push('/main');
                    }*/
                } else {
                    this.setState({
                        loginFailed: true
                    })
                }
            })
            .catch( (error) => {
                //console.log(error);
            })
    }

    onVerifyLogin() {
        axios.get("/verifyLogin")
            .then( (response) => {
                console.log(response);
                this.setState({
                    User: response.data
                })
            })
            .catch( (error) => {
                console.log(error);
                if( error.response.status == 401){
                    //history.push('/login');
                }
            })
    }
}

AuthStore.id = "authStore";

export default AuthStore;