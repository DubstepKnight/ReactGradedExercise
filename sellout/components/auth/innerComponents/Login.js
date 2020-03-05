import React, { useState, useRef } from 'react'
import { StyleSheet,
         Text, 
         View, 
         TextInput,
         TouchableOpacity,
         ActivityIndicator,
         Button } from 'react-native'

const Login = (props) => {

    // console.log("this should work now");
    // console.log("Login props: ", props);
    // console.log('error: ', {...props.error});

    const errorView = <View style={{marginTop: 10}} >
        <Text style={{fontSize: 15, color: 'red'}} >
            The username and/or the password are incorrect!
        </Text>
    </View>

    const passwordRef = useRef();

    return (
        <View style={styles.container}>
            <View style={styles.upperBody}>
                <Text style={{fontSize: 40 }} > SellOut! </Text>
                <Text style={{fontSize: 16, marginTop: 15 }} > sell anything, even yourself </Text>
                <Text style={{fontSize: 30, marginTop: 20 }} > Login </Text>
            </View>
            <View style={styles.lowerBody}>
                <View>
                    <View>
                        <Text style={styles.label} > Username </Text>
                        <TextInput style={styles.inputField}
                                   placeholder='Your username'
                                   returnKeyType="next"
                                   enablesReturnKeyAutomatically={true}
                                   onSubmitEditing={() => passwordRef.current.focus()}
                                   onChangeText={value => props.setUsername(value) } />
                    </View>
                    <View style={{marginTop: 5}} >
                        <Text style={styles.label} > Password </Text>
                        <TextInput style={styles.inputField} 
                                   placeholder='Your password'
                                   returnKeyType="done"
                                   enablesReturnKeyAutomatically={true}
                                   secureTextEntry={true}
                                   ref={passwordRef}
                                   onSubmitEditing={props.loginHandler}
                                   onChangeText={value => props.setPassword(value) } />
                    </View>
                    { props.error ? errorView : null }
                    <TouchableOpacity   onPress={ props.isSpinner ? null : props.loginHandler } >
                        <View style={styles.loginButton} >
                            {
                                props.isSpinner ? <ActivityIndicator size='small' color='white' /> : <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}> Login </Text>
                            }
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40}} >  
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 13 }}> Do not have an account? - </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Register')} >
                            <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}} > register </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    upperBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    lowerBody: {
        flex: 2
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputField: {
        padding: 2,
        borderColor: 'black',
        borderWidth: 2.5,
        borderRadius: 2,
        height: 33,
        marginTop: 7
    },
    loginButton: {
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 50,
        width: 'auto',
    }
})
