import React from 'react';
import { StyleSheet, 
         Text,
         Image, 
         View } from 'react-native';

const PostingFeed = (props) => {

    // console.log("props: ",  props);
    // console.log('posting image: ', props.postingData.images[0]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: `https://sell-0ut.herokuapp.com/public/uploads/${props.postingData.images[0]}`}}
                       style={styles.image} />
            </View>
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 20}} > {props.postingData.title} </Text>
                {/* <Text> Posting id: {props.postingData.id} </Text> */}
                <Text> {props.postingData.category} </Text>
                <Text> {props.postingData.price} euros </Text>
                <Text> Delivery type:  {props.postingData.deliveryType} </Text>
                <Text> Location: {props.postingData.location} </Text>
                <Text> Posted: {props.postingData.dateOfPosting.substring(0, 10)} </Text>
            </View>
        </View>
    )
}

export default PostingFeed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    imageContainer: {
        padding: 5,
        borderWidth: 4,
        // borderColor: 'black'
    },
    image: {
        width: 140,
        height: 120
    }
})
