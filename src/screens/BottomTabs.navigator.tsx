import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "./Home.screen";
import { SettingsScreen } from "./Settings.screen";

const Tabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Home" component={HomeScreen} />
            <Tabs.Screen name="Settings" component={SettingsScreen} />
        </Tabs.Navigator>
    )
}