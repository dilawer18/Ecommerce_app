
import "@/lang";
import Routes from '@/navigation/Routes';
import store from "@/redux/store";
import React, { useEffect, useLayoutEffect } from 'react';
import { I18nManager } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { ThemeProvider } from '@/context/ThemeContext';
import { getLocalItem } from "@/utils/checkStorage";

const App = () => {

  useLayoutEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);


    const init = async () => {
      await getLocalItem();
    };

    init().finally(async () => {
      setTimeout(async () => {
        // BootSplash.hide({ fade: true });
      }, 1500);
    });

  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;