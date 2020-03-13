import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, 
         Text, 
         FlatList,
         View, 
         ActivityIndicator} from 'react-native';
import Posting from './Postings/Posting';
import PostingFeed from './Postings/PostingFeed';

const Library = (props) => {

    const [postings, setPostings] = useState();
    const [isFetching, setIsFetching] = useState(true);

    const useEffectStopper = [0];

    console.log('postings library: 1', postings);

    useEffect(() => {
        axios.get('https://sell-0ut.herokuapp.com/v1/postings/seller', {
            headers: {
                Authorization : `Bearer ${props.jwt}`
            }
        }).then(res => {
            console.log(res.data);
            setPostings(res.data);
            setIsFetching(false);
        }).catch(err => {
            console.log(err);
            setIsFetching(false);
        })
    }, useEffectStopper)

    console.log('postings library: 2', postings);

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

export default Library

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    feed: {
        flex: 10,
    }
})
