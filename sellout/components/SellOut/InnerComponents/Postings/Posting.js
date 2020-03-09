import React from 'react'
import { StyleSheet,
         Text, 
         ScrollView,
         Image,
         View } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Posting = ({route, navigation}) => {

    console.log('posting props: ',  route.params);

    const images = [
        `https://sell-0ut.herokuapp.com/public/uploads/${route.params.images[0]}`,
        `https://sell-0ut.herokuapp.com/public/uploads/${route.params.images[1]}`,
        `https://sell-0ut.herokuapp.com/public/uploads/${route.params.images[2]}`,
        `https://sell-0ut.herokuapp.com/public/uploads/${route.params.images[3]}`
    ];

    const width = 250;

    return (
        <ScrollView style={styles.container} >
            <View style={styles.imagesContainer} >
                {/* <Image source={{uri: `https://sell-0ut.herokuapp.com/public/uploads/${route.params.images[0]}`}}
                    style={styles.image} /> */}
                    <SliderBox images={images} />
            </View>
            <View>

            </View>
            <View>
                <View style={styles.oneRow} >
                    <Text> {route.params.title} </Text>
                    <Text> {route.params.price}€  </Text>
                </View>
                <View>
                    <Text> {route.params.category} </Text>
                </View>
                <View style={styles.oneRow} >
                    <Text> {route.params.location} </Text>
                    <Text> {route.params.dateOfPosting.substring(0, 10)} </Text>
                </View>
                <View>
                    <Text> {route.params.description} </Text>
                </View>
                <View >
                    <Text> {route.params.sellerName} </Text>
                    <Text> {route.params.sellerTelephoneNumber} </Text>
                </View>
            </View>
            <View style={styles.goBack} >
                <TouchableOpacity  onPress={() => navigation.goBack() } >
                    <Text style={{fontSize: 18}} > Go back </Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}

export default Posting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    imagesContainer: {
        borderWidth: 4,
        borderColor: 'black'
    },
    image: {
        width: 250,
        height: 250
    },
    oneRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goBack: {
        borderWidth: 2,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
