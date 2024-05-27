import React from 'react';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './screens/BottomTabsKitten';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <IconRegistry icons={EvaIconsPack} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={{ flex: 1 }}>
            <AppNavigator />
          </Layout>
        </SafeAreaView>
      </GestureHandlerRootView>
    </ApplicationProvider>
  );
};

export default App;
