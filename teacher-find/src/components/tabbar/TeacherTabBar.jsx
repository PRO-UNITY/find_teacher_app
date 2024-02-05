import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../../views/user-profile/UserProfile';
import Home from '../../views/home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import HeaderTitle from '../header/HeaderTitle';
import { useIsFocused } from '@react-navigation/native';
import SavedTeachers from '../../views/saved-teachers/SavedTeachers';
import ChatList from '../../views/chat/ChatList';
import { greenColor } from '../../utils/colors';

const Tab = createBottomTabNavigator();

const TabBar = ({ navigation }) => {
    const isFocused = useIsFocused();

    const headersTitleIcons = [
        {
            name: 'notifications',
            color: greenColor,
            size: 25,
            screen: 'Notification',
        },
    ];

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: greenColor,
                inactiveTintColor: 'gray',
                style: styles.tabBar,
            }}
        >
            <Tab.Screen
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home-outline' color={color} size={size} />
                    ),
                    headerTitle: () => (
                        <View style={styles.header}>
                            <HeaderTitle icons={headersTitleIcons} navigation={navigation} />
                        </View>
                    ),
                }}
                name='Home'
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarLabel: 'ChatList',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='chatbox-outline' color={color} size={size} />
                    ),
                }}
                name='ChatList'
                component={ChatList}
            />

            <Tab.Screen
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='person-outline' color={color} size={size} />
                    ),
                }}
                name='User'
                component={UserProfile}
            />
        </Tab.Navigator>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingHorizontal: 16,
    },
    tabBar: {
        backgroundColor: 'white', // Change to your desired color
        borderTopWidth: 1,
        borderTopColor: 'gray', // Change to your desired color
    },
});
