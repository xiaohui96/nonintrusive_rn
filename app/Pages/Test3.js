/**
 * Created by Rabbit on 2017/11/3.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

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

import axios from './utils/ApiAxios';

export default class Test3 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props.User);
        //super.componentWillMount();
    }

    logout(){
        console.log("Logout");
        axios.get("/logout")
            .then( (response) => {
                this.setState({
                    User: undefined
                })
                //history.push('/login');
                Actions.login();
            })
    }

    render() {

        return (
            <View style={styles.container}>
                <Text onPress={()=>this.logout()}>Logout</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});