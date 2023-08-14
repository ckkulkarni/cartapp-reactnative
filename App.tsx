import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Base from "./Apps/Base";
import { Provider } from "react-redux";
import store from "./Apps/redux/store/store";
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Base />
    </Provider>
  );
}

export default App;
