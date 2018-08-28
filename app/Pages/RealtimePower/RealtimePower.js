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

import RealtimeDevice_CelijiaExpr from './RealtimeDevice_CelijiaExpr'
import RealtimeDevice_XujiExpr from './RealtimeDevice_XujiExpr'


export default class RealtimePower extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceList:undefined
        };
    }

    getDevices=(user)=>{
        console.log(user);
        if(user!=undefined){
            DeviceUtils.getDevices(user.id,
                (data)=>{
                    //console.log(data);
                    this.setState({
                        deviceList:data
                    });
                }
            )
        }
    }

    componentDidMount(){
        console.log("Realtime Power mount");
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
        //console.log(this.props.test);

    }

    onExit(){
        console.log("Exit");
    }

    render() {
        const {user,deviceList}=this.state;
        if(user==undefined||deviceList==undefined){
            return null;
        }
        //console.log(user,deviceList);
        return (

            <ScrollView style={{ paddingTop: 30 }}>

                <WingBlank size="lg">
                    {
                        deviceList.map((device,i) =>{
                            switch(device.typeid){
                                case 1: //测力佳三相表
                                return <RealtimeDevice_CelijiaExpr device={device} key={i}/>;
                                break;
                                case 2: //许继模块电能表
                                    return <RealtimeDevice_XujiExpr device={device} key={i}/>;
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