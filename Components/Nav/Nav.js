import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

const Nav = (props) => {

    return (
        <View>
            <Link to="/profile">Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
        </View>
    )
}

export default Nav;