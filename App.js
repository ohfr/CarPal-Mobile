import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './Components/Dashboards/Dashboard';
import Login from './Components/Login-SignUp/Login';
import { Route, NativeRouter } from 'react-router-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const reducer = (state={}, action) => {
  switch(action.type) {
    default:
      return state;
  }
}
const store = createStore(reducer)

export default function App() {
  return (
    <Provider store={store}> 
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" component={Login} />
          <Route path="/profile" component={Dashboard} />
        </View>
      </NativeRouter>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
