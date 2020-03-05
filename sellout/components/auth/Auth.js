import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Login from './innerComponents/Login';
import Register from './innerComponents/Register';
import SuccessfulRegistration from './innerComponents/SuccessfulRegistration';

const Stack = createStackNavigator();

const Auth = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    // useEffect(() => {
    //     axios.get(`https://sell-0ut.herokuapp.com/v1/postings`).then(res => {
    //         console.log(res.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // },0)

    console.log(props);

    const loginHandler = () => {
        let loginForm = {
            username: username,
            password: password
        }
        console.log('loginForm: ', loginForm);
        console.log('Login button has been pressed!');
        axios.post(`https://sell-0ut.herokuapp.com/v1/users/login`, loginForm ).then(res => {
            let token = res.data.token;
            console.log(token);
            props.jwtCatcher(token);
        }).catch(error => {
            console.log(error);
        })
    }

    const registerHandler = () => {
        let registerForm = {
            username: username,
            password: password,
            email: email
        }
        console.log('registerForm: ', registerForm);
        console.log('Register button has been pressed ');
        // Axios register request here!
    }

    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" 
                          options={{
                            headerShown: false
                          }} >
                { props => <Login {...props} userInfo={props.userInfo}
                                             username={username}
                                             setUsername={setUsername}
                                             password={password}
                                             setPassword={setPassword}
                                             loginHandler={loginHandler}
                                              /> }
            </Stack.Screen>
            <Stack.Screen name="Register"
                          options={{
                            headerShown: false
                          }} >
                { props => <Register {...props} userInfo={props.userInfo}
                                                username={username}
                                                setUsername={setUsername}
                                                password={password}
                                                setPassword={setPassword}
                                                email={email}
                                                setEmail={setEmail}
                                                registerHandler={registerHandler}
                                                /> }  
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
