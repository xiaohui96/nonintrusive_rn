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

    componentDidMount() {
        //super.componentWillMount();
        this.getDevices();
    }

    getDevices(user){
        if(user==undefined){
            user=this.props.user;
        }
        if(user!=undefined){
            DeviceUtils.getDevices(user.id,
                (data)=>{
                    //console.log(this.state);
                    this.setState({
                        deviceList:data
                    });
                }
            )
        }
    }

    onEnter(){
        console.log("Enter HistoryPower");
    }

    componentWillReceiveProps(newProps) {
        //console.log('Component WILL RECEIVE PROPS!');
        const {user}=newProps;
        //console.log(user);

        this.getDevices(user);
    }

    render() {
        const {user}=this.props;
        const {deviceList}=this.state;
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