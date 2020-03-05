import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PostingFeed = (props) => {

    console.log("props: ",  props);

    return (
        <View style={{flex: 1}}>
            <Text> {props.postingData.category} </Text>
            <Text> {props.price} </Text>
            <Text> {props.deliveryType} </Text>
            <Text> {props.location} </Text>
            <Text> {props.id} </Text>
            <Text> {props.title} </Text>
            <Text> {props.sellerName} </Text>
            <Text> {props.category} </Text>
        </View>
    )
}

export default PostingFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
