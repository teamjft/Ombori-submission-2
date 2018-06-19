import React from 'react';
import SplashScreen from '../pages/splashscreen/splashscreen';
import UserScreen from '../pages/userscreen/userscreen';
import { StackNavigator } from '../node_modules/react-navigation';

const AppScreens = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  UserScreen: { screen: UserScreen },
});

const App = () => (
  <AppScreens />
);

export default App;
