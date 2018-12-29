/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert,AsyncStorage} from 'react-native';



export default class App extends Component {
  constructor(props){
    super(props);
    this.navigation = this.props.navigation;
    this.socket = new WebSocket("ws://192.168.2.7:8080/AddingHelp/actions");
    this.socket.onmessage = (event) =>{
      var user = JSON.parse(event.data);
      if (user.action === "login_succes") {
        this.navigation.navigate('Loading',{socket:this.socket});
      }
    }
    this.getLogInInfo = this.getLogInInfo.bind(this);
    this.login = this.login.bind(this);
  }

  static navigationOptions = {
    title: 'App' ,
    header:null,
  };

  componentDidMount(){
    this.getLogInInfo();
  }
  async getLogInInfo(){
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      if (username !== null || password !== null) {
        // We have data!!
        this.login(username,password);
      }else{
        this.navigation.navigate("Login",{socket:this.socket});
      }
     } catch (error) {
       console.log(error.message);
     }
  }

  login(username,password){
    var UserAction = {
      action: "login",
      name: username,
      pass: password
    };
    this.socket.send(JSON.stringify(UserAction));
  }
  render() {
    return (
      <View>
      </View>
    );
  }
}
