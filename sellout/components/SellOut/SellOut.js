// dependencies
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from 'react-native-vector-icons';

// components
import Header from './InnerComponents/Header';
import Feed from './InnerComponents/Feed';
import Library from './InnerComponents/Library';
import CreatePosting from './InnerComponents/Postings/CreatePosting';
import Auth  from '../auth/Auth';
import Posting from './InnerComponents/Postings/Posting';

// hooks
import { useCameraRoll } from '../hooks/useCameraRoll';

// const [photos, getPhotos] = useCameraRoll({ first: 2 });

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SellOut = (props) => {

const TabNavigation = (tabProps) => {

    console.log("tab navigation props: ", tabProps);

    const navigateToAuth = () => {
        console.log('yeahhhh!: ', tabProps);
        tabProps.navigation.navigate('auth');
    }

    const createPosting = () => {
        tabProps.navigation.navigate('createPosting')
    }

    const nagivateToPosting = () => {

    }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // }

    return (
        <>
        <Header jwt={props.jwt} navigation={tabProps.navigation} createPosting={createPosting} navigateToAuth={navigateToAuth} style={styles.Header} />
        <Tab.Navigator tabBarOptions={{
            style: {
                backgroundColor: '#fff',
                borderTopColor: 'black',
                borderTopWidth: 0
            },
            // activeBackgroundColor: 'blue', 
            activeTintColor: 'black',
            labelStyle: {
                fontSize: 12,
                fontWeight: 'bold'
            }
        }}>
            <Tab.Screen name='Feed'
                        options={{
                            tabBarIcon: () => (
                                <Ionicons name='ios-home' color='black' size={25} />
                            )
                        }} >
                { props => <Feed style={styles.Feed} {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
            <Tab.Screen name='Library'
                        options={{
                            tabBarIcon: () => (
                                <Ionicons name='ios-list' color='black' size={25} />
                            )
                        }} >
                { props => <Library style={styles.Library} {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
        </Tab.Navigator>
    </>
    )
}
    
    console.log('sellout props: ', props);

    return (
        // <View style={{flex: 1, backgrdounColor: 'red'}} >
            <Stack.Navigator>
                <Stack.Screen name='tabs'
                              options={{headerShown: false}} >
                    {stackProps => <TabNavigation {...stackProps} />}
                </Stack.Screen>
                <Stack.Screen name='posting'
                              options={{headerShown: false}} >
                    {stackProps => <Posting {...stackProps} /> }
                </Stack.Screen>
                <Stack.Screen name='auth'
                              options={{headerShown: false}} >
                    {stackProps => <Auth {...stackProps} /> }
                </Stack.Screen>
                <Stack.Screen name='createPosting'
                              options={{headerShown: false}} >
                    {stackProps => <CreatePosting jwt={props.jwt} {...stackProps} /> }
                </Stack.Screen>
            </Stack.Navigator>
        // </View> 
    )
}

export default SellOut;

const styles = StyleSheet.create({
    Header: {
        flex: 2,
        backgroundColor: 'red'
    },
    Feed: {
        flex: 9,
    }
})
