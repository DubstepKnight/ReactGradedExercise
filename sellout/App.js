import React from 'react';
// import Auth from ''
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // jwt
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
