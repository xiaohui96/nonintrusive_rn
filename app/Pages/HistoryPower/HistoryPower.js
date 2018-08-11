/**
 * Created by Rabbit on 2017/11/2.
 */

import React, {Component} from 'react';
import Reflux from 'reflux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import {Card, WhiteSpace, WingBlank} from 'antd-mobile-rn'

import axios from '../utils/ApiAxios';
import AuthUtils from '../utils/AuthUtils'
import DeviceUtils from '../utils/DeviceUtils'

import HistoryDevice_CelijiaExpr from './HistoryDevice_CelijiaExpr'
import HistoryDevice_XujiExpr from './HistoryDevice_XujiExpr'

export default class HistoryPower extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getDevices=(user)=>{
        console.log(user);
        if(user!=undefined){
            DeviceUtils.getDevices(user.id,
                (data)=>{
                    console.log(data);
                    this.setState({
                        deviceList:data
                    });
                }
            )
        }
    }

    componentDidMount(){
        console.log("History Power mount");
        const {router}=this.props;
        //console.log("Enter RealtimePower");
        if(router!=undefined){
            const {user}=router.state;
            if(user!=undefined){
                this.setState({
                    user:user
                });
                this.getDevices(user);
                //console.log(user);
            }
        }
    }

    onEnter(){

    }

    render() {
        const {user,deviceList}=this.state;
        //console.log(user,deviceList);
        if(user==undefined||deviceList==undefined){
            return null;
        }

        return (
            <ScrollView style={{ paddingTop: 30 }}>

                <WingBlank size="lg">
                    {
                        deviceList.map((device,i) =>{
                            switch(device.typeid){
                                case 1: //测力佳三相表
                                    return <HistoryDevice_CelijiaExpr device={device} key={i}/>;
                                    break;
                                case 2: //许继模块电能表
                                    return <HistoryDevice_XujiExpr device={device} key={i}/>;
                                    break;
                            }
                        })
                    }

                </WingBlank>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});