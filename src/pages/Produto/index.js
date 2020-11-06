import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import { useDispatch } from "react-redux";
import { createProductCarrinho } from '../../store/user';

const ProdutoBox = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Produto')} style={{ marginRight: 20, backgroundColor: '#FFF', padding: 10, width: 140, height: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', width: '100%', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={{ uri: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' }} style={{ width: 90, height: 80, resizeMode: 'contain' }} />
      </View>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2, textAlign: 'left', paddingHorizontal: 10 }}>
        <Text style={{ textAlign: 'left', fontWeight: 'bold', color: '#FE595E' }}>{props.produto.nome}</Text>
        <Text style={{ textAlign: 'left', color: '#FE595E' }}>{props.produto.descricao}</Text>
      </View>
    </TouchableOpacity>
  );
}

class Produto extends React.Component {
  render() {
    const { produto } = this.props.route.params;
    const dispatch = useDispatch();

    const makeLogin = async () => {
      if (email === "" || !email_regex(email) || password === "") return alert('Ops algum campo esta vazio!');
      await dispatch(createProductCarrinho({ email, password }))
  }
    
    return (
      <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 16 }}>
          <View>
            <View style={{ backgroundColor: 'white' }}><Image source={{ uri: produto.imagem }} style={{ width: '100%', height: 250, resizeMode: 'contain' }} /></View>
            <View><Text style={{ fontSize: 20, color: '#FE595E', fontWeight: 'bold', marginTop: 10 }}>{produto.nome}</Text></View>
            <View><Text style={{ fontSize: 16, marginTop: 5, color: '#8e8e8e' }}>{produto.descricao}</Text></View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "#FE595E", width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 20, lineHeight: 20 }}>-</Text></TouchableOpacity>
                <View><TextInput style={{ height: 40, width: 50, borderColor: '#ccc', borderWidth: 1, marginHorizontal: 5, textAlign: 'center' }} placeholder={'1'} /></View>
                <TouchableOpacity style={{ backgroundColor: "#FE595E", width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 20, lineHeight: 20 }}>+</Text></TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                <TouchableOpacity style={{ backgroundColor: "green", width: 160, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={() => makeLogin()}><Text style={{ color: '#FFF', fontSize: 16, lineHeight: 20 }}>ADICIONAR</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
    color: '#FFF',
    textTransform: 'uppercase',
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

export default Produto;
