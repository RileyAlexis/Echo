import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNavigation, BottomNavigationTab, Text } from "@ui-kitten/components";

import { HomeScreen } from "./Home.screen";
import { SettingsScreen } from "./Settings.screen";
import { NavigationContainer } from "@react-navigation/native";

import { styles } from "../styles/styles";
import { VoiceScreen } from "./Voice.screens";

const { Navigator, Screen } = createBottomTabNavigator();

interface BottomTabBarProps {
    navigation: any;
    state: any;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
        appearance="default"
        style={styles.bottomTabs}
    >
        <BottomNavigationTab title={evaProps => <Text {...evaProps}>Home</Text>} />
        <BottomNavigationTab title="Settings" />
        <BottomNavigationTab title="Voice" />
    </BottomNavigation>
)

const TabNavigator = () => (
    < Navigator tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Settings" component={SettingsScreen} />
        <Screen name="Voice" component={VoiceScreen} />
    </Navigator >
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);