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
        <Tab.Navigator>
            <Tab.Screen name='Feed'
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name='ios-home' color={color} size={size} />
                            )
                        }} >
                { props => <Feed {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
            <Tab.Screen name='Library'
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name='ios-list' color={color} size={size} />
                            )
                        }} >
                { props => <Library {...props} userInfo={props.userInfo}  /> }
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default SellOut;

const styles = StyleSheet.create({})
