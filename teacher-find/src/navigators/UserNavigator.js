// navigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Register from '../views/auth/Register';
import Login from '../views/auth/Login';
import Verification from '../views/auth/Verification';
import TabBar from '../components/tabbar/TabBar';
import Filter from '../views/filter/Filter';
import TopTeachers from '../views/top-teachers/TopTeachers';
import AppointDoctor from '../views/appointment-teacher/AppointmentTeacher';
import AppointTeacher from '../views/appointment-teacher/AppointmentTeacher';
import ChatList from '../views/chat/ChatList';
import Chat from '../views/chat/Chat';
// import Login from '../../screens/login/Login';
// import Welcome from '../../screens/welcome/Welcome';
// import Verification from '../../screens/verification/Verification';
// import ForgotPassword from '../../screens/forgot-password/ForgotPassword';
// import TabBar from '../../components/tabbar/Tabbar';
// import Appointment from '../../screens/appointment/Appointment';
// import AppointDoctor from '../../screens/appointment/AppointDoctor';
// import DoctorsOneCategory from '../../screens/doctors/DoctorsOneCategory';
// import UserProfileEdit from '../../screens/user-profile/UserProfileEdit';
// import Chat from '../../screens/chat/Chat';
// import ChatList from '../../screens/chat/ChatList';
// import SavedDoctors from '../../screens/doctors/SavedDoctors';
// import Notification from '../../screens/notification/Notification';
// import Reviews from '../../screens/reviews/Reviews';
import TeacherTabBar from '../components/tabbar/TeacherTabBar';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            {/* <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='DoctorsOneCategory' component={DoctorsOneCategory} />
      <Stack.Screen name='Appointment' component={Appointment} />
      <Stack.Screen name='AppointDoctor' component={AppointDoctor} />
      <Stack.Screen name='Verification' component={Verification} />
      <Stack.Screen name='UserEdit' component={UserProfileEdit} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='ChatList' component={ChatList} />
      <Stack.Screen name='SavedDoctors' component={SavedDoctors} />
      <Stack.Screen name='Notification' component={Notification} />
      <Stack.Screen name='Reviews' component={Reviews} /> */}
            {/* <Stack.Screen
                name='Welcome'
                component={Welcome}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='TabBar'
                component={TabBar}
                options={{
                    headerShown: false,
                }}
            /> */}
            <Stack.Screen name='Verification' component={Verification} />
            <Stack.Screen name='AppointTeacher' component={AppointTeacher} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen
                name='TabBar'
                component={TabBar}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='TabBarTeacher'
                component={TeacherTabBar}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='Filter'
                component={Filter}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='TopTeachers'
                component={TopTeachers}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name='ChatList'
                component={ChatList}
                options={{
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
