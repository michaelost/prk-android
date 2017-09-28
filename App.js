import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
var BTClient = require('react-native-braintree-xplat');

export default class App extends React.Component {
  componentDidMount() {

    (async ()=>{
      const token = await this.getClientToken();
      BTClient.setup(token);
    })();
  }

  getClientToken() {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.31.42:8080/api/client_token').then((res) => {
        resolve(res.text()); 
      })
    })
  }

  showModalForm() {
    BTClient.showPaymentViewController({
      bgColor: '#FFF',
      tintColor: 'red',
      barBgColor: 'green',
      barTintColor: 'white',
    }).then(function(nonce) {
      //payment succeeded, pass nonce to server
    })
    .catch(function(err) {
      //error handling
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Shake11111</Text>
        <TouchableOpacity onPress={this.showModalForm}>
          <Text>Pay</Text>
        </TouchableOpacity>
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
