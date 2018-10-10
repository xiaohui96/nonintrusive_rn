//依赖类
import React from 'react';
import Reflux from 'reflux';

import {Card,DatePicker,Button,} from  'antd-mobile-rn';

import moment from 'moment';

import dataAxios from '../utils/DataAxios';
import deviceMap from '../utils/deviceMap';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class RealtimeDevice_XujiModule extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {
            realtimePower:null
        }
        //this.stores = [powerStore];
    }

    processPowerData(powerData){

        //console.log(data);
        var power={};
        power.total=0;
        power.data={};

        var key = function(obj){
            // some unique object-dependent key
            return obj.totallyUniqueEmployeeIdKey; // just an example
        };


        powerData.map((section,i)=>{
            power.total+=section.totalEnergy;
            section.data.map((node,i)=>{
                var id=node.id;
                if(power.data["node"+id]==undefined){
                    power.data["node"+id]=node.energy;
                }
                else{
                    power.data["node"+id]+=node.energy;
                }
            });
            console.log(section);
        });

        return power;
    }

    getRealtimePower(deviceId){
        dataAxios.get("/getHistoryPower?deviceId="+deviceId+"&startTime="+(moment()-4500000)+"&endTime="+(moment()+0))
            .then( (response) => {
                this.setState({
                    realtimePower: this.processPowerData(response.data)
                });
            })

        /*
        .catch( ()=>{
            message.error("设备列表获取失败！", 3);
        })*/
    }

    componentWillMount() {
        super.componentWillMount();
        //PowerActions.GetRealtimePower(this.props.device.id);
        this.getRealtimePower(this.props.device.id);
    }

    render() {
        const {device}=this.props;
        const {realtimePower}=this.state;
        return (
            <Card >
                <Card.Header
                    title={"设备号："+device.mac+""}
                />
                <Card.Body>
                    {
                        (()=>{
                            if(realtimePower==null){
                                return (
                                    <View style={{ height: 42 }}>
                                        <Text style={{marginLeft: 16}}>读取中，请稍后...</Text>
                                    </View>
                                );
                            }
                            else{
                                console.log(realtimePower);

                                return(
                                    <View>
                                        <Text style={{marginLeft: 16}}>上一小时总耗电量：{realtimePower.total.toFixed(3)}度</Text>
                                        {   (()=>{
                                            if(JSON.stringify(realtimePower.data) == "{}"){
                                                return <Text>没有电器开启...</Text>
                                            }
                                            else {
                                                return Object.keys(realtimePower.data).map((node, i) => {
                                                    //console.log(node);
                                                    return (
                                                        <Text key={i}>{deviceMap[node]}：{realtimePower.data[node].toFixed(3)}度</Text>);
                                                })
                                            }
                                        })()

                                        }
                                        <Button onClick={()=>{this.getRealtimePower(device.id)}}>
                                            刷新
                                        </Button>
                                    </View>
                                );
                            }
                        })()
                    }</Card.Body>


                <Card.Footer
                    content={"["+device.typename+"]"}
                />
            </Card>
        );
    }

}
