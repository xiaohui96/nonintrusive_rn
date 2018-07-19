/**
 * Created by Rabbit on 2017/11/2.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import {Card, WhiteSpace, WingBlank} from 'antd-mobile-rn'

export default class RealtimePower extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{ paddingTop: 30 }}>

                <WingBlank size="lg">

                    <Card>

                        <Card.Header

                            title="This is title"

                            thumbStyle={{ width: 30, height: 30 }}

                            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"

                            extra="this is extra"

                        />

                        <Card.Body>

                            <View style={{ height: 42 }}>

                                <Text style={{ marginLeft: 16 }}>Card Content</Text>

                            </View>

                        </Card.Body>

                        <Card.Footer

                            content="footer content"

                            extra="footer extra content"

                        />

                    </Card>

                </WingBlank>

                <WhiteSpace size="lg" />

                <Card full>

                    <Card.Header

                        title="Full Column"

                        thumbStyle={{ width: 30, height: 30 }}

                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"

                        extra="this is extra1"

                    />

                    <Card.Body>

                        <View style={{ height: 42 }}>

                            <Text style={{ marginLeft: 16 }}>Card Content</Text>

                        </View>

                    </Card.Body>

                    <Card.Footer content="footer content" extra="footer extra content" />

                </Card>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});