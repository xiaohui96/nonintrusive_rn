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

export default class HistoryPower extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        super.componentWillMount();
        //PowerActions.GetRealtimePower(this.props.device.id);
        //this.getRealtimePower(this.props.device.id);
        console.log("will mount");
        console.log(AuthUtils);
        AuthUtils.verifyLogin(
            (user)=>{
                this.setState({
                    user:user
                });
                DeviceUtils.getDevices(user.id,
                    (data)=>{
                        this.setState({
                            deviceList:data
                        });
                    }
                )
            }
        );
    }

    render() {
        const {user,deviceList}=this.state;
        if(user==undefined||deviceList==undefined){
            return null;
        }
        console.log(user,deviceList);
        return (
            <ScrollView style={{ paddingTop: 30 }}>

                <WingBlank size="lg">
                    {
                        deviceList.map((device,i) =>{
                            switch(device.typeid){
                                case 1: //测力佳三相表
                                    return <HistoryDevice_CelijiaExpr device={device} key={i}/>;
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