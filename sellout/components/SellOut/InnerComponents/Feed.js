import React, {useState, useEffect} from 'react';
import { StyleSheet, 
         Text, 
         FlatList,
         View, 
         ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Header from './Header';
import Posting from './Postings/Posting';
import PostingFeed from './Postings/PostingFeed';

const Feed = (props) => {

    // Stack navigation stuff
    // const Stack = createStackNavigator();

    const [postings, setPostings] = useState();
    const [isFetching, setIsFetching] = useState(true);

    const useEffectStopper = [0];

    console.log('feed: ',  props);

    useEffect(() => {
        axios.get('https://sell-0ut.herokuapp.com/v1/postings/').then(res => {
            console.log(res.data);
            setPostings(res.data);
            setIsFetching(false);
        }).catch(err => {
            console.log(err);
            setIsFetching(false);
        })
    }, useEffectStopper)

    const FeedItself = () => {

        // console.log('nyah!');

        return (
            <View style={styles.container}>
                {/* <Header style={styles.Header} /> */}
                <View style={styles.feed} >
                    { isFetching ? <ActivityIndicator color='black' size='large' style={{flex: 1}} /> : flatList }
                </View>
            </View>
        )
    } 


    const flatList = <>
        <FlatList data={postings}
                  style={{padding: 5}}
                  renderItem={({item}) => (
            <PostingFeed postingData={item} 
                  keyExtractor={item.id}
                  navigation={props.navigation} >
                <Posting data={item} />
            </PostingFeed>
        )} />
    </>


    return (
        <View style={styles.container}>
            {/* <Header style={styles.Header} /> */}
            <View style={styles.feed} >
                { isFetching ? <ActivityIndicator color='black' size='large' style={{flex: 1}} /> : flatList }
            </View>
        </View>
        // <Stack.Navigator>
        //     <Stack.Screen name='Feed'
        //                   options={{headerShown: false}} >
        //         {props => <FeedItself {...props} />  }
        //     </Stack.Screen>
        //     <Stack.Screen name='auth'>
        //         {props => <Auth {...props} />}
        //     </Stack.Screen>
        // </Stack.Navigator>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center',
        backgroundColor: 'white'
        // alignItems: 'center'
    },
    feed: {
        flex: 10,
        // marginLeft: 5,
        // marginTop: 5,
    }
})
