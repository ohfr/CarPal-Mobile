import React from 'react';
import { Route, Redirect } from 'react-router-native';

const ProtectedRoute = (props) => {
    const {
        component: Component,
        ...rest
    } = props;
    return (
        <Route {...rest} render={(renderProps) => "" } />
    )
}