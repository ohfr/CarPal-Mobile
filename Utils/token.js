import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
            return value;
        }
    } catch (err) {
        console.log(err);
    }
}

export const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem("token", token);
    } catch(err) {
        console.log(err);
    }
}

