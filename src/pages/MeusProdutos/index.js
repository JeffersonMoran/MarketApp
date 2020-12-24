import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import { meusProdutos } from '../../store/user';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';

const ProdutoBox = (props) => {
  const { produto } = props;
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Produto', { produto: props.produto })} style={styles.boxProduto}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Image source={{ uri: produto.imagem !== '' ? produto.imagem : 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' }} style={{ width: 90, height: 80, resizeMode: 'contain' }} />
      </View>
      <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2, textAlign: 'left', paddingHorizontal: 10 }}>
        <View>
          <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{produto.nome}</Text>
          <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'gray', fontSize: 14 }}>R$ {produto.preco}</Text>
        </View>
        <Text style={{ textAlign: 'left', color: 'gray', marginTop: 5 }}>{produto.descricao}</Text>
      </View>
    </TouchableOpacity>
  );
}

const MeusProdutos = (props) => {
  const produtos = useSelector(state => state.userReducer.produtos);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(meusProdutos())
  }, [])

  const MOCKPRODUTOS = [
    { image: '', nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 'R$10,00' },
    { image: '', nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 'R$10,00' },
    { image: '', nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 'R$10,00' },
    { image: '', nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 'R$10,00' },
    { image: '', nome: 'Produto Teste', descricao: 'Descrição Teste', preco: 'R$10,00' },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingVertical: 16 }}>
        <View>
          <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold' }}>Meus Produtos</Text></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {produtos.map((v) => <ProdutoBox {...props} produto={v} />)}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxProduto: {
    marginRight: 20,
    backgroundColor: '#FFF',
    padding: 10,
    width: 140,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
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
  boxImage: {
    backgroundColor: '#FE595E',
    height: 150,
    width: '100%',
    marginTop: 10
  }
});

export default MeusProdutos;
