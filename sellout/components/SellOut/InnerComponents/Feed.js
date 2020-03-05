import React, {useState, useEffect} from 'react';
import { StyleSheet, 
         Text, 
         FlatList,
         View } from 'react-native';
import axios from 'axios';
import Header from './Header';
import PostingFeed from './Postings/PostingFeed';

const Feed = () => {

    const [postings, setPostings] = useState();

    useEffect(() => {
        axios.get('https://sell-0ut.herokuapp.com/v1/postings/').then(res => {
            console.log(res.data);
            setPostings(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, 0)


    return (
        <View style={styles.container}>
            <Header style={styles.Header} />
            <View style={styles.feed} >
                <FlatList data={postings}
                          renderItem={({item}) => (
                              <PostingFeed postingData={item} />
                          )} />
            </View>
        </View>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    Header: {
        flex: 1,
        // justifyContent: 'center'
    },
    feed: {
        flex: 10
    }
})
