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

const MOCK_PRODUTOS_MERCADO = [
    {
        id: 1, nome_mercado: "", produtos: [
            { nome: 'Nescau', descricao: 'Achocolatado em Pó Chocolate Nescau 2.0', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' },
            { nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 150g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg' },
            { nome: 'Requeijão Cremoso Danone', descricao: 'Requeijão Cremoso Danone 200g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h07/he4/h00/h00/9229002473502.jpg' }
        ]
    },
    {
        id: 2, nome_mercado: "", produtos: [
            { nome: 'Nescau', descricao: 'Achocolatado em Pó Chocolate Nescau 2.0', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' },
            { nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 150g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg' },
            { nome: 'Requeijão Cremoso Danone', descricao: 'Requeijão Cremoso Danone 200g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h07/he4/h00/h00/9229002473502.jpg' }
        ]
    },
    {
        id: 3, nome_mercado: "", produtos: [
            { nome: 'Nescau', descricao: 'Achocolatado em Pó Chocolate Nescau 2.0', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' },
            { nome: 'Salgadinho Cheetos', descricao: 'Salgadinho Cheetos Onda Sabor Requeijão Elma Chips 150g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h42/h7b/h00/h00/12209451237406.jpg' },
            { nome: 'Requeijão Cremoso Danone', descricao: 'Requeijão Cremoso Danone 200g', imagem: 'https://static.carrefour.com.br/medias/sys_master/images/images/h07/he4/h00/h00/9229002473502.jpg' }
        ]
    },
]

const ProdutoBox = (props) => {
    const imagem = props.imagem === '' ? 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' : props.image;
    return (
        <View style={styles.produtoCarrinho}>
            <View style={{ marginRight: 20, width: 140, height: 100, justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Image source={{ uri: imagem }} style={{ width: 90, height: 80, resizeMode: 'contain' }} />
                </View>
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 2, textAlign: 'left', paddingHorizontal: 10 }}>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'gray', fontSize: 16 }}>{props.produto.nome}</Text>
                    <Text style={{ textAlign: 'left', color: 'gray' }}>{props.produto.descricao}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#FE595E", width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 20, lineHeight: 20 }}>-</Text></TouchableOpacity>
                    <View><TextInput style={{ height: 40, width: 50, borderColor: '#ccc', borderWidth: 1, marginHorizontal: 5, textAlign: 'center' }} placeholder={'1'} /></View>
                    <TouchableOpacity style={{ backgroundColor: "#FE595E", width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 20, lineHeight: 20 }}>+</Text></TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: "#cc0000", width: 120, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#FFF', fontSize: 14, fontWeight: 'normal', lineHeight: 20 }}>REMOVER</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


class Carrinho extends React.Component {
    state = {
        produtos_mercados: MOCK_PRODUTOS_MERCADO
    }

    render() {
        const { produtos_mercados } = this.state;

        return (
            <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                    <View style={{ justifyConter: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20, color: '#FE595E', fontWeight: 'bold', marginBottom: 10 }}>Meu Carrinho</Text></View>
                    <ScrollView style={{ backgroundColor: '#F6F6F6' }} showsVerticalScrollIndicator={false}>
                        {produtos_mercados.map((mercado) => {
                            <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold', marginBottom: 10 }}>{mercado.nome_mercado}</Text></View>
                            mercado.produtos.map((v) => <ProdutoBox {...this.props} produto={v} />)
                        })}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    produtoCarrinho: {
        marginBottom: 20,
        backgroundColor: '#FFF',
        padding: 10,
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

export default Carrinho;
