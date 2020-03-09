import React, {useRef, useState } from 'react'
import { StyleSheet, 
         Text, 
         View, 
         Button,
         TextInput,
         ActivityIndicator,
         TouchableOpacity,
         Keyboard,
         TouchableWithoutFeedback, 
         KeyboardAvoidingView} from 'react-native'

const Register = (props) => {

    const passwordRef = useRef();
    const emailRef = useRef();

    const errorView = <View style={{marginTop: 10}}>
        <Text style={{fontSize: 15, color: 'red'}} >
            The username, email and/or the password are incorrect!
        </Text>
    </View>

    // const onRegistrationSuccess = () => {
        if ( props.registrationSuccess) {
            props.navigation.navigate('SuccessfulRegistration');
        }
    // }
    console.log('updated');

    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior='position' style={{flex: 1}}  >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.innerContainer}>
                        <View style={styles.upperBody}>
                            <Text style={{fontSize: 40 }} > SellOut! </Text>
                            <Text style={{fontSize: 16 }} > sell anything, even yourself </Text>
                            <Text style={{fontSize: 30 }} > Register </Text>
                        </View>
                        <View style={styles.lowerBody}>
                            <View>
                                <View>
                                    <Text style={styles.label} > Username </Text>
                                    <TextInput style={styles.inputField} 
                                            placeholder='Your username'
                                            returnKeyType='next'
                                            enablesReturnKeyAutomatically={true}
                                            onSubmitEditing={() => passwordRef.current.focus()}
                                            onChangeText={value => props.setUsername(value) } />
                                </View>
                                <View style={{marginTop: 5}} >
                                    <Text style={styles.label} > Password </Text>
                                    <TextInput style={styles.inputField}
                                            placeholder='Your password' 
                                            returnKeyType='next'
                                            enablesReturnKeyAutomatically={true}
                                            onSubmitEditing={() => emailRef.current.focus()}
                                            secureTextEntry={true}
                                            ref={passwordRef}
                                            onChangeText={value => props.setPassword(value) } />
                                </View>
                                <View style={{marginTop: 5}}>
                                    <Text style={styles.label} > Email </Text>
                                    <TextInput style={styles.inputField}
                                            placeholder='Your email'
                                            returnKeyType="done"
                                            keyboardType='email-address'
                                            enablesReturnKeyAutomatically={true}
                                            onSubmitEditing={props.registerHandler}
                                            ref={emailRef}
                                            onChangeText={value => props.setEmail(value) } />
                                </View>
                                { props.error ? errorView : null }
                                <TouchableOpacity onPress={ props.isSpinner ? null : props.registerHandler} >
                                    <View style={styles.registerButton} >
                                        {
                                            props.isSpinner ? <ActivityIndicator size='small' color='black' /> : <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}> Register </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity   onPress={ props.isSpinner ? null : props.navigation.goBack } >
                                    <View style={styles.cancelButton} >
                                        {
                                            props.isSpinner ? <ActivityIndicator size='small' color='black' /> : <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}> Back </Text>
                                        }
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop: 15}} >
                                <View style={{flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 13, color: 'black' }}> You have an account already? - </Text>
                                    <TouchableOpacity onPress={() => props.navigation.navigate('Login')} >
                                        <Text style={{fontSize: 13, color: 'black', fontWeight: 'bold'}} > login </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
        // <View style={styles.container}>
            
        // </View>
    )
}

export default Register

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
        flex: 4,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // marginTop: 0
    },
    lowerBody: {
        flex: 7
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputField: {
        borderColor: 'black',
        borderWidth: 2.5,
        borderRadius: 2,
        height: 33,
        marginTop: 7,
        padding: 2
    },
    registerButton: {
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
