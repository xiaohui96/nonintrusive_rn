import React, {Component} from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import Echarts from 'native-echarts';
import {Card, Button, WhiteSpace, WingBlank,DatePicker,Tag} from 'antd-mobile-rn'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import dataAxios from '../utils/DataAxios';
import Dimensions from 'Dimensions';
import DateRange from '../utils/DateRange';
const {width} = Dimensions.get('window');
const dateFormat = 'YYYY-MM-DD';
const MAX_DATA=400;



export default class HistoryDevice_XujiExpr extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {
            realtimePower:{},
            startTime: moment().startOf('day'),
            endTime: moment().endOf('day')
        }
        //this.stores = [powerStore];
    }

    getRealtimePower(deviceId) {
        dataAxios.get("/getRealtimePower?deviceId=" + deviceId)
            .then((response) => {
                //console.log(response.data);
                this.setState({
                    realtimePower: response.data
                });
            })
            .catch(() => {
                message.error("设备列表获取失败！", 3);
            })
    }

    getHistoryPower(startT, endT) {
        var deviceId = this.props.device.id;
        var {startTime, endTime} = this.state;
        //console.log(startT+0);
        if (startT !==undefined) {
            startTime = startT;
        }

        if (endT !==undefined) {
            endTime = endT;
        }
        //console.log(startTime,endTime);

        //console.log(endTime-startTime);
        const interval = endTime - startTime > MAX_DATA ? Math.round((endTime - startTime) / MAX_DATA) : 1;

        console.log("/getHistoryPower?deviceId=" + deviceId + "&startTime=" + startTime + "&endTime=" + endTime + "&interval=" + interval);

        dataAxios.get("/getHistoryPower?deviceId=" + deviceId + "&startTime=" + startTime + "&endTime=" + endTime + "&interval=" + interval)
            .then((response) => {
                this.setState({
                    historyPower: response.data,
                    interval: interval,
                    startTime: startTime,
                    endTime: endTime
                });
            })
            .catch(() => {
                console.log("Can't get history data");
            })
    }

    componentWillMount() {
        super.componentWillMount();
        //PowerActions.GetRealtimePower(this.props.device.id);
        //this.getRealtimePower(this.props.device.id);
        this.getHistoryPower();
    }

    render() {
        const {device} = this.props;
        const {realtimePower, historyPower, startTime, endTime, interval} = this.state;
        console.log(startTime + 0);
        //生成Chart图，显示历史数据
        var getOption = () => {
            var pData = [];
            var qData = [];
            var count = startTime + 0;

            historyPower.forEach((item, index) => {
                var time = moment(item.time);
                while (count < time) {
                    pData.push({
                        value: [moment(count).format(), null]
                    });
                    qData.push({
                        value: [moment(count).format(), null]
                    });
                    count += interval;
                }
                pData.push({
                    name: time.format("YY-MM-DD HH:mm"),
                    value: [time.format(), item.activeP]
                });
                qData.push({
                    name: time.format("YY-MM-DD HH:mm"),
                    value: [time.format(), item.activeQ]
                });
                count += interval;
            });

            while (count < endTime) {
                pData.push({
                    value: [moment(count).format(), null]
                });
                qData.push({
                    value: [moment(count).format(), null]
                });
                count += interval;
            }
            //console.log(data);
            return {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        return (params.name ===undefined || params.name ==="null") ? "" : params.name + ' : ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                title:{
                    text:'功率'
                },
                legend: {
                    data: ['有功功率', '无功功率']
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name: '有功功率',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: pData
                    },
                    {
                        name: '无功功率',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: qData
                    },
                    ]
            };
        }
        return (
            <Card>

                <Card.Header
                    title={"设备号：" + device.mac}
                />

                <Card.Body>
                    <View>

                        <View style={{flex: 1, flexDirection: 'row',}}>

                            <View style={{flex: 1}}><Button onClick={
                                () => {
                                    //console.log("Today");
                                    this.getHistoryPower(moment().startOf('day'), moment().endOf('day'));
                                }
                            }>今天</Button></View>
                            <View style={{flex: 1}}><Button onClick={
                                () => {
                                    //console.log("Today");
                                    this.getHistoryPower(moment().subtract(3, 'days'), moment().endOf('day'));
                                }
                            }>前三天</Button></View>
                            <View style={{flex: 1}}><Button onClick={
                                () => {
                                    //console.log("Today");
                                    this.getHistoryPower(moment().startOf('week'), moment().endOf('week'));
                                }
                            }>前一周</Button></View>
                            <View style={{flex: 1}}><Button onClick={
                                () => {
                                    //console.log("Today");
                                    this.getHistoryPower(moment().startOf('week'), moment().endOf('week'));
                                }
                            }>前一月</Button></View>
                        </View>

                        {(() => {
                                if (historyPower == null) {
                                    return (
                                        <Text style={{marginLeft: 16}}>读取中，请稍后...</Text>
                                    );
                                }
                                else if (historyPower ===undefined) {
                                    return (
                                        <Text style={{marginLeft: 16}}>设备已下线...</Text>
                                    );
                                }
                                else {
                                    return (
                                        <WingBlank>
                                            <Echarts option={getOption()} height={300}/>
                                        </WingBlank>
                                    );
                                }
                            }
                        )()}

                        <Button onClick={() => {
                            this.getHistoryPower()
                        }}>
                            刷新
                        </Button>
                    </View>
                </Card.Body>

                <Card.Footer

                    content={"[" + device.typename + "]"}
                />

            </Card>
        );
    }
}