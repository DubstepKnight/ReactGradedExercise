import React, { useState, useEffect } from 'react'
import { StyleSheet, 
         Text, 
         Picker,
         FlatList,
         ActivityIndicator,
         View } from 'react-native'
import axios from 'axios';

const Search = () => {

    const [currentFilter, setCurrentFilter] = useState('category');
    const [searchValue, setSearchValue] = useState('');
    const [isFetching, setIsFetching] = useState(true);
    const [postings, setPostings] = useState('');
    const useEffectStopper = [0];

    // Gets the data from the API
    useEffect(() => {
        axios.get(`https://sell-0ut.herokuapp.com/v1/postings/search/${currentFilter}/`, {
            params: {
                currentFilter: searchValue
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

    const FeedItself = () => {
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
                  onRefresh={() => refreshFeed()}
                  refreshing={isFetching}
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
            <Picker 
                selectedValue={currentFilter}
                onValueChange={(value) => setCurrentFilter(value) }
                mode='dropdown'
                style={{flex: 1, height: 25, marginBottom: 15}} >
                    <Picker.Item label='Category' value='category' />
                    <Picker.Item label='Date' value='date' />
                    <Picker.Item label='Location' value='location' />
            </Picker>
            {/* <View style={styles.feed} >
                { isFetching ? <ActivityIndicator color='black' size='large' style={{flex: 1}} /> : flatList }
            </View> */}
            {/* <View style={styles.list} >
                <Text> sdasdasdasdasd </Text>
            </View> */}
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    list: {
        flex: 9
    }
})
