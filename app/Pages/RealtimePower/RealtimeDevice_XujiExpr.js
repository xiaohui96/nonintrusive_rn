import React, {Component} from 'react';
import Reflux from 'reflux';

import { Card,DatePicker,Button  } from 'antd';

import {Card, Button, WhiteSpace, WingBlank} from 'antd-mobile-rn'

import dataAxios from '../utils/DataAxios';

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

        if(realtimePower==undefined){
            return (
                <Card title={"设备号："+device.mac+" ["+device.typename+"]"}>
                    <p>设备已下线...</p>
                </Card>
            )
        }

        if(realtimePower==null){
            return (
                <Card title={"设备号："+device.mac+" ["+device.typename+"]"}>
                    <p>读取中，请稍后...</p>
                </Card>
            );
        }

        console.log(realtimePower);

        return (
            <Card title={"设备号："+device.mac+" ["+device.typename+"]"}>
                <p>P 序列：{realtimePower.activeP}</p>
                <p>Q 序列：{realtimePower.activeQ}</p>
                <p>谐波：{realtimePower.harm}</p>

                <button onClick={()=>{this.getRealtimePower(device.id)}}>
                    刷新
                </button>
            </Card>
        );
    }
}