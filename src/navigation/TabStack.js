import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Category from '../screens/Category';
import WishList from '../screens/WishList';
import Profile from '../screens/Profile';
import ItemsScreen from '../screens/ItemsScreen';
const Tab = createBottomTabNavigator();

export const TabStack = ({}) => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        title: null,
        tabBarStyle: {
          width: '100%',
          height: 70,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingTop: 10,
          justifyContent: 'center',
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
      
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'md-home-sharp' : 'md-home-outline'}
              size={25}
              style={styles.icon(focused)}
              color={focused ? 'rgb(39,	72	,220	)' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              size={25}
              style={styles.icon(focused)}
              name={focused ? 'grid' : 'grid-outline'}
              color={focused ? 'rgb(39,	72	,220	)' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WishList"
        component={WishList}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              size={25}
              style={styles.icon(focused)}
              name={focused ? 'heart' : 'heart-outline'}
              color={focused ? 'rgb(39,	72	,220	)' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              size={25}
              style={styles.icon(focused)}
              name={focused ? 'person' : 'person-outline'}
              color={focused ? 'rgb(39,	72	,220	)' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ItemsScreen"
        component={ItemsScreen}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: focused => ({
    shadowOpacity: focused && 0.3,
    shadowColor: focused && 'rgb(39,	72	,220	)',
    shadowOffset: {width: 0, height: 6},
  }),
});
