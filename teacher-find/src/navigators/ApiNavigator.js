// import { useState } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import UserNavigator from '../navigators/UserNavigator';
// // import DoctorNavigator from './doctor-navigator/DoctorNavigator';
// // import AsyncStorage from '@react-native-async-storage/async-storage';

// const Stack = createStackNavigator();

// const AppNavigator = () => {

//     // useEffect(() => {
//     //     const fetchRole = async () => {
//     //         try {
//     //             const storedRole = await AsyncStorage.getItem('role');
//     //             setRole(storedRole || '');
//     //         } catch (error) {
//     //             console.error('Error fetching role from AsyncStorage:', error);
//     //         }
//     //     };

//     //     fetchRole();
//     // }, []);

//     return <UserNavigator />
// };

// export default AppNavigator;


import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import UserNavigator from './user-navigator/UserNavigator';
import UserNavigator from './UserNavigator'
import TeacherNavigator from './TeacherNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const storedRole = await AsyncStorage.getItem('role');
                //@ts-ignore
                setRole(storedRole || 'client');
            } catch (error) {
                console.error('Error fetching role from AsyncStorage:', error);
                setRole(null);
            }
        };
        fetchRole();
    }, []);
    if (role === null) {
        return <Text>Loading</Text>;
    }
    return role === 'student' ? <UserNavigator /> : <TeacherNavigator />;
};

export default AppNavigator;
