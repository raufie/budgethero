import React, { useState } from 'react';
import { View, SafeAreaView  } from "react-native"
import { Text, Block,Button } from 'galio-framework'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screens
import Login from '../Login/Login'
import ExpensesStack from '../Stacks/ExpensesStack'
import AssetsStack from '../Stacks/AssetsStack'
import AddAssetStack from '../Stacks/AddAssetStack'
import AddExpenseStack from '../Stacks/AddExpenseStack'
import AddItem from '../AddItem/AddItem'
import StatsStack from '../Stacks/StatsStack'
// icons
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator()

const TabNavigationContainer = (props)=>{
    return (
        <NavigationContainer >
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Add Expense" component={AddExpenseStack} options={{tabBarIcon:()=><MaterialIcons name="add-circle-outline" size={24} color="black" />}}/>
                <Tab.Screen name="Add Asset" component={AddAssetStack}options={{tabBarIcon:()=><MaterialIcons name="add-moderator" size={24} color="black" />}}/>
                <Tab.Screen name="Expenses" component={ExpensesStack} options={{tabBarIcon:()=><MaterialCommunityIcons name="food-variant" size={24} color="black" />}}/>
                <Tab.Screen name="Assets" component={AssetsStack}options={{tabBarIcon:()=><FontAwesome name="money" size={24} color="black" />}}/>
                <Tab.Screen name="Stats" children={()=><StatsStack reloadApp={props.reloadApp}/>} options={{tabBarIcon:()=><Ionicons name="stats-chart" size={24} color="black" />}}/>
            </Tab.Navigator>

        </NavigationContainer>
 
    )
}
export default TabNavigationContainer
