import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log('LOGIN');
    console.log(email);
    console.log(password);
    props.navigation.navigate('Home');
  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#F6F6F6' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 32 }}>
          <View>
            <TextInput
              style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
              placeholder={'Digite o email...'}
              value={email}
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TextInput
              style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder={'Digite a senha...'}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.buttonEntrar} onPress={login}><Text style={styles.buttonEntrarText}>Entrar</Text></TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}><Text style={{ color: 'gray', textAlign: 'center' }}>ou</Text></View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.buttonCadastrar} onPress={() => props.navigation.navigate('Cadastrar')}>
              <Text style={styles.buttonCadastrarText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  buttonEntrar: {
    backgroundColor: '#FE595E',
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonEntrarText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF'
  },
  buttonCadastrar: {
    backgroundColor: 'transparent',
    padding: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray'
  },
  buttonCadastrarText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray'
  }
});

export default Login;
