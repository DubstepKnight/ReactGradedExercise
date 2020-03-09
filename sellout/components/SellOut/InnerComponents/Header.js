import React, {useState} from 'react';
import { StyleSheet, 
         Text, 
         TouchableOpacity,
         Image,
         TextInput,
         View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Auth from '../../auth/Auth';
import loginIcon from '../../../assets/icons8_login_50px.png';
import { Ionicons } from 'react-native-vector-icons';

const Stack = createStackNavigator();

const Header = (props) => {

    const [isSearchBar, setIsSearchBar] = useState(false);

    console.log('header props: ', props.navigation.navigate);

    const searchNotActive = 
    <> 
        <View style={styles.searchIcon}>
            <TouchableOpacity onPress={() => setIsSearchBar(true)} >
                <Ionicons name='ios-search' 
                            color='black' 
                            size={35} />
            </TouchableOpacity>
        </View>
        <View style={styles.logo} >
            <Text style={{fontSize: 30}} > SellOut! </Text>
        </View> 
    </>

    const searchActive = 
    <>
        <View style={styles.searchBarActive}>
            <TextInput onBlur={() => setIsSearchBar(false)}
                       autoFocus={true}
                       style={styles.searchBar} />
        </View>
    </>

    const headerItself = 
    <>
        <View style={styles.container}>
            { isSearchBar ? searchActive : searchNotActive }
            <View style={styles.addButton, {marginRight: 10}} >
                    {
                        props.jwt === null ? ( 
                            <TouchableOpacity onPress={loginCaller}>
                                <Image source={loginIcon}
                                       style={{width: 33, height: 33 }} />
                            </TouchableOpacity>
                            ) : (
                            <TouchableOpacity onPress={postingCreate} > 
                                <Ionicons name='ios-add' color='black' size={45} style={{marginBottom: 0}} />
                            </TouchableOpacity>
                        ) 
                    }
            </View>
            { props.jwt === null ? <Auth  /> : null }
        </View>
    </>

    const loginCaller = () => {
        props.navigateToAuth();
        console.log('login button has been pressed');
    }

    const postingCreate = () => {
        // props.navigat
        console.log('create posting has been pressed');
    }

    // this.state.jwt === null ? <Auth jwtCatcher={this.jwtCatcher} />

    return (
        <View style={styles.container}>
            { isSearchBar ? searchActive : searchNotActive }
            <View style={styles.addButton, {marginRight: 10}} >
                    {
                        props.jwt === null ? ( 
                            <TouchableOpacity onPress={loginCaller}>
                                <Image source={loginIcon}
                                       style={{width: 33, height: 33 }} />
                            </TouchableOpacity>
                            ) : (
                            <TouchableOpacity onPress={postingCreate} > 
                                <Ionicons name='ios-add' color='black' size={45} style={{marginBottom: 0}} />
                            </TouchableOpacity>
                        ) 
                    }
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'white',
        // borderBottomWidth: 1
    },
    searchIcon: {
        flex: 1,
        marginLeft: 10
    },
    searchBarActive: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
        marginLeft: 10
    },
    searchBar: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
        width: 250,
        marginLeft: 10,
        paddingLeft: 10
    },
    logo: {
        flex: 3,
        marginLeft: 25,
        marginRight: 'auto'
    },
    addButton: {
        flex: 1
    }
})
