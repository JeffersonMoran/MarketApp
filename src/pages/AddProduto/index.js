import React from 'react';
import { Platform } from 'react-native';
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
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';

import { useDispatch } from "react-redux";
import { createProduct } from '../../store/user';
import { useSelector } from "react-redux";

const AddProduto = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("");
  const [avatarSource, setAvatarSource] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const dispatch = useDispatch();

  const adicionaProduto = () => {
    if (nome === "" || preco === "" || descricao === "" || avatarSource === "") return alert('Ops algum campo esta vazio!');
    dispatch(createProduct("5fa49a38a0abd108cc6178bc", { nome, preco, descricao, imagem: avatarSource }));
    alert('Produto criado com sucesso!')
    props.navigation.navigate('Home');
  }

  const mercados = useSelector(state => state.userReducer.mercados);

  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const showPickerImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //const source = { uri: response.data };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setAvatarSource('data:image/jpeg;base64,' + response.data)
      }
    });
  }
  console.log('aqui', avatarSource);
  return (
    <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingVertical: 16 }}>
        <View>
          <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold' }}>Adicionar Produto</Text></View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              avatarSource === "" ?
                <TouchableOpacity onPress={() => showPickerImage()} style={styles.boxImage}>
                  <Image source={avatarSource} />
                </TouchableOpacity>
                :
                <View>
                  <Image source={{ uri: avatarSource }} style={styles.boxImage} />
                </View>
            }
            <View>
              <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite o nome do produto...'}
                value={nome}
                autoCapitalize='none'
                onChangeText={(nome) => setNome(nome)}
              />
            </View>
            <View>
              <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite o preço...'}
                value={preco}
                autoCapitalize='none'
                keyboardType={Platform.OS === 'ios' ? "numeric" : "number-pad"}
                onChangeText={(preco) => setPreco(preco)}
              />
            </View>
            <View>
              <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite a descrição...'}
                value={descricao}
                autoCapitalize='none'
                onChangeText={(descricao) => setDescricao(descricao)}
              />
            </View>
            <View>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
              >
                {mercados.map((m, k) => (<Picker.Item key={k}
                  label={m.name} value={m._id}
                />))}
              </Picker>
            </View>
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity style={styles.buttonEntrar} onPress={() => adicionaProduto()}><Text style={styles.buttonEntrarText}>Salvar</Text></TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
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
    color: '#FFF'
  },
  boxImage: {
    backgroundColor: '#FE595E',
    height: 150,
    width: '100%',
    marginTop: 10
  }
});

export default AddProduto;
