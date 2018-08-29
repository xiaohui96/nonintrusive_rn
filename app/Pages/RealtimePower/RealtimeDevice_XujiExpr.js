import React, {Component}  from 'react';
import Reflux from 'reflux';

import {Card,DatePicker,Button,} from  'antd-mobile-rn';

import dataAxios from '../utils/DataAxios';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class RealtimeDevice_XujiExpr extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            realtimePower:null
        }
        //this.stores = [powerStore];
    }

    getRealtimePower(deviceId){
        dataAxios.get("/getRealtimePower?deviceId="+deviceId)
            .then( (response) => {
                //console.log(response.data);
                this.setState({
                    realtimePower: response.data
                });
            })
            .catch( ()=>{
                message.error("设备列表获取失败！", 3);
            })
    }

    componentWillMount() {
        super.componentWillMount();
        //PowerActions.GetRealtimePower(this.props.device.id);
        this.getRealtimePower(this.props.device.id);
    }

    render(){
        const {device}=this.props;
        const {realtimePower}=this.state;
        return(
            <Card>

                <Card.Header
                    title={"设备号："+device.mac+""}
                    />

                    <Card.Body>

                    {( ()=> {
                            if (realtimePower === undefined) {
                                return (
                                    <View style={{ height: 42 }}>
                                        <Text style={{marginLeft: 16}}>设备已下线...</Text>
                                    </View>
                                )
                            }

                            else if (realtimePower == null) {
                                return (
                                    <View style={{ height: 42 }}>
                                        <Text style={{marginLeft: 16}}>读取中，请稍后...</Text>
                                    </View>

                                );
                            }


                        else
                            {
                                return (
                                    <View>
                                        <Text style={{marginLeft: 16}}>P序列：{realtimePower.activeP}</Text>
                                        <Text style={{marginLeft: 16}}>Q序列：{realtimePower.activeQ}</Text>
                                        <Text style={{marginLeft: 16}}>谐波：{realtimePower.harm}</Text>
                                        <Button onClick={() => {
                                            this.getRealtimePower(device.id)
                                        }}>
                                            刷新
                                        </Button>
                                    </View>
                                );
                            }
                        }
                    )()}
                        </Card.Body>
                        <Card.Footer
                        content={"["+device.typename+"]"}
                        />

                        </Card>
                        );
                    }
}


