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

export default class Test3 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log(this.props.User);
        //super.componentWillMount();
    }

    render() {

        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});