import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
// import jwtJsDecode from 'jwt-js-decode';
import Auth from './components/auth/Auth';
import SellOut from './components/SellOut/SellOut';

const Stack = createStackNavigator();
const secureStoreTokenName = "demoAppJWT2";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: null,
      userInfo: {
        username: '',
        telephoneNumber: '',
        email: ''
      },
      isCheckingTokenStorage: true
    };
  }

  componentDidMount() {
    // Check for stored JWT when the application loads
    SecureStore.getItemAsync(secureStoreTokenName)
      .then(response => {
        console.log("SecureStore.getItemAsync success");
        this.setState({ jwt: response, isCheckingTokenStorage: false });
      })
      .catch(error => {
        console.log("SecureStore.getItemAsync error");
        console.log(error);
      });
  }

  jwtCatcher = (token) => {
    console.log(token);
    // this.setState({jwt: token});
    SecureStore.setItemAsync(secureStoreTokenName, token)
      .then(response => {
        console.log(response);
        this.setState({ jwt: token, isCheckingTokenStorage: false })
      })    
  }

  logOuter = () => {
    console.log('logOut');
    SecureStore.deleteItemAsync(secureStoreTokenName)
      .then(response => {
        console.log('SecureStore.deleteItemAsync success');
        this.setState({ jwt: null });
      })
      .catch(error => {
        console.log("SecureStore.deleteItemAsync fail");
        console.log(error);
      })
  }

  render() {
    console.log(this.state);
    // console.log(this.state.jwt);

    return (
      // <View >
        <NavigationContainer style={styles.container} >
          <View style={{backgroundColor: 'white', flex: 0}} >
            <StatusBar translucent={true} barStyle='dark-content' />
          </View>
          {/* <Stack.Navigator>
            <Stack.Screen name='App'
                          options={{headerShown: false}} > */}
              { this.state.isCheckingTokenStorage ? <ActivityIndicator style={{flex: 1}} color='black' size='large' /> : <SellOut jwt={this.state.jwt} logOuter={this.logOuter} jwtCatcher={this.jwtCatcher} userInfo={this.state.userInfo} /> }
            {/* </Stack.Screen>
          </Stack.Navigator> */}
        </NavigationContainer>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
