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
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';

const AddProduto = (props) => {
    const [selectedValue, setSelectedValue] = React.useState("");
    const [avatarSource, setAvatarSource] = React.useState("");
    const mercados = [
        {"_id": "5f976a87a1298103d9bb9ab2", "nome": "Supermercado Carrefour"},
        {"_id": "5f976a87a1298103d9bb9ab3", "nome": "Supermercado União"},
        {"_id": "5f976a87a1298103d9bb9ab4", "nome": "Supermercado Dia"},
        {"_id": "5f976a87a1298103d9bb9ab5", "nome": "Supermercado Mendonça"},
        {"_id": "5f976a87a1298103d9bb9ab6", "nome": "Supermercado Mercadão"},
        {"_id": "5f976a87a1298103d9bb9ab7", "nome": "Supermercado Big"},
        {"_id": "5f976a87a1298103d9bb9ab1", "nome": "Supermercado Extra"}
    ]

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
          const source = { uri: response.uri };
      
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      
          setAvatarSource(source)
        }
      });
    }
    return (
      <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingVertical: 16 }}>
          <View>
            <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold' }}>Adicionar Produto</Text></View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={() => showPickerImage()} style={styles.boxImage}>
                <Image source={avatarSource} />
              </TouchableOpacity>
              <View>
                <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite o nome do produto...'} />
              </View>
              <View>
                <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite o nome do preço...'} />
              </View>
              <View>
                <TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite a descrição...'} />
              </View>
              <View>
                <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }}
                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  {mercados.map((m) => (<Picker.Item label={m.name} value={m._id} />))}
                </Picker>
              </View>
              <View style={{marginTop: 10}}>
                <TouchableOpacity style={styles.buttonEntrar}><Text style={styles.buttonEntrarText}>Salvar</Text></TouchableOpacity>
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
