import React from 'react';
import { StyleSheet, Text, View, BackHandler, StatusBar, DeviceEventEmitter } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

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

export default class MyRouter extends Component {
    render(){
        return(
            <Router createReducer={reducerCreate}
                    getSceneStyle={getSceneStyle}
                    backAndroidHandler={onBackPress}
            >
            </Router>
        );
    }
}

