import React from 'react';
import Reflux from 'reflux';
import moment from 'moment';
import Echarts from 'native-echarts';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { Card,DatePicker,Button,WingBlank  } from 'antd-mobile-rn';
import dataAxios from '../utils/DataAxios';
import Dimensions from 'Dimensions';
import DateRange from '../utils/DateRange';
import deviceMap from '../utils/deviceMap';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {width} = Dimensions.get('window');
const dateFormat = 'YYYY-MM-DD';
const MAX_DATA=400;



export default class HistoryDevice_XujiModule extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {
            realtimePower:null,
            startTime:moment().startOf('day'),
            endTime:moment().endOf('day')
        }
        //this.stores = [powerStore];
    }

    getRealtimePower(){
        const deviceId=this.props.device.id;
        dataAxios.get("/getRealtimePower?deviceId="+deviceId)
            .then( (response) => {
                this.setState({
                    realtimePower: response.data
                });
            })
            .catch( ()=>{
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


    render(){
        const {device}=this.props;
        const {historyPower, startTime, endTime, interval} = this.state;
        console.log(startTime + 0);

        var getOption = () => {
            var totalEnergy=0;
        var con=[];
        historyPower.forEach((item,i)=>{
            //console.log(item);
            totalEnergy+=item.totalEnergy;

            item.data.forEach((val,j)=>{

                var isFound=false;
                con.forEach((conData)=>{
                    if(conData.id==val.id){
                        conData.value+=val.energy;
                        isFound=true;
                    }
                });
                if(isFound==false){
                    con.push({
                        value:val.energy,
                        id:val.id,
                        name:deviceMap["node"+val.id]
                    });
                }
            });
        });

        var residue=totalEnergy;

        con.forEach((item)=>{
            residue-=item.value;
        });

        con.push({
            value:residue,
            id:0,
            name:'其他'
        });

        console.log(con);

        //function getOption(){

            var option = {
                title : {
                    text: '用电比例',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',

                },
                series : [
                    {
                        name: '用电比例',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:con,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            return option;
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

//export default HistoryDevice_XujiModule;