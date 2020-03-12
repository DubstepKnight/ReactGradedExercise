import React, { useState, useRef } from 'react';
import { StyleSheet, 
         Text, 
         Image,
         ScrollView,
         TextInput,
         TouchableOpacity,
         Switch,
         View } from 'react-native';
import axios from 'axios';
import qs from 'qs';
import * as ImagePicker from 'expo-image-picker';


const CreatePosting = (props) => {

    // console.log("create posting: ", props);

    // useStates for storing data
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [isDelivery, setIsDelivery] = useState(false);
    const [deliveryType, setDeliveryType] = useState('');
    const [images, setImages] = useState();
    const [sellerName, setSellerName] = useState('');
    const [sellerTelephoneNumber, setSellerTelephoneNumber] = useState('');

    // Text input fields refs
    const priceRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const locationRef = useRef();
    const deliveryTypeRef = useRef();
    const sellerNameRef = useRef();
    const sellerTelephoneNumberRef = useRef();

    // Picks an image
    const pickImage = async () => {

        // Permission to get an image
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }

        if ( images && images.length != 4) {
            let severalImages = [...images];
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });
            if (image.cancelled) {
                console.log('image get was cancelled');
            } else {
                console.log('image: ', image);
                severalImages.push(image);
                setImages(severalImages);
                console.log('images: ',  images);
            }
        } else if ( !images ) {
            let severalImages = [];
            let image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All
            });
            if ( image.cancelled) {
                console.log('image get was cancelled');
            } else {
                console.log('image: ', image);
                severalImages.push(image);
                setImages(severalImages);
                console.log('images: ',  images);
            }
        } else {
            alert('You can only select 4 photos, no more than that');
        }
    }

    // const fileNameSplit = pickerResult.uri.split('/');
    // const fileName = fileNameSplit[fileNameSplit.length - 1];

    // let postForm = new FormData();
    // postForm.append('myFiles', {
    //   uri: pickerResult.uri,
    //   name: fileName,
    //   type: 'image/jpeg'
    // });
    // postForm.append('foo', 'bar');

   

    // create posting function that sends the request to backend
    const createHandler = () => {
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("location", location);
        for (let i=0; i < images.length; i++) {
            formData.append("images", {
                uri: images[i].uri,
                type: 'image/jpeg'
            });
        }
        formData.append("price", price);
        formData.append("deliveryType", deliveryType);
        formData.append("sellerName", sellerName);
        formData.append("sellerTelephoneNumber", sellerTelephoneNumber);
        console.log('the posting has been created');
        console.log('formData: ', formData);

        axios.post('https://sell-0ut.herokuapp.com/v1/postings/',{
            headers: {
                "Authorization": `Bearer ${props.jwt}`
            }
        }, formData ).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })     
    }

    console.log('create posting props: ',  props.jwt);

    const deliverySetterHandler = () => {
        console.log('switch has been turned');
        if ( isDelivery) {
            setIsDelivery(false);
        } else {
            setIsDelivery(true);
        }
    }

    console.log("images: ", images);



    return (
        <ScrollView style={styles.container} >
            <View>
                <View>
                <Text> Title </Text>
                <TextInput  placeholder='Title'
                            returnKeyType='next'
                            onSubmitEditing={() => categoryRef.current.focus() }
                            onChangeText={(value) =>  setTitle(value)} />
                </View>
                <View style={styles.oneRow} >
                    <Text> Category </Text>
                    <TextInput  placeholder='Title'
                                returnKeyType='next'
                                ref={categoryRef}
                                onSubmitEditing={() => priceRef.current.focus() }
                                onChangeText={(value) =>  setCategory(value)} />
                </View>
                <View>
                    <Text> Price </Text>
                    <TextInput  placeholder='Price'
                                returnKeyType='next'
                                ref={priceRef}
                                onSubmitEditing={() => descriptionRef.current.focus() }
                                onChangeText={(value) =>  setPrice(value)} />
                </View>
                <View style={styles.oneRow} >
                    <Text> Description </Text>
                    <TextInput  placeholder='Description'
                                returnKeyType='next'
                                ref={descriptionRef}
                                onSubmitEditing={() => locationRef.current.focus() }
                                onChangeText={(value) =>  setDescription(value)} />
                </View>
                <View>
                    <Text> Location </Text>
                    <TextInput  placeholder='Location'
                                returnKeyType='next'
                                ref={locationRef}
                                onSubmitEditing={() => priceRef.current.focus() }
                                onChangeText={(value) =>  setLocation(value)} />
                </View>
                <View >
                    <Text> Delivery type </Text>
                    <View style={styles.deliveryChoice}>
                        <Text style={{fontSize: 18} [isDelivery ? styles.chosenType : styles.nonChosenType] } > Pick Up </Text>
                        <Switch onChange={deliverySetterHandler}
                                value={isDelivery}
                                trackColor='blue'
                                ios_backgroundColor='white' >
                        </Switch>
                        <Text style={{fontSize: 18} [isDelivery ? styles.chosenType : styles.nonChosenType] } > Delivery </Text>
                    </View>
                </View>
                <TouchableOpacity  onPress={() => pickImage() } >
                    <View style={styles.pickImageButton} >
                        <Text style={{fontSize: 18, color: 'white'}} > Pick images </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.pickedImages} >
                    { images ? images.map(image => <Image source={{uri: image.uri}} style={styles.pickerImage} /> ) : null }
                </View>
                <View>
                    <Image />
                </View>
                <View>
                    <Text> Info on you </Text>
                    <View >
                        <Text> Your name </Text>
                        <TextInput placeholder='Your name'
                                    returnKeyType='next'
                                    onSubmitEditing={() => priceRef.current.focus() }
                                    onChangeText={(value) =>  setSellerName(value)} />
                    </View>
                    <View >
                        <Text> Your telephone number </Text>
                        <TextInput placeholder='Your telephone number'
                                    returnKeyType='next'
                                    onSubmitEditing={() => priceRef.current.focus() }
                                    onChangeText={(value) =>  setSellerTelephoneNumber(value)} />
                    </View>
                </View>
            </View>
            <TouchableOpacity  onPress={() => props.navigation.goBack() } >
                <View style={styles.goBack} >
                    <Text style={{fontSize: 18}} > Go back </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={() =>createHandler() } >
                <View style={styles.createButton} >
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}} > Create a posting </Text>
                </View>
            </TouchableOpacity>
        </ScrollView >
    )
}

export default CreatePosting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: 15
    },
    pickImageButton: {
        height: 40,
        backgroundColor: 'black',
        // borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 250
    },
    pickedImages: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        // justifyContent: 'space-between'
    },
    pickerImage: {
        width: 75, 
        height: 75, 
        backgroundColor: 'blue',
        marginLeft: 2
    },
    oneRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deliveryChoice: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    chosenType: {
        color: 'gray'
    },
    nonChosenType: {
        color: 'black'
    },
    createButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        marginTop: 10
    },  
    goBack: {
        borderWidth: 2,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
