import React from 'react'
import { StyleSheet,
         Text,
         TouchableOpacity,
         View } from 'react-native'

const SuccessfulRegistration = (props) => {

    
    return (
        <View style={styles.container}>
            <Text> You were successfully registered! </Text>
            <Text> Congratulations! </Text>
            <View style={{flexDirection: 'row'}}>
                <Text> You can </Text>
                <TouchableOpacity>
                    <Text onPress={() => props.navigation.navigate('Login')} style={{fontWeight: 'bold'}}> Login </Text> 
                </TouchableOpacity>
                <Text> to your new account now! </Text>    
            </View>
        </View>
    )
}

export default SuccessfulRegistration

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
