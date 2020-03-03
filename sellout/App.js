import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import * as SecureStore from 'expo-secure-store'
import { StyleSheet, Text, View } from 'react-native';
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

  onLoginReceiveJWT = (responseJWT) => {
    // Deal with successful login by storing the token into secure store
    SecureStore.setItemAsync(secureStoreTokenName, responseJWT)
      .then(response => {
        console.log(response);
        this.setState({ jwt: responseJWT, isCheckingTokenStorage: false })
      })    
  }

  render() {

    console.log(this.state);

    return (
      // <View >
        <NavigationContainer>
          {/* <Stack.Navigator> */}
            {this.state.jwt === null ? <Auth userInfo={this.state.userInfo} /> : <SellOut userInfo={this.state.userInfo} /> }
          {/* </Stack.Navigator> */}
        </NavigationContainer>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
