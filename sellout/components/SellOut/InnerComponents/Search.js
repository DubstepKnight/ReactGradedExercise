import React, { useState, useEffect } from 'react'
import { StyleSheet, 
         Text, 
         Picker,
         FlatList,
         ActivityIndicator,
         View } from 'react-native';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import PostingFeed from './Postings/PostingFeed';
import Posting from './Postings/Posting';

const Search = (props) => {

    const [currentFilter, setCurrentFilter] = useState('category');
    const [searchValue, setSearchValue] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [postings, setPostings] = useState([]);
    const useEffectStopper = [0];

    let parameters = {}

    console.log('postings: ', postings);
    

    // Gets the data from the API
    // useEffect(() => {
    //     // parameters.set(currentFilter, searchValue);
    //     parameters[currentFilter] = searchValue;
    //     axios.get(`https://sell-0ut.herokuapp.com/v1/postings/search/${currentFilter}/`, {
    //         params: {
    //             currentFilter: searchValue
    //         }
    //     }).then(res => {
    //         console.log(res.data);
    //         setPostings(res.data);
    //         setIsFetching(false);
    //     }).catch(err => {
    //         console.log(err);
    //         setIsFetching(false);
    //     })
    // }, useEffectStopper)

    const search = (value) => {
        setSearchValue(value);
        // parameters.set(currentFilter, searchValue);
        parameters[currentFilter] = searchValue;
        axios.get(`https://sell-0ut.herokuapp.com/v1/postings/search/${currentFilter}/`, {
            params: parameters
        }).then(res => {
            console.log(res.data);
            setPostings(res.data);
            setIsFetching(false);
        }).catch(err => {
            console.log(err);
            setIsFetching(false);
        })
    }

    const refreshFeed = () => {
        setIsFetching(true);
        axios.get(`https://sell-0ut.herokuapp.com/v1/postings/search/${currentFilter}/`, {
            params: parameters
        }).then(res => {
            console.log(res.data);
            setPostings(res.data);
            setIsFetching(false);
        }).catch(err => {
            console.log(err);
            setIsFetching(false);
        })
    }


    const flatList = <>
        <FlatList data={postings}
                  style={styles.list}
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
            <View style={{flex: 1, padding: 10, borderBotomWidth: 5, borderColor: 'black'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}} >Search here</Text>
                <TextInput style={styles.search}
                           placeholder='search by date, category or location'
                           onChangeText={value => search(value)}
                            />
            </View>
            <View style={styles.list} >
            <Picker 
                    selectedValue={currentFilter}
                    onValueChange={(value) => setCurrentFilter(value) }
                    mode='dropdown'
                    style={{flex: 1, height: 25, marginBottom: 15}} >
                        <Picker.Item label='Category' value='category' />
                        <Picker.Item label='Date' value='date' />
                        <Picker.Item label='Location' value='location' />
                </Picker>
                { isFetching ? <ActivityIndicator color='black' size='large' style={{flex: 1}} /> : flatList }
            </View>
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
    search: {
        borderWidth: 3,
        borderColor: 'black',
        padding: 5,
        borderRadius: 5
    },
    list: {
        flex: 10
    }
})
