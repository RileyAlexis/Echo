import { Layout } from "@ui-kitten/components"
import { Dimensions } from "react-native";
import { Circle, Group } from '@shopify/react-native-skia';

import { SkiaCanvas } from "../components/SkiaCanvas"

import { styles } from "../styles/styles";

interface CanvasScreenProps {
    navigation: any
}

export const CanvasScreen: React.FC<CanvasScreenProps> = ({ navigation }) => {

    const { height, width } = Dimensions.get('window');
    const r = height * 0.33;

    return (
        <Layout style={styles.containerCentered}>
            <SkiaCanvas width={width} height={height}>
                <Group blendMode="multiply">
                    <Circle cx={r} cy={r} r={r} color="cyan" />
                    <Circle cx={width - r} cy={r} r={r} color="magenta" />
                    <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
                </Group>
            </SkiaCanvas>

        </Layout>
    );
}