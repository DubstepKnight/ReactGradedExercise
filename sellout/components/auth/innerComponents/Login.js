import React, { useState, useRef } from 'react'
import { StyleSheet,
         Text, 
         View, 
         Keyboard,
         TextInput,
         TouchableOpacity,
         ActivityIndicator,
         KeyboardAvoidingView,
         TouchableWithoutFeedback,
         Button } from 'react-native'

const Login = (props) => {

    // console.log("this should work now");
    // console.log("Login props: ", props);
    // console.log('error: ', {...props.error});

    const errorView = <>
        <Text style={{fontSize: 15, color: 'red'}} >
            The username and/or the password are incorrect!
        </Text>
    </>

    const passwordRef = useRef();

    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior='position' style={{flex: 1}} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <View style={styles.upperBody}>
                            <Text style={{fontSize: 40 }} > SellOut! </Text>
                            <Text style={{fontSize: 16 }} > sell anything, even yourself </Text>
                            <Text style={{fontSize: 30 }} > Login </Text>
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
                                <View style={{marginTop: 10}} >
                                    { props.error ? errorView : null }
                                </View>
                                <TouchableOpacity   onPress={ props.isSpinner ? null : props.loginHandler } >
                                    <View style={styles.loginButton} >
                                        {
                                            props.isSpinner ? <ActivityIndicator size='small' color='white' /> : <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}> Login </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity   onPress={ props.isSpinner ? null : props.navigation.goBack } >
                                    <View style={styles.cancelButton} >
                                        {
                                            props.isSpinner ? <ActivityIndicator size='small' color='black' /> : <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}> Cancel </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 15}} >  
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{ fontSize: 13 }}> Do not have an account? - </Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Register')} >
                                        <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}} > register </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },  
    upperBody: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50
    },
    lowerBody: {
        flex: 3
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
    },
    cancelButton: {
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        height: 50,
        width: 'auto',
    }
})
