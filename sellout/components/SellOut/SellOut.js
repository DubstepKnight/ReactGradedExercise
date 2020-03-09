import React from 'react';
import Header from './InnerComponents/Header';
import Feed from './InnerComponents/Feed';
import Library from './InnerComponents/Library';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import Auth  from '../auth/Auth';
import Posting from './InnerComponents/Postings/Posting';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SellOut = (props) => {

const TabNavigation = (tabProps) => {

    console.log("tab navigation props: ", tabProps);

    const navigateToAuth = () => {
        console.log('yeahhhh!: ', tabProps);
        tabProps.navigation.navigate('auth');
    }

    return (
        <>
        <Header jwt={props.jwt} navigation={tabProps.navigation} navigateToAuth={navigateToAuth} style={styles.Header} />
        <Tab.Navigator tabBarOptions={{
            style: {
                backgroundColor: '#fff',
                borderTopColor: 'black',
                borderTopWidth: 1
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

    // const navigateToAuth = () => {
    //     console.log('yeahhhh!');
    //     navigation.navigate('auth');
    // }

    return (
        // <View style={{flex: 1, backgrdounColor: 'red'}} >
            <Stack.Navigator>
                <Stack.Screen name='tabs'
                            options={{headerShown: false}} >
                    {props => <TabNavigation {...props} />}
                </Stack.Screen>
                <Stack.Screen name='posting'
                            options={{headerShown: false}} >
                    {props => <Posting {...props} /> }
                </Stack.Screen>
                <Stack.Screen name='auth'
                            options={{headerShown: false}} >
                    {props => <Auth {...props} /> }
                </Stack.Screen>
            </Stack.Navigator>
        // </View> 
    )
}

// export default createStackNavigator({ SellOut }, { headerMode: "none" });
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
