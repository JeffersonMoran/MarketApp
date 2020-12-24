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

const Produto = (props) => {
  const { produto } = props.route.params;
  const dispatch = useDispatch();

  const adicionarProduto = async () => {
    await dispatch(createProductCarrinho({ product_id: produto._id }))
    alert('Produto adicionado com sucesso!');
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FFF', flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 16 }}>
        <View>
          <View style={{ backgroundColor: 'white' }}><Image source={{ uri: produto.imagem }} style={{ width: '100%', height: 250, resizeMode: 'contain' }} /></View>
          <View><Text style={{ fontSize: 20, color: '#FE595E', fontWeight: 'bold', marginTop: 10 }}>{produto.nome}</Text></View>
          <View><Text style={{ fontSize: 16, marginTop: 5, color: '#8e8e8e' }}>{produto.descricao}</Text></View>
          <View><Text style={{ fontSize: 16, marginTop: 5, color: '#8e8e8e' }}>R$ {produto.preco}</Text></View>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <TouchableOpacity style={{ backgroundColor: "green", width: 160, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={() => adicionarProduto()}><Text style={{ color: '#FFF', fontSize: 16, lineHeight: 20 }}>ADICIONAR</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <TouchableOpacity onPress={() => { alert('Produto denunciado!') }} style={{ backgroundColor: "#FE595E", width: 120, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 14, fontWeight: 'normal', lineHeight: 20 }}>DENUNCIAR</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
