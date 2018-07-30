import axios from './ApiAxios';
class DeviceUtils {
    static getDevices=function (userId,onSuccess) {
        axios.get("/devices?userid="+userId)
            .then( (response) => {
                //console.log(response.data);
                onSuccess(response.data)
            })
            .catch( (error) => {
                console.log("GetDeive Error:");
                console.log(error);
            })
    }
}

export default DeviceUtils;