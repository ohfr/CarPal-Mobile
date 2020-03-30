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
// import * as GoogleSignIn from "expo-google-sign-in";
import config from '../../config';
import { connect } from 'react-redux';
import { getToken, setToken } from '../../Utils/token';
import api from '../../Utils/api';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-community/google-signin';

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [googleUser, setGoogleUser] = useState();

  useEffect(() => {
    // if (user) {
    //   // should save user to DB similar to passport
    //   // props.history.push("/profile");
    //   await setToken(user.id)
    //   let token = await getToken()
    //   console.log(token)
    //   props.history.push("/profile")
    // } else {
    //   initAsync();
    // }
      // try {
      //   initAsync();
      // } catch (err) {
      //   console.log(err)
      // }
      GoogleSignin.configure();
      getCurrentUser();
    console.log(user);
  }, [user]);

  //for use with expo client
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await GoogleSignIn.logInAsync({
  //       iosClientId: config.iosClientId,
  //       androidClientId: config.androidClientId,
  //       scopes: ['profile', 'email']
  //     });
  //     if (result.type === 'success') {
  //       setUser(result.user);
  //     } else {
  //       return { canceled: true }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  // }

  //for use with standalone app
  // const initAsync = async () => {
  //   try {
  //     await GoogleSignIn.initAsync();
  //     syncUserWithStateAsync();
  //   } catch (err) {
  //     console.log(err, "INIT")
  //   }
  // };

  // const syncUserWithStateAsync = async () => {
  //   try {
  //     const signedInUser = await GoogleSignIn.signInSilentlyAsync();
  //     console.log(signedInUser, "signedinUser")
  //     if (signedInUser) {
  //       setUser(signedInUser);
  //       console.log(user)
  //     }
  //   } catch (err) {
  //     console.log(err, "SYNC USER")
  //   }
  // };

  // const signOutAsync = async () => {
  //   await GoogleSignIn.signOutAsync();
  //   setUser(null);
  // };

  // const signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     console.log("after ask for play")
  //     const { type } = await GoogleSignIn.signInAsync();
  //     console.log(type, "type")
  //     if (type === "success") {
  //       syncUserWithStateAsync();
  //     }
  //   } catch (err) {
  //     console.log(err, "SIGN IN ");
  //   }
  // };

  // const handlePress = () => {
  //   if (user) {
  //     signOutAsync();
  //   } else {
  //     signInAsync();
  //   }
  // };

  const handleInput = (name, text) => {
    setUser({
      ...user,
      [name]: text
    })
  }


  const handleLogin = (e) => {
    api().post("/auth/login", user)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleUser(userInfo);
    }catch(err) {
      console.log(err);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("user canceled");
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log("in progress");
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available");
      } else {
        console.log("other");
      }
    }
  }

  const [loggedIn, setLoggedIn] = useState();

  const getCurrentUser = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setGoogleUser(userInfo);
    } catch(err) {
      if (err.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log("not signed in");
      } else {
        console.log('something else')
      }
    }
  }

  const isUserSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    setLoggedIn(isSignedIn);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputs}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholderTextColor="#F3f4f4"
        autoFocus={true}
        onChangeText={text => handleInput("email", text)}
      />
      <TextInput
        style={styles.inputs}
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        placeholderTextColor="#F3f4f4"
        onChangeText={text => handleInput("password", text)}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Login With Google
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Don't have an account?</Text>
      <Link to="/signup">
        <Text style={styles.linkText}>Sign Up!</Text>
      </Link>
      <GoogleSigninButton onPress={signIn} />
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

export default connect(null, [])(Login);
