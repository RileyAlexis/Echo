import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomNavigation, BottomNavigationTab, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";

//Screens
import { HomeScreen } from "./Home.screen";
import { Isomorph } from "./Isomorph.screen";
import { AnimationScreen } from "./Animation.screen";
import { VoiceScreen } from "./Voice.screens";
import { PhysicsScreen } from "./Physics.screen";
import { MappingScreen } from "./Mapping.screen";

import { styles } from "../styles/styles";

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
        <BottomNavigationTab title="Map" />
        <BottomNavigationTab title="Isomorph" />
        <BottomNavigationTab title="Voice" />
        {/* <BottomNavigationTab title="Physics" /> */}
        <BottomNavigationTab title="Animation" />
    </BottomNavigation>
)

const TabNavigator = () => (
    < Navigator tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Map" component={MappingScreen} />
        <Screen name="Isomorph" component={Isomorph} />
        <Screen name="Voice" component={VoiceScreen} />
        {/* <Screen name="Physics" component={PhysicsScreen} /> */}
        <Screen name="Animation" component={AnimationScreen} />
    </Navigator >
);

export const AppNavigator = () => (
    <NavigationContainer>
        <TabNavigator />
    </NavigationContainer>
);