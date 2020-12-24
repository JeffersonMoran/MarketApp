import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
    Picker,
    Linking
} from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { listaProdutosMercados } from '../../store/user';
import { set } from 'react-native-reanimated';

const MOCK_PRODUTOS = [
    { nome: 'Nescau', descricao: 'Achocolatado em Pó Chocolate Nescau 2.0', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' },
    { nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 150g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg' },
    { nome: 'Requeijão Cremoso Danone', descricao: 'Requeijão Cremoso Danone 200g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h07/he4/h00/h00/9229002473502.jpg' }
];

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

const Mercado = (props) => {
    const { mercado } = props.route.params;
    const produtos_mercado = useSelector(state => state.userReducer.produtos_mercado);
    const [listaFiltrada, setListaFiltrada] = useState([]);

    const [avaliacao, setAvaliacao] = useState(0);
    const [comentario, setComentario] = useState("");

    const dispatch = useDispatch();

    console.log('mercado', produtos_mercado)

    useEffect(() => {
        dispatch(listaProdutosMercados(mercado._id))

        if (produtos_mercado.products) setListaFiltrada(produtos_mercado.products);
    }, []);

    const filter_products = (text) => {
        let products = produtos_mercado.products.filter(product => product.nome.toLowerCase().includes(text.toLowerCase()));
        if (text === "") products = produtos_mercado.products;
        setListaFiltrada(products);
    }

    const routeFunction = (route) => {
        let daddr = encodeURIComponent(route);
        if (Platform.OS === 'ios') {
            Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
        } else {
            Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingVertical: 16 }}>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold', flex: 1 }}>{mercado.nome}</Text>
                        <Text style={{ fontSize: 16, color: '#daa520', fontWeight: 'bold' }}>{produtos_mercado ? produtos_mercado.rates : 0} {produtos_mercado && produtos_mercado.rates == 1 ? 'Estrala' : 'Estrelas'}</Text>
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <View style={{ width: 120, backgroundColor: 'red' }}>
                            <Image source={{ uri: mercado.imagem !== '' ? mercado.imagem : 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' }} style={{ width: 120, height: 80 }} />
                        </View>
                        <View style={{ textAlign: 'right', flex: 1, paddingLeft: 10 }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 14, textAlign: 'right' }}>{mercado.endereco}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ width: 100, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FE595E', paddingHorizontal: 5, paddingVertical: 5, marginTop: 5 }} onPress={() => routeFunction('Av. Juca Preto, 709 - Jardim Vania, Serra Negra - SP')}>
                                    <Text style={{ fontSize: 16, color: '#FFF', fontWeight: 'bold' }}>Mapa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold', flex: 1 }}>Produtos do Mercado</Text>
                </View>
                <View><TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite a sua busca...'} onChangeText={filter_products} /></View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {listaFiltrada.map((v, k) => <ProdutoBox {...props} key={k} produto={v} />)}
                </ScrollView>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        style={{ height: 80, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                        value={comentario}
                        onChangeText={(comentario) => setComentario(comentario)}
                        autoCapitalize='none'
                        placeholder={'Nos de um comentario...'}
                    />
                    <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
                        <TextInput
                            style={{ height: 40, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, width: 100 }}
                            value={avaliacao}
                            keyboardType = 'numeric'
                            onChangeText={(avaliacao) => setAvaliacao(avaliacao)}
                            autoCapitalize='none'
                            placeholder={'Avalie'}
                        />
                        <TouchableOpacity style={{ width: "100%", height: 30, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#FE595E', paddingHorizontal: 5, paddingVertical: 5, marginTop: 5 }} onPress={() => { alert("Sucesso!") }}>
                            <Text style={{ fontSize: 16, color: '#FFF', fontWeight: 'bold' }}>Comente e Avalie</Text>
                        </TouchableOpacity>
                    </View>
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

export default Mercado;
