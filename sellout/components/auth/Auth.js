import React, { useState, useEffect } from 'react';
import Login from './innerComponents/Login';
import Register from './innerComponents/Register';
import SuccessfulRegistration from './innerComponents/SuccessfulRegistration';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Auth = (props) => {

    console.log(props.userInfo);

    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" 
                          options={{
                            headerShown: false
                          }} >
                { props => <Login {...props} userInfo={props.userInfo} /> }
            </Stack.Screen>
            <Stack.Screen name="Register"
                          options={{
                            headerShown: false
                          }} >
                { props => <Register {...props} userInfo={props.userInfo} /> }  
            </Stack.Screen>
            <Stack.Screen name="SuccessfulRegistration"
                          options={{
                            headerShown: false
                          }} >
                { props => <SuccessfulRegistration {...props} /> }  
            </Stack.Screen>
        </Stack.Navigator>
        // <Login />
    )
}

export default Auth

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })
