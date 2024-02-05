import { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    View,
} from 'react-native';
import React from 'react';
import { mainColor } from '../../utils/colors';

const Login = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const data = {
            phone,
            password,
        };
        // navigation.navigate('TabBar');
        navigation.navigate('TabBarTeacher');
        // loginUser(data)
        //   .then(async (res) => {
        //     await AsyncStorage.setItem('token', res.access)
        //       .then(() => {
        //         getUserProfile().then(async (res) => {
        //           await AsyncStorage.setItem('role', res.role).then(() => {
        //             showAsyncStorage();
        //             const userRole = res.role;
        //             if (userRole === 'patient') {
        //               navigation.navigate('TabBar');
        //             } else if (userRole === 'doctor') {
        //               navigation.navigate('DoctorTabBar');
        //             }
        //           });
        //         });
        //       })
        //       .catch((err) => {
        //         console.log(err);
        //       });
        //     clearInputs([setPhone, setPassword]);
        //   })
        //   .catch(() => {
        //     Alert.alert('Login Failed', 'Username or password is incorrect.');
        //   });
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    const navigateToForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.heading}>Let's Sign You In</Text>
                <Text style={styles.subheading}>Let us get to know you better!</Text>
            </View>
            <View style={styles.registerContainer}>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder='Phone Number'
                    keyboardType='phone-pad'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    keyboardType='default'
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.haveAccountContainer}>
                    <Text style={styles.text}>Don't have an account?</Text>
                    <TouchableOpacity onPress={navigateToRegister}>
                        <Text style={styles.linkText}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.haveAccountContainer}>
                    <TouchableOpacity onPress={navigateToForgotPassword}>
                        <Text style={styles.forgotLink}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingHorizontal: 25,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 18,
        color: '#979C9E',
        textAlign: 'left',
    },
    // inputs
    registerContainer: {
        marginTop: 30,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        backgroundColor: mainColor,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    haveAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        fontSize: 16,
        color: '#404446',
    },
    linkText: {
        fontSize: 16,
        color: '#FF7360',
        fontWeight: 'bold',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
    forgotLink: {
        fontSize: 16,
        color: '#054A80',
        fontWeight: 'bold',
        marginLeft: 5,
        textDecorationLine: 'underline',
    },
});
