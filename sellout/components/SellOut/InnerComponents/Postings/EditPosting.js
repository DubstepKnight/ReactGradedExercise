import React, { useState, useRef } from 'react';
import { StyleSheet, 
         Text, 
         Image,
         ScrollView,
         TextInput,
         TouchableOpacity,
         Switch,
         Alert,
         View, 
         ActivityIndicator} from 'react-native';
import axios from 'axios';
// import UploadImages from './UploadImages';
import * as ImagePicker from 'expo-image-picker';


const EditPosting = (props) => {

    console.log("edit posting: ", props.route.params);

    // useStates for storing data
    const [title, setTitle] = useState(props.route.params.title);
    const [price, setPrice] = useState(props.route.params.price);
    const [description, setDescription] = useState(props.route.params.description);
    const [category, setCategory] = useState(props.route.params.category);
    const [location, setLocation] = useState(props.route.params.location);
    const [isDelivery, setIsDelivery] = useState(false);
    const [deliveryType, setDeliveryType] = useState('');
    const [images, setImages] = useState();
    const [sellerName, setSellerName] = useState(props.route.params.sellerName);
    const [sellerTelephoneNumber, setSellerTelephoneNumber] = useState(props.route.params.sellerTelephoneNumber);

    // useStates for different purposes
    const [isFetching, setIsFetching] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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

    // create posting function that sends the request to backend
    const editHandler = () => {
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("location", location);
        if ( images ) {
            for (let i=0; i < images.length; i++) {
                const fileNameSplit = images[i].uri.split('/');
                const fileName = fileNameSplit[fileNameSplit.length - 1];

                formData.append("images", {
                    uri: images[i].uri,
                    name: fileName,
                    type: 'image'
                } );
            }
        }
        formData.append("price", price);
        formData.append("deliveryType", deliveryType);
        formData.append("sellerId", sellerName);
        formData.append("sellerName", sellerName);
        formData.append("sellerTelephoneNumber", sellerTelephoneNumber);
        console.log('the posting has been created');
        console.log('formData: ', formData);

        axios.put(`https://sell-0ut.herokuapp.com/v1/postings/${props.route.params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${props.jwt}`
            }
        }).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })     

    }

    const onSuccessfulDelete = () => {
        setIsSuccess(true);
        setTimeout(() => {
            props.navigation.popToTop();
        }, 2000 )
    }

    const deleteHandler = () => {
        setIsFetching(true);
        axios.delete(`https://sell-0ut.herokuapp.com/v1/postings/${props.route.params.id}`, {
            headers: {
                'Authorization': `Bearer ${props.jwt}`
            }
        }).then(res => {
            setIsFetching(false);
            console.log(res.data);
            onSuccessfulDelete();
        }).catch(error => {
            console.log(error)
        })
    }

    const deleteAsker = () => {
        Alert.alert(
            'Delete this posting ?',
            'Are you sure you want to delete it?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Delete', onPress: deleteHandler()},
            ],
            {cancelable: true},
          );
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
            { isFetching ? <View> <ActivityIndicator size='large' color='black' /> </View> : 
            <>
            <View>
                <View style={styles.regularRow} >
                    <Text style={styles.label}> Title </Text>
                    <TextInput  placeholder='Title'
                                returnKeyType='next'
                                style={styles.inputBox}
                                defaultValue={props.route.params.title}
                                onSubmitEditing={() => categoryRef.current.focus() }
                                onChangeText={(value) =>  setTitle(value)} />
                </View>
                <View style={styles.oneRow, styles.regularRow } >
                    <Text style={styles.label} > Category </Text>
                    <TextInput  placeholder='Title'
                                returnKeyType='next'
                                style={styles.inputBox}
                                defaultValue={props.route.params.category}
                                ref={categoryRef}
                                onSubmitEditing={() => priceRef.current.focus() }
                                onChangeText={(value) =>  setCategory(value)} />
                </View>
                <View style={styles.regularRow} >
                    <Text style={styles.label} > Price </Text>
                    <TextInput  placeholder='Price'
                                returnKeyType='next'
                                style={styles.inputBox}
                                defaultValue={props.route.params.price}
                                ref={priceRef}
                                onSubmitEditing={() => descriptionRef.current.focus() }
                                onChangeText={(value) =>  setPrice(value)} />
                </View>
                <View style={styles.regularRow} >
                    <Text style={styles.label} > Description </Text>
                    <TextInput  placeholder='Description'
                                returnKeyType='next'
                                style={styles.inputBox}
                                defaultValue={props.route.params.description}
                                ref={descriptionRef}
                                onSubmitEditing={() => locationRef.current.focus() }
                                onChangeText={(value) =>  setDescription(value)} />
                </View>
                <View style={styles.regularRow} >
                    <Text style={styles.label} > Location </Text>
                    <TextInput  placeholder='Location'
                                returnKeyType='next'
                                style={styles.inputBox}
                                defaultValue={props.route.params.location}
                                ref={locationRef}
                                onSubmitEditing={() => priceRef.current.focus() }
                                onChangeText={(value) =>  setLocation(value)} />
                </View>
                <View style={styles.regularRow} >
                    <Text style={styles.label} > Delivery type </Text>
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
                    <Text> You cannot edit images, for now </Text>
                </View>
                <View>
                    <Text style={styles.label} > Info on you </Text>
                    <View style={styles.regularRow} >
                        <Text style={styles.label} > Your name </Text>
                        <TextInput placeholder='Your name'
                                    returnKeyType='next'
                                    style={styles.inputBox}
                                    defaultValue={props.route.params.sellerName}
                                    onSubmitEditing={() => priceRef.current.focus() }
                                    onChangeText={(value) =>  setSellerName(value)} />
                    </View>
                    <View style={styles.regularRow} >
                        <Text style={styles.label} > Your telephone number </Text>
                        <TextInput placeholder='Your telephone number'
                                    returnKeyType='next'
                                    style={styles.inputBox}
                                    defaultValue={props.route.params.sellerTelephoneNumber}
                                    onSubmitEditing={() => priceRef.current.focus() }
                                    onChangeText={(value) =>  setSellerTelephoneNumber(value)} />
                    </View>
                </View>
            </View>
            <View style={{marginTop: 20, marginBottom: 10}}>
                <TouchableOpacity  onPress={() => props.navigation.goBack() } >
                    <View style={styles.goBack} >
                        <Text style={{fontSize: 18, color: 'white'}} > Go back </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => editHandler() } >
                    <View style={styles.createButton} >
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}} > Edit a posting </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => deleteAsker() } >
                    <View style={styles.deleteButton} >
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}} > Delete the posting </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </>
            }
        </ScrollView > 
    )
}

export default EditPosting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: 15
    },
    regularRow: {
        marginTop: 5,
        marginBottom: 5
    },
    pickImageButton: {
        height: 40,
        backgroundColor: 'black',
        // borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputBox: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: 'black',
        padding: 5
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
    deleteButton: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        marginTop: 10
    },  
    goBack: {
        borderWidth: 2,
        backgroundColor: 'black',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
