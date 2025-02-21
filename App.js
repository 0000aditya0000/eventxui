import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './Screens/Homepage/Homepage';
import ViewEvent from './Components/ViewEvent/ViewEvent';
import CustomDrawer from './Components/CustomDrawer/CustomDrawer';
import React from 'react';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
import MainHeader from './Components/MainHeader/MainHeader';
import LoginPage from './Screens/Login/Login';
import EventList from './Components/EventList/EventList';
import AddEvent from './Components/AddEvent/AddEvent';
import EventRegistrationForm from './Components/EventRegistration/EventRegistrationForm';
import UserProfile from './Components/UserProfile/UserProfile';
import AdminDashboard from './Screens/Admin/Home/AdminDashboard';
import { AuthProvider, useAuth } from './Context/AuthContext';
import SignupPage from './Screens/Signup/Signup';
import { UserProvider } from './Context/UserContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './ToastConfig';
import MyBookings from './Components/MyBookings/MyBookings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const SignOut = ({ navigation }) => {
  React.useEffect(() => {
    signOut(navigation);
  }, [navigation]);

  return null;
};

const signOut = async (navigation) => {
  try {
    await AsyncStorage.removeItem('loggedIn');
    await AsyncStorage.removeItem('token');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (e) {
    Toast.show({
      text1: "Error",
      text2: e.message,
      type: 'error',
    });
  }
};

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: true,
        header: (props) => <MainHeader {...props} isStack={true} />,
      }}
    >
      <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      <Stack.Screen name='Signup' component={SignupPage} options={{ headerShown: false }} />
      <Stack.Screen name='User Profile' component={UserProfile} options={{ headerShown: false }} />
      <Stack.Screen name='HomePage' component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='ViewEvent' component={ViewEvent} options={{ headerShown: true }} />
      <Stack.Screen name='EventRegistration' component={EventRegistrationForm} options={{ headerShown: true }} />
      <Stack.Screen name='AdminDashboard' component={DrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='MyBookings' component={MyBookings} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  const { user } = useAuth();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#d6001c',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: '-10%',
          fontSize: 15,
          fontWeight: '600',
        },
        headerShown: true,
        header: (props) => <MainHeader {...props} />,
      }}
    >
      {user?.role === 'admin' ? (
        <>
          <Drawer.Screen
            name={'Admin'}
            component={AdminDashboard}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='home-outline' size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name='Add a Event'
            component={AddEvent}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='create-outline' size={22} color={color} />,
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen
            name='Home'
            component={HomePage}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='home-outline' size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name='Profile'
            component={UserProfile}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='person-outline' size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name='Trending Events'
            component={EventList}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='flame-outline' size={22} color={color} />,
            }}
          />
          <Drawer.Screen
            name='Upcoming Events'
            component={EventList}
            options={{
              drawerIcon: ({ color }) => <Ionicons name='browsers-outline' size={24} color={color} />,
            }}
          />
          <Drawer.Screen
            name='My Bookings'
            component={MyBookings}
            options={{
              drawerIcon: ({ color }) => <MaterialCommunityIcons name='ticket-confirmation-outline' size={24} color={color} />,
            }}
          />
        </>
      )}
      <Drawer.Screen
        name='Sign Out'
        component={SignOut}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => <Ionicons name='log-out-outline' size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <RootStackNavigator />
          <Toast config={toastConfig} position={'bottom'} />
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}
