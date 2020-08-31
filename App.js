import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import LoginScreen from './src/pages/Login'
import CadastrarScreen from './src/pages/Cadastrar'
import HomeScreen from './src/pages/Home'
import MercadoScreen from './src/pages/Mercado'
import ProdutoScreen from './src/pages/Produto'
import CarrinhoScreen from './src/pages/Carrinho'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerMode: 'none', headerShown: false }} />
            <Stack.Screen name="Cadastrar" component={CadastrarScreen} options={{ headerMode: 'none', headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerMode: 'none', headerShown: false }} />
            <Stack.Screen name="Mercado" component={MercadoScreen} options={{ headerMode: 'none', headerShown: false }} />
            <Stack.Screen name="Produto" component={ProdutoScreen} options={{ headerMode: 'none', headerShown: false }} />
            <Stack.Screen name="Carrinho" component={CarrinhoScreen} options={{ headerMode: 'none', headerShown: false }} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

export default App;