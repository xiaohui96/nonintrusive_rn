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

    TouchableOpacity,
} from 'react-native';

import { SegmentedView, Button, NavigationBar, Overlay, Input  } from 'teaset';
import { observer } from 'mobx-react/native'
import { observable, computed, action, runInAction } from 'mobx'

import {NoticeBar} from 'antd-mobile-rn'

import ApiAxios from '../utils/ApiAxios';


import LoginInput from './Component/LoginInput';

import AuthActions from '../../actions/AuthActions';
import authStore from '../../stores/authStore';

const LoginView = (props) => {
    return(
        <View style={styles.loginViewStyle}>
            <LoginInput placeholder='请输入账号' maxLength={100}
                        onChangeText={props.onChangeTopText} value={props.topText}
            />

                    <View>
                        <LoginInput placeholder='请输入密码'
                                    onChangeText={props.onChangeBottomText} value={props.bottomText} type="password"
                        />
                        <View style={{
                            backgroundColor:Theme.transparentColor,
                            justifyContent:'flex-end',
                            alignItems:'flex-end',

                        }}>
                            <Text style={styles.forgetPassStyle}
                                  onPress={()=>Actions.LoginPublic({headerTitle:'重置密码'})}
                            >
                                忘记密码
                            </Text>
                        </View>
                    </View>


            <Button title={'登录'}
                    style={styles.loginButtonStyle}
                    titleStyle={{fontSize:FONT_SIZE(14), color:'#fff'}}
                    onPress={props.onPress}
            />
            <View style={{flex:1,alignItems:'center',marginTop:px2dp(44)}}>
                <Text style={styles.createAccountStyle}
                      onPress={()=>Actions.LoginPublic({headerTitle:'创建账号'})}
                >
                    创建账号
                </Text>
            </View>
            {
                props.message==undefined?null:(
                    <NoticeBar >
                        { props.message}
                    </NoticeBar>
                )
            }

        </View>
    )
}

@observer
export default class Login extends Reflux.Component {
    constructor(props) {
        super(props);
        this.state = {
            errMessage:undefined
        };
        this.store = authStore;
    }

    @observable mobileCode = '';
    @observable verifyCode = '';
    @observable passCode = '';
    @observable isImage = false;
    render() {
        //console.log(this.imageUrl);
        return (
            <View style={styles.container}>
                <NavigationBar title='登录'
                               style={{height:64,backgroundColor:'white'}}
                               statusBarStyle='default'
                               leftView={
                                   <TouchableOpacity onPress={()=>Actions.pop()}>
                                       <Text>武汉大学非侵入测量云平台</Text>
                                   </TouchableOpacity>
                               }
                />
                <SegmentedView style={{height:SCREEN_HEIGHT - 64 ,marginTop:64, backgroundColor:'#F9F9F9'}}
                               type='carousel'
                               indicatorLineColor={'#000'}
                >

                    <SegmentedView.Sheet title='密码登录'
                                         titleStyle={{color:'#333'}}
                                         activeTitleStyle={{color:'#000'}}
                    >
                        <LoginView isPass={true}
                                   onPress={()=>this.onLoginPress(2)}
                                   onChangeTopText={(text)=>{
                                       // console.log(text)
                                       this.mobileCode = text;
                                   }}
                                   onChangeBottomText={(text)=>{
                                        //console.log(text);
                                       this.passCode = text;
                                   }}

                                   topText={this.mobileCode}
                                   bottomText={this.passCode}
                                   message={this.state.errMessage}
                        />


                    </SegmentedView.Sheet>
                </SegmentedView>

            </View>
        );
    }


    onLoginPress = (code)=>{

        //Actions.HistoryPower_key();

        console.log(this.mobileCode);
        if(this.mobileCode==undefined||this.mobileCode==null||this.mobileCode==""){
            this.setState({
                errMessage:"用户名不能为空！"
            });
            return;
        }
        if(this.passCode==undefined||this.passCode==null||this.passCode==""){
            this.setState({
                errMessage:"密码不能为空！"
            });
            return;
        }
        this.setState({
            loginFailed: false,
            errMessage:undefined
        });
        //code.preventDefault();
        AuthActions.Login({
            account:this.mobileCode,
            password:this.passCode
        });

    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F9F9F9'
    },
    loginViewStyle:{
        // backgroundColor:'red',
        marginTop:px2dp(80)
    },
    loginButtonStyle:{
        marginLeft:px2dp(108),
        marginRight:px2dp(108),
        height:px2dp(80),
        marginTop:px2dp(142),
        backgroundColor:'#ff7000',
        borderColor:Theme.transparentColor,
        borderRadius:20

    },
    createAccountStyle:{
        color:'#ff7000',
        fontSize:FONT_SIZE(13),

    },
    forgetPassStyle:{
        marginTop:px2dp(28),
        height:px2dp(32),
        marginRight:px2dp(108),
        color:'#ff7000',
        fontSize:FONT_SIZE(12),
    }
});