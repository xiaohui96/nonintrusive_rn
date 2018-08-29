import React, {Component} from 'react';
import Reflux from 'reflux';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import {Card, Button, WhiteSpace, WingBlank} from 'antd-mobile-rn'

import dataAxios from '../utils/DataAxios';

export default class RealtimeDevice_CelijiaExpr extends Reflux.Component {

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

        return (
            <Card>

                <Card.Header
                    title={"设备号："+device.mac}
                />

                <Card.Body>


                        {( ()=>{
                                if(realtimePower==null){
                                    return (
                                        <View style={{ height: 42 }}>
                                            <Text style={{ marginLeft: 16 }}>读取中，请稍后...</Text>
                                        </View>
                                    );
                                }
                                else if(realtimePower===undefined){
                                    return (
                                        <View style={{ height: 42 }}>
                                            <Text style={{ marginLeft: 16 }}>设备已下线...</Text>
                                        </View>
                                    );
                                }
                                else{
                                    return (
                                        <View>
                                            <Text style={{ marginLeft: 16 }}>A相电压：{realtimePower.vA}V</Text>
                                            <Text style={{ marginLeft: 16 }}>B相电压：{realtimePower.vB}V</Text>
                                            <Text style={{ marginLeft: 16 }}>C相电压：{realtimePower.vC}V</Text>
                                            <Text style={{ marginLeft: 16 }}>A相电流：{realtimePower.iA}A</Text>
                                            <Text style={{ marginLeft: 16 }}>B相电流：{realtimePower.iB}A</Text>
                                            <Text style={{ marginLeft: 16 }}>C相电流：{realtimePower.iC}A</Text>
                                            <Button onClick={()=>{this.getRealtimePower(device.id)}}>
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