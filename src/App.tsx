import React from 'react';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './screens/BottomTabsKitten';
import { bottomLeft } from '@shopify/react-native-skia';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <IconRegistry icons={EvaIconsPack} />
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'black', paddingBottom: 20 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </ApplicationProvider >
  );
};

export default App;
