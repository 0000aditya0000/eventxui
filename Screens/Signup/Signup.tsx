import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { signup } from '../../Services/Auth/authService';
import Toast from 'react-native-toast-message';

const SignupPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [age,setAge] = useState('');
    const [ageError, setAgeError] = useState('')


    const handleLogin = async () => {
        if (!email) {
            setEmailError('Email field cannot be empty');
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
        if (!password) {
            setPasswordError('Password field cannot be empty');
        } else if (password.length < 3) {
            setPasswordError('Password must be at least 3 characters long');
        } else {
            setPasswordError('');
        }

        

        if (email && password && name && age && phoneNumber && validateEmail(email) && password.length >= 3 && name.length >= 3 && phoneNumber.length >= 10) {
            try {
                await signup(name,age, email, phoneNumber, password);
                    navigation.navigate('Login');
                    Toast.show({
                        text1:"Register Successful",
                        text2: "Your account has been created successfully.",
                        type: 'success',
                      });
                    setEmail('');
                    setName('');
                    setPhoneNumber('');
                    setPassword('');
                }
             catch (error) {
                Toast.show({
                    text1:"Signup Error",
                    text2: error.message ,
                    type: 'error',
                  });
            }
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isDisabled = !email || !age || password.length < 3 || !validateEmail(email) || name.length < 3 || phoneNumber.length < 10;

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image
                source={require('../../assets/loginbg.png')}
                style={styles.backgroundImage}
            />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
                <View style={styles.innerContainer}>
                    <View style={styles.logoContainer}>
                        <Animated.Image
                            entering={FadeInUp.delay(300).duration(3000).springify()}
                            source={require('../../assets/eventx-logo.png')}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Sign Up</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setName(text);
                                    setNameError('');
                                }}
                                value={name}
                                style={styles.input}
                            />
                        </View>
                        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setEmailError('');
                                }}
                                value={email}
                                style={styles.input}
                            />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Phone No'
                                placeholderTextColor={'gray'}
                                onChangeText={(number) => {
                                    if(number.length <= 10){
                                    setPhoneNumber(number);
                                    setPhoneError('');
                                    }
                                }}
                                value={phoneNumber}
                                style={styles.input}
                                keyboardType='numeric'
                            />
                        </View>
                        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Age'
                                placeholderTextColor={'gray'}
                                onChangeText={(number) => {
                                    if(number.length <= 2){
                                    setAge(number);
                                    setAgeError('');
                                    }
                                }}
                                value={age}
                                style={styles.input}
                                keyboardType='numeric'
                            />
                        </View>
                        {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={'gray'}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setPasswordError('');
                                }}
                                value={password}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: isDisabled ? 'gray' : '#d6001c' }]}
                            onPress={handleLogin}
                            disabled={isDisabled}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
              <Text
                style={{ marginLeft: 5, color: '#d6001c', fontWeight: '600' }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginBottom:40
    },
    innerContainer: {
        width: '100%',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        tintColor: '#fff',
        height: 50,
        width: 150,
    },
    titleContainer: {
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 120
    },
    title: {
        fontSize: 35,
        color: '#fff',
        fontWeight: '700',
    },
    formContainer: {
        alignItems: 'center',
        gap: 5,
    },
    inputContainer: {
        backgroundColor: 'rgb(245 245 244)',
        padding: 12,
        borderRadius: 15,
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
    },
    errorText: {
        color: 'red',
    },
    button: {
        width: '100%',
        padding: 12,
        borderRadius: 15,
    },
    buttonText: {
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default SignupPage;
