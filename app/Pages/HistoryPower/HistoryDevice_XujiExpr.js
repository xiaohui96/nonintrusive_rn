import React, {Component} from 'react';
import Reflux from 'reflux';
import moment from 'moment';

import {Card, Button, WhiteSpace, WingBlank,DatePicker,Tag} from 'antd-mobile-rn'

import dataAxios from '../utils/DataAxios';
import Dimensions from 'Dimensions';
import DateRange from 'utils/DateRange';
const {width} = Dimensions.get('window');
const dateFormat = 'YYYY-MM-DD';
const MAX_DATA=400;



export default class HistoryDevice_CelijiaExpr extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {
            realtimePower: {},
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
        if (startT != undefined) {
            startTime = startT;
        }

        if (endT != undefined) {
            emdTime = endT;
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
            var pdata = [];
            var qdata = []
            var count = startTime + 0;

            historyPower.forEach((item, index) => {
                var time = moment(item.time);
                while (count < time) {
                    pdata.push({
                        value: [moment(count).format(), null]
                    });
                    qdata.push({
                        value: [moment(count).format(), null]
                    });
                    count += interval;
                }
                pdata.push({
                    name: time.format("YY-MM-DD HH:mm"),
                    value: [time.format(), item.activeP]
                });
                qdata.push({
                    name: time.format("YY-MM-DD HH:mm"),
                    value: [time.format(), item.activeQ]
                });
                count += interval;
            });

            while (count < endTime) {
                pdata.push({
                    value: [moment(count).format(), null]
                });
                qdata.push({
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
                        return (params.name == undefined || params.name == "") ? "" : params.name + ' : ' + params.value[1];
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                title: {
                    text: '功率'
                },
                legend: {
                    data: ['有功功率', '无功功率', ]
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
                        name: 'A相电流',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: pdata
                    },
                    {
                        name: 'B相电流',
                        type: 'line',
                        showSymbol: false,
                        hoverAnimation: false,
                        data: qdata
                    },
                    ]
            };

        }

        return (
            <Card title={"设备号："+device.mac+" ["+device.typename+"]"}>

                <div>
                    <DateRange startTime={startTime} endTime={endTime} onChange={this.onDateTimeChange}/>
                    <Button onClick={()=>{this.getHistoryPower()}}>
                        查询数据
                    </Button>
                </div>
                {
                    historyPower==undefined?null:<ReactEcharts
                        option={getOption()}
                        style={{height: '300px', width: '100%'}}
                    />
                }

                <button onClick={()=>{this.getHistoryPower()}}>
                    刷新
                </button>
            </Card>
        );
    }
}