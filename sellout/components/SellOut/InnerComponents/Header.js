import React from 'react';
import { StyleSheet, 
         Text, 
         TouchableOpacity,
         View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Header = () => {

    const iconSize = 35;

    return (
        <View style={styles.container}>
            <View style={styles.searchIcon}>
                <Ionicons name='ios-search' 
                        color='black' 
                        size={35} />
            </View>
            <View style={styles.logo} >
                <Text style={{fontSize: 30}} > SellOut! </Text>
            </View>
            <View style={styles.addButton, {marginRight: 10}} >
                <TouchableOpacity > 
                    <Ionicons name='ios-add' color='black' size={45} style={{marginBottom: 0}} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        borderBottomWidth: 1
    },
    searchIcon: {
        flex: 1,
        marginLeft: 10
    },
    logo: {
        flex: 3,
        marginLeft: 'auto',
        marginRight: 'auto'
        // justifySelf: 'center'
    },
    addButton: {
        flex: 1
    }
})
