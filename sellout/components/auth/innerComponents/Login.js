import React, { useState } from 'react'
import { StyleSheet,
         Text, 
         View, 
         TextInput,
         TouchableWithoutFeedback,
         TouchableOpacity,
         Button } from 'react-native'

const Login = (props) => {

    // console.log("this should work now");
    // console.log("Login props: ", props);

    return (
        <View style={styles.container}>
            <View style={styles.upperBody}>
                <Text style={{fontSize: 40 }} > SellOut! </Text>
                <Text style={{fontSize: 16, marginTop: 15 }} > sell anything, even yourself </Text>
                <Text style={{fontSize: 30, marginTop: 90 }} > Login </Text>
            </View>
            <View style={styles.lowerBody}>
                <View>
                    <View>
                        <Text style={styles.label} > Username </Text>
                        <TextInput style={styles.inputField} onChangeText={value => props.setUsername(value) } />
                    </View>
                    <View>
                        <Text style={styles.label} > Password </Text>
                        <TextInput style={styles.inputField} 
                                   secureTextEntry={true}
                                   onChangeText={value => props.setPassword(value) } />
                    </View>
                    <TouchableOpacity onPress={props.loginHandler} >
                        <View style={styles.loginButton} >
                            <Text style={{color: 'white', fontSize: 20}}> Login </Text>
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
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upperBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    lowerBody: {
        flex: 1
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
        marginTop: 7
    },
    loginButton: {
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor: 'black',
        borderWidth: 2,
        alignItems: 'center',
        marginTop: 20,
        width: 'auto',
    }
})
