import React from "react";
import { DraggableBox } from "../components/DraggableBox";
import { Layout } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import { BasicAnimations } from "../components/BasicAnimations";
import { styles } from "../styles/styles";
import { SafeAreaView } from "react-native-safe-area-context";

export const AnimationScreen: React.FC = () => {

    return (
        <Layout style={styles.containerCentered}>
            <Layout style={local.container}>
                <BasicAnimations />
                {/* <DraggableBox>
                    <View style={local.redBox} />
                </DraggableBox>
                <DraggableBox>
                    <View style={local.redBox} />
                </DraggableBox>
                <DraggableBox>
                    <View style={local.redBox} />
                </DraggableBox> */}
            </Layout>
        </Layout>
    )
}

const local = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'pink',
        height: '100%',
        width: '100%',
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    redBox: {
        width: 120,
        height: 120,
        backgroundColor: 'crimson',
        borderRadius: 20
    }
})