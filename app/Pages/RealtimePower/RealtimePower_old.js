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
} from 'react-native';

import {Card, WhiteSpace, WingBlank} from 'antd-mobile-rn'

import axios from '../utils/ApiAxios';
import AuthUtils from '../utils/AuthUtils'
import DeviceUtils from '../utils/DeviceUtils'

import RealtimeDevice_CelijiaExpr from './RealtimeDevice_CelijiaExpr'

export default class RealtimePower extends Reflux.Component {
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
            <View style={{ paddingTop: 30 }}>

                <WingBlank size="lg">
                    {
                        deviceList.map((device,i) =>{
                            switch(device.typeid){
                                case 1: //测力佳三相表
                                    return <RealtimeDevice_CelijiaExpr device={device} key={i}/>;
                                    break;
                            }
                        })
                    }

                    <Card>

                        <Card.Header

                            title="This is title1"

                            thumbStyle={{ width: 30, height: 30 }}

                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"

                            extra="this is extra"

                        />

                        <Card.Body>

                            <View style={{ height: 42 }}>

                                <Text style={{ marginLeft: 16 }}>Card Content</Text>

                            </View>

                        </Card.Body>

                        <Card.Footer

                            content="footer content"

                            extra="footer extra content"

                        />

                    </Card>

                </WingBlank>

                <WhiteSpace size="lg" />

                <Card full>

                    <Card.Header

                        title="Full Column"

                        thumbStyle={{ width: 30, height: 30 }}

                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"

                        extra="this is extra1"

                    />

                    <Card.Body>

                        <View style={{ height: 42 }}>

                            <Text style={{ marginLeft: 16 }}>Card Content</Text>

                        </View>

                    </Card.Body>

                    <Card.Footer content="footer content" extra="footer extra content" />

                </Card>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});