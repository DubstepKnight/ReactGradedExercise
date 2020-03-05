import React from 'react';
import Feed from './InnerComponents/Feed';
import Library from './InnerComponents/Library';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const SellOut = (props) => {

    console.log(props);

    return (
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
                { props => <Feed {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
            <Tab.Screen name='Library'
                        options={{
                            tabBarIcon: () => (
                                <Ionicons name='ios-list' color='black' size={25} />
                            )
                        }} >
                { props => <Library {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default SellOut;

const styles = StyleSheet.create({})
