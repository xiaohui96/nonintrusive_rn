/**
 * Created by Rabbit on 2017/11/3.
 */

import React, {Component} from 'react';
import Reflux from 'reflux';
import { StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator';

import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import { Theme } from 'teaset';

import TabIcon from './Component/TabIcon';
// import TabMiddleIcon from './Component/TabMiddleIcon'


import Test2 from './Pages/Test2';
import Test3 from './Pages/Test3';
import Test4 from './Pages/Test4';

import RealtimePower from './Pages/RealtimePower/RealtimePower';
import HistoryPower from './Pages/HistoryPower/HistoryPower';


import Login from './Pages/Login/Login';
import LoginPublic from './Pages/Login/LoginPublic';

import AuthUtils from './Pages/utils/AuthUtils'

export default class router extends Reflux.Component{

    constructor(props) {
        super(props);
        this.state = {
            user:undefined
        };
    }

    reducerCreate = params => {
        const defaultReducer = new Reducer(params);
        return (state, action) => {
            // console.log('ACTION:',action,Actions.currentScene)
            // console.log('Actions:', Actions);
            return defaultReducer(state, action);
        };
    };

    verifyUser=()=>{
        AuthUtils.verifyLogin(
            (user)=>{
                this.setState({
                    user:user
                });
                //Actions.refresh({user:user});
            },
            ()=>{
                Actions.login({router:this});
            }
        );
    }

    componentDidMount() {
        //super.componentDidMount();
        //console.log("Router did mount");
        this.verifyUser();
    }



    getSceneStyle = () => ({
        backgroundColor: Theme.backgroundColor,
        // shadowOpacity: 1,
        // shadowRadius: 3,
    });

    onBackPress = () => {
        console.log(Actions.state);
        if (Actions.state.index !== 0) {
            return false
        }
        Actions.pop();
        return true
    }

    render(){
        //console.log("render");
        return(
            <Router createReducer={this.reducerCreate}
                    getSceneStyle={this.getSceneStyle}
                    backAndroidHandler={this.onBackPress}
            >
                <Modal
                    hideNavBar
                    transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forFadeFromBottomAndroid })}
                >

                    <Stack hideNavBar headerMode='screen' key="root">
                        <Tabs
                            key="tabbar"        // 唯一标识
                            wrap={true}         // 自动使用自己的导航栏包装每个场景
                            showLabel={false}   // 显示文字
                            tabBarStyle={styles.tabBarStyle} // tabBar的样式
                            swipeEnabled={false}// 是否可以滑动
                            headerMode='screen' // 页面切换方式
                            icon={TabIcon}      // 自定义Icon显示方式
                            lazy={true}         // 是否默认渲染tabbar
                            tabBarPosition={'bottom'}       // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
                            activeBackgroundColor='white'   // 选中tabbar的背景色
                            inactiveBackgroundColor='white' // 未选中tabbar的背景色
                            activeTintColor='#4ECBFC'       // 选中tabbar图标的颜色
                            inactiveTintColor='#aaa'        // 未选中tabbar图标的颜色
                        >
                            <Stack key="RealtimePower"
                                   title={'实时数据'}
                                   image={Images.ShiTu}
                                   selectedImage={Images.ShiTu}
                            >
                                <Scene component={RealtimePower}
                                       router={this}
                                       key="RealtimePower_key"/>
                            </Stack>
                            <Stack key='Test2'
                                   title='历史数据'
                                   image={Images.Gank}
                                   selectedImage={Images.Gank}
                            >
                                <Scene component={HistoryPower}
                                       router={this}
                                       key="HistoryPower_key"/>
                            </Stack>
                            <Stack key="Test3"
                                   title='我的'
                                   image={Images.Main}
                                   selectedImage={Images.Main}
                            >
                                <Scene component={Test3} key="Test3_key"/>
                            </Stack>
                        </Tabs>
                        {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.Test3_key*/}
                        <Scene component={Test3} onEnter={()=>{Actions.refresh({User:this.state.user})}} key="Test3_key"/>

                    </Stack>

                    <Stack gesturesEnabled={false}  key="login">
                        <Scene
                            title='登录'
                            key="LoginModal"
                            component={Login}
                            gesturesEnabled={false}
                            hideNavBar
                            onExit={() => console.log('onExit')}
                            onEnter={()=>{Actions.refresh({router:this})}}
                            onLeft={Actions.pop}
                        />
                        <Scene
                            key="LoginPublic"
                            component={LoginPublic}
                            gesturesEnabled={false}
                            hideNavBar
                            onExit={() => console.log('onExit')}
                            onLeft={Actions.pop}
                        />
                    </Stack>



                </Modal>
            </Router>
        );
    }
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#eee',
        height:49,
    },
});