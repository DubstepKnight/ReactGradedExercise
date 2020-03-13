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
    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);

    console.log('auth props: ', props);

    const errorCatcher = (err) => {
        console.log(err);
        setError(err);
    }

    const loginHandler = () => {
        let loginForm = {
            username: username,
            password: password
        }
        console.log('loginForm: ', loginForm);
        console.log('Login button has been pressed!');
        setIsSpinner(true);
        axios.post(`https://sell-0ut.herokuapp.com/v1/users/login`, loginForm ).then(res => {
            let token = res.data.token;
            console.log(token);
            props.jwtCatcher(token);
            setError(null);
            setIsSpinner(false);
        }).catch(error => {
            console.log('error type: ', typeof error);
            errorCatcher(error);
            setIsSpinner(false);
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
        setIsSpinner(true);
        axios.post(`https://sell-0ut.herokuapp.com/v1/users/register`, registerForm ).then(res => {
            console.log(res.data);
            setError(null);
            setIsSpinner(false);
            setRegistrationSuccess(true);
        }).catch(error => {
            console.log(error);
            errorCatcher(error);
            setIsSpinner(false);
        })
        // setIsSpinner(false);
    }

    return (
        // <>
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" 
                          options={{
                            headerShown: false
                          }} >
                { thisProps => <Login {...thisProps} username={username}
                                             setUsername={setUsername}
                                             password={password}
                                             setPassword={setPassword}
                                             loginHandler={loginHandler}
                                             error={error}
                                             isSpinner={isSpinner}
                                              /> }
            </Stack.Screen>
            <Stack.Screen name="Register"
                          options={{
                            headerShown: false
                          }} >
                { thisProps => <Register {...thisProps} username={username}
                                                setUsername={setUsername}
                                                password={password}
                                                setPassword={setPassword}
                                                email={email}
                                                setEmail={setEmail}
                                                registerHandler={registerHandler}
                                                error={error}
                                                registrationSuccess={registrationSuccess}
                                                isSpinner={isSpinner}
                                                /> }  
            </Stack.Screen>
            <Stack.Screen name="SuccessfulRegistration"
                          options={{
                            headerShown: false
                          }} >
                { thisProps => <SuccessfulRegistration {...thisProps} /> }  
            </Stack.Screen>
        </Stack.Navigator>
        // </>
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
