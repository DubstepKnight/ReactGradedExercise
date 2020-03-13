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

    // const images = [
    //     route.params.images[0],
    //     route.params.images[1],
    //     route.params.images[2],
    //     route.params.images[3]
    // ];
    const images = route.params.images.map(image => image);

    const width = 250;

    return (
        <ScrollView style={styles.container} >
            <View style={styles.imagesContainer} >
                <SliderBox images={images}
                            dotColor='black'
                            inactiveDotColor='white'
                            ImageComponentStyle={styles.image}
                            imageLoadingColor='black'
                            dotStyle={{
                                width: 30,
                                marginTop: 20
                            }} />
            </View>
            <View style={{padding: 5}} >
                <View style={styles.oneRow} >
                    <Text style={{fontSize: 24, fontWeight: 'bold'}} >{route.params.title}</Text>
                </View>
                <View style={{marginTop: 5}} >
                    <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}} >{route.params.price}€</Text>
                    <Text >{route.params.category}</Text>
                </View>
                <View style={styles.oneRow} >
                    <Text>{route.params.location}</Text>
                    <Text>{route.params.dateOfPosting.substring(0, 10)}</Text>
                </View>
                <View style={{marginTop: 20,}} >
                    <Text style={{ fontStyle: 'italic' }} >{route.params.description}</Text>
                </View>
                <View style={{marginTop: 10}} >
                    <Text>{route.params.sellerName}</Text>
                    <Text>{route.params.sellerTelephoneNumber}</Text>
                </View>
            </View>
            <View style={{padding: 5}} >
                <View style={styles.goBack} >
                    <TouchableOpacity  onPress={() => navigation.goBack() } >
                        <Text style={{fontSize: 18}} > Go back </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.editButton} >
                    <TouchableOpacity  onPress={() => navigation.navigate('editPosting', {
                    title: route.params.title,
                    ...route.params
                }) } >
                        <Text style={{fontSize: 18}} > Edit </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}

export default Posting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 18
    },
    imagesContainer: {
        // borderWidth: 4,
        // borderColor: 'black'
    },
    image: {
        // width: 300,
        height: 250
    },
    oneRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    goBack: {
        borderWidth: 2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    editButton: {
        borderWidth: 2,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})
