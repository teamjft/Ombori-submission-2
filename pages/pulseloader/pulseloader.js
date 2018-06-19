import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import React, { Component } from 'react';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  circleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  circle: {
    borderWidth: 4 * StyleSheet.hairlineWidth,
  },
});


export default class PulseLoader extends Component<{}> {
  constructor(props) {
    super(props);
    this.anim = new Animated.Value(0);
  }
  componentDidMount() {
    Animated.timing(this.anim, {
      toValue: 1,
      duration: 3000,
      easing: Easing.in,
    })
      .start();
  }


  render() {
    return (
      <View style={[styles.circleWrapper, {
                width,
                height,
                marginLeft: -width / 2,
                marginTop: -height / 2,
            }]}
      >
        <Animated.View
          style={[styles.circle, {
              borderColor: 'transparent',
              backgroundColor: '#C5EFA0',
                        width: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 300],
                        }),
                        height: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 300],
                        }),
                        borderRadius: 300 / 2,
                        opacity: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                    }]}
        />
      </View>
    );
  }
}
