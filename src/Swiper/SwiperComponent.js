import React, { Component } from 'react';
import { Text, View, PanResponder } from 'react-native';


export default class SwiperComponent extends Component {
    state = {
        startX: 0,
        startY: 0,
        direction: null
    };

    _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
            this.setState({startX: evt.nativeEvent.locationX, startY: evt.nativeEvent.locationY})
        },
        onPanResponderMove: (evt, gestureState) => {
            const diffX = this.state.startX - evt.nativeEvent.locationX;
            const diffY = this.state.startY - evt.nativeEvent.locationY;
            const XgatherY = Math.abs(diffX) > Math.abs(diffY);

            if (XgatherY)
                this.setState({ direction: diffX < 0 ? "RIGHT" : "LEFT"});
            else
                this.setState({ direction: diffY < 0 ? "DOWN" : "UP"});
        },
        onPanResponderRelease: (evt, gestureState) => {
            //something
        }
    });

    render() {
        return <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', flex: 1}} {...this._panResponder.panHandlers}>
            <Text>the direction is: {this.state.direction}</Text>
        </View>
    }
}