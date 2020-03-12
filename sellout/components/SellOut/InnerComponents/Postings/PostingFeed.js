import React from 'react';
import { StyleSheet, 
         Text,
         Image, 
         TouchableOpacity,
         View } from 'react-native';

const PostingFeed = (props) => {

    // console.log("posting feed props: ",  props.postingData);
    // console.log('posting image: ', props.postingData.images[0]);

    // props.navigation.navigate('posting', {
    //     // id: props.postingData.id,
    //     ...props.postingData
    // } )

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('posting', {
                // id: props.postingData.id,
                title: props.postingData.title,
                ...props.postingData
            } )} >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: `${props.postingData.images[0]}`}}
                        style={styles.image} />
                </View>
                <View style={{paddingLeft: 5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 20}} >{props.postingData.title}</Text>
                    <Text style={{fontSize: 18}} >{props.postingData.price} euros </Text>
                    <Text style={{color: 'gray', fontSize: 14}} >{props.postingData.category} </Text> 
                    <Text>{props.postingData.location} </Text>
                </View>
            </View>
        </TouchableOpacity>
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
        width: 120,
        height: 105
    }
})
