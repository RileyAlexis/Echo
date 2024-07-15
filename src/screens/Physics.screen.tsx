import React from "react";
import { Layout, Text, Button } from "@ui-kitten/components";
import { styles } from "../styles/styles";
import { View } from 'react-native';
import { PhysicsBox } from "../components/PhysicsBox";
import { MatterScene } from "../components/MatterScene";

export const PhysicsScreen: React.FC = () => {
    return (
        <View style={styles.containerCentered}>
            {/* <PhysicsBox /> */}
            {/* <MatterScene /> */}
        </View>
    )
}