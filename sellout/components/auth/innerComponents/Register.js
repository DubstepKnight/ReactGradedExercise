import React from 'react'
import { StyleSheet, 
         Text, 
         View, 
         Button,
         TextInput,
         TouchableOpacity,
         TouchableWithoutFeedback } from 'react-native'

const Register = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperBody}>
                <Text style={{fontSize: 40 }} > SellOut! </Text>
                <Text style={{fontSize: 16, marginTop: 15 }} > sell anything, even yourself </Text>
                <Text style={{fontSize: 30, marginTop: 50 }} > Register </Text>
            </View>
            <View style={styles.lowerBody}>
                <View>
                    <View>
                        <Text style={styles.label} > Username </Text>
                        <TextInput style={styles.inputField} 
                                   autoFocus={true}
                                   onChangeText={value => props.setUsername(value) } />
                    </View>
                    <View style={{marginTop: 5}} >
                        <Text style={styles.label} > Password </Text>
                        <TextInput style={styles.inputField} 
                                   secureTextEntry={true}
                                   onChangeText={value => props.setPassword(value) } />
                    </View>
                    <View style={{marginTop: 5}}>
                        <Text style={styles.label} > Email </Text>
                        <TextInput style={styles.inputField} onChangeText={value => props.setEmail(value) } />
                    </View>
                    <TouchableOpacity onPress={props.registerHandler} >
                        <View style={styles.loginButton} >
                            <Text style={{color: 'white', fontSize: 20}}> Register </Text>
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
        // <View style={styles.container}>
            
        // </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    upperBody: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
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
