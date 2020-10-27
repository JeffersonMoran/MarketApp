import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView
} from 'react-native';
import { useSelector } from "react-redux";

const MercadoBox = (props) => {
    const imagem = props.imagem === '' ? 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' : props.image;
    return (
        <View style={styles.boxItemParceiro}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: imagem }} style={{ width: 105, height: 50 }} />
            </View>
        </View>
    );
}

const MercadoCompleto = (props) => {
    const imagem = props.imagem === '' ? 'https://static.carrefour.com.br/medias/sys_master/images/images/h77/h44/h00/h00/26979835379742.jpg' : props.image;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Mercado', { mercado: props })} style={styles.boxMercado}>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: 120 }}>
                <Image source={{ uri: imagem }} style={{ width: 105, height: 50 }} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: 'gray', fontWeight: 'bold' }}>{props.nome}</Text>
                <Text style={{ color: 'gray' }}>Amparo/São Paulo</Text>
                <Text style={{ color: 'gray' }}>Rua rua, 123 - Jardim das Flores</Text>
                <Text style={{ color: 'gray' }}>Telefone: (19) 3221-2211</Text>
            </View>
        </TouchableOpacity>
    );
}


const Home = (props) => {
    const user = useSelector(state => state.userReducer.user);
    const MOCK_MERCADO = [
        { nome: 'Supermercado Extra', imagem: 'https://logodownload.org/wp-content/uploads/2014/12/extra-logo-mercado.jpg' },
        { nome: 'Supermercado Carrefour', imagem: 'https://thumbs.jusbr.com/imgs.jusbrasil.com/publications/noticias/images/carrefour1464360975.png' },
        { nome: 'Supermercado União', imagem: 'https://media.glassdoor.com/sqll/2486463/uni%C3%A3o-supermercados-squarelogo-1553581300421.png' },
        { nome: 'Supermercado Dia', imagem: 'https://na001.leafletcdns.com/com.br/data/12/logo.png' },
        { nome: 'Supermercado Mercadão', imagem: 'https://www.mercadaoatacadista.com.br/wp-content/uploads/2018/05/logomercadao-1.png' },
        { nome: 'Supermercado Big', imagem: 'https://iguatemiflorianopolis.com.br/wp-content/uploads/2020/07/SITE__big.jpg' }
    ]

    return (
        <SafeAreaView style={{ backgroundColor: '#F6F6F6', flex: 1 }}>
            <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ alignItems: 'flex-start', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 16 }}>Olá, {user.name || ""}</Text>
                </View>
                <View style={{ alignItems: 'flex-end', flex: 1 }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Carrinho')} style={{ alignItems: 'flex-end', width: 130, alignItems: 'center', backgroundColor: '#FE595E', paddingHorizontal: 5, paddingVertical: 5 }}><Text style={{ fontSize: 16, color: '#FFF', fontWeight: 'bold' }}>Meu carrinho</Text></TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#F6F6F6', paddingHorizontal: 16, paddingBottom: 16 }}>
                <View style={{ marginTop: 10 }}>
                    <View><Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold' }}>Novos Parceiros</Text></View>
                    <ScrollView horizontal={true} style={{ marginTop: 5, paddingBottom: 10 }}>
                        {MOCK_MERCADO.map((v, k) => (
                            <MercadoBox {...v} key={k} {...props} />
                        ))}
                    </ScrollView>
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                        <Text style={{ fontSize: 16, color: '#FE595E', fontWeight: 'bold', flex: 1 }}>Perto de você</Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('MeusProdutos')} style={{ alignItems: 'flex-end', width: 130, alignItems: 'center', backgroundColor: '#FE595E', paddingHorizontal: 5, paddingVertical: 5 }}><Text style={{ fontSize: 16, color: '#FFF', fontWeight: 'bold' }}>Meus Produtos</Text></TouchableOpacity>
                    </View>
                    <ScrollView style={{ marginTop: 5 }}>
                        {MOCK_MERCADO.map((v, k) => (
                            <MercadoCompleto {...v} key={k} {...props} />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.boxPlus} onPress={() => props.navigation.navigate('AddProduto')}>
                <Text style={styles.boxPlusText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    boxItemParceiro: {
        marginRight: 20,
        backgroundColor: '#FFF',
        padding: 10,
        width: 140,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    boxMercado: {
        backgroundColor: '#FFF',
        paddingVertical: 20,
        paddingHorizontal: 10,
        margin: 0,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
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
    },
    boxPlus: {
        backgroundColor: '#FE595E',
        height: 50,
        width: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    boxPlusText:{
        color: "#FFF",
        fontSize: 30,
        lineHeight: 0,
        marginTop: -3,
        marginLeft: 2
    }
});

export default Home;
