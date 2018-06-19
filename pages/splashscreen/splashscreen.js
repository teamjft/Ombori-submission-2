import { StyleSheet, View } from 'react-native';
import Pulse from 'react-native-pulse';
import React, { Component } from 'react';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class SplashScreen extends Component<{}> {
  componentDidMount() {
    const { navigate } = this.props.navigation;
    setTimeout(() => {
      navigate('UserScreen');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Pulse color="green" numPulses={3} diameter={500} speed={20} duration={1000} />
      </View>
    );
  }
}
SplashScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};
