import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

class Cadastrar extends React.Component{
  render(){
    return (
      <>
        <ScrollView style={{flex: 1, backgroundColor: '#F6F6F6'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('../../assets/logo.png')} style={{width: 200, height: 200}}/>
          </View>
          <View style={{flex: 1, paddingHorizontal: 32}}>
            <View>
              <TextInput
                style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                placeholder={'Digite o nome...'}
              />
            </View>
            <View style={{marginTop: 20}}>
                <TextInput
                    style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                    placeholder={'Digite o email...'}
                />
            </View>
            <View style={{marginTop: 20}}>
              <TextInput
                style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                placeholder={'Digite a senha...'}
              />
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity style={styles.buttonEntrar} onPress={() => this.props.navigation.navigate('Home')}><Text style={styles.buttonEntrarText}>Cadastrar</Text></TouchableOpacity>
            </View>
            <View style={{marginTop: 20}}><Text style={{color: 'gray', textAlign: 'center'}}>ou</Text></View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity style={styles.buttonCadastrar} onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.buttonCadastrarText}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonEntrar:{
    backgroundColor: '#FE595E', 
    padding: 10, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonEntrarText:{
    textAlign: 'center',
    fontSize: 16,
    color: '#FFF' 
  },
  buttonCadastrar:{
    backgroundColor: 'transparent', 
    padding: 10, 
    height: 50, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1, 
    borderColor: 'gray'
  },
  buttonCadastrarText:{
    textAlign: 'center',
    fontSize: 16,
    color: 'gray' 
  }
});

export default Cadastrar;
