import React, { useState, useEffect } from "react";
import { Link } from "react-router-native";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import * as GoogleSignIn from "expo-google-app-auth";
import config from '../../config';
import { connect } from 'react-redux';
import { getToken, setToken } from '../../Utils/token';

const Login = props => {
  const [user, setUser] = useState();
  useEffect(async () => {
    if (user) {
      // should save user to DB similar to passport
      // props.history.push("/profile");
      await setToken(user.id)
      let token = await getToken()
      console.log(token)
    }
  }, [user]);

  //for use with expo client
  const signInWithGoogle = async () => {
    try {
      const result = await GoogleSignIn.logInAsync({
        iosClientId: config.iosClientId,
        androidClientId: config.androidClientId,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success') {
        setUser(result.user);
      } else {
        return { canceled: true }
      }
    } catch (err) {
      console.log(err);
    }

  }

  //for use with standalone app
  const initAsync = async () => {
    await GoogleSignIn.initAsync();
    syncUserWithStateAsync();
  };

  const syncUserWithStateAsync = async () => {
    const signedInUser = await GoogleSignIn.signInSilentlyAsync();
    if (signedInUser) {
      setUser(signedInUser);
    }
  };

  const signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  };

  const signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, signedInUser } = await GoogleSignIn.signInAsync();
      if (type === "success") {
        syncUserWithStateAsync();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePress = () => {
    if (user) {
      signOutAsync();
    } else {
      signInAsync();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholderTextColor="#F3f4f4"
        autoFocus={true}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        placeholderTextColor="#F3f4f4"
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={signInWithGoogle}>
          Login With Google
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Don't have an account?</Text>
      <Link to="/signup">
        <Text style={styles.linkText}>Sign Up!</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    textAlign: "center",
    backgroundColor: "#04ccbb",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center"
  },
  inputs: {
    borderBottomColor: "#F3f4f4",
    borderBottomWidth: 1,
    fontSize: 35,
    width: 250,
    height: 42,
    marginBottom: 20,
    textAlign: "center",
    color: "#F3f4f4"
  },
  button: {
    backgroundColor: "#f3f4f4",
    borderColor: "#f3f4f4",
    borderWidth: 1,
    minWidth: 200,
    minHeight: 35,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 30
  },
  buttonText: {
    color: "#04ccbb",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600"
  },
  text: {
    color: "#F3f4f4"
  },
  linkText: {
    color: "#F3f4f4",
    textDecorationLine: "underline"
  }
});

export default connect()(Login);
