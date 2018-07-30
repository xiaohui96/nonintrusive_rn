import React, {Component} from 'react';
import Reflux from 'reflux';

import Echarts from 'native-echarts';

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import {Card, Button, WhiteSpace, WingBlank} from 'antd-mobile-rn'

import dataAxios from '../utils/DataAxios';

import Dimensions from 'Dimensions';

const {width} = Dimensions.get('window');

export default class HistoryDevice_CelijiaExpr extends Reflux.Component {

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
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };



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
                            else if(realtimePower==undefined){
                                return (
                                    <View style={{ height: 42 }}>
                                        <Text style={{ marginLeft: 16 }}>设备已下线...</Text>
                                    </View>
                                );
                            }
                            else{
                                return (
                                    <View style={{ width: width }}>
                                        <Echarts option={option} height={300} width={width}/>
                                        <Echarts option={option} height={300} width={width}/>
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