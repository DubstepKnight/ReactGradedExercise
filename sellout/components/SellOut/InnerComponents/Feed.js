import React, {useState, useEffect} from 'react';
import { StyleSheet, 
         Text, 
         FlatList,
         View, 
         ActivityIndicator} from 'react-native';
import axios from 'axios';
import Header from './Header';
import Posting from './Postings/Posting';
import PostingFeed from './Postings/PostingFeed';

const Feed = (props) => {

    // Stack navigation stuff
    // const Stack = createStackNavigator();

    const [postings, setPostings] = useState();
    const [isFetching, setIsFetching] = useState(true);
    
    console.log('feed: ',  props);
    
    const useEffectStopper = [0];

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
            <View style={styles.feed} >
                { isFetching ? <ActivityIndicator color='black' size='large' style={{flex: 1}} /> : flatList }
            </View>
        </View>
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
