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
                <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{produto.nome}</Text>
                <Text style={{ textAlign: 'left', color: 'gray' }}>{produto.descricao}</Text>
            </View>
        </TouchableOpacity>
    );
}

class Mercado extends React.Component {
    state = {
        produtos: MOCK_PRODUTOS
    }

    render() {
        const { mercado } = this.props.route.params;
        const filter_products = (text) => {
            let products = MOCK_PRODUTOS.filter(product => product.nome.toLowerCase().includes(text.toLowerCase()));
            if (text === "") products = MOCK_PRODUTOS;
            this.setState({ "produtos": products });
        }

        return (
            <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingVertical: 16 }}>
                    <View>
                        <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold' }}>{mercado.nome}</Text></View>
                        <View><TextInput style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginTop: 10, marginBottom: 5 }} placeholder={'Digite a sua busca...'} onChangeText={filter_products}/></View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.state.produtos.map((v) => <ProdutoBox {...this.props} produto={v} />)}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
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
