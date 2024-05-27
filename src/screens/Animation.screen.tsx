import React from "react";
import { BasicAnimations } from "../components/BasicAnimations";
import { DraggableBox } from "../components/DraggableBox";
import { Layout } from "@ui-kitten/components";

import { styles } from "../styles/styles";

export const AnimationScreen: React.FC = () => {

    return (
        <Layout style={styles.containerCentered}>
            <DraggableBox />
            <DraggableBox />
            <DraggableBox />

        </Layout>
    )
}