import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { useDispatch } from "react-redux";
import { create } from '../../store/user';
import { email_regex } from '../../utils/regex';

const Cadastrar = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const makeRegister = () => {
        if (email === "" || !email_regex(email) || name === "" || password === "" || confirm_password === "" || password !== confirm_password) return alert('Ops algum campo esta vazio!');
        dispatch(create({ name, email, password, confirm_password }));
        props.navigation.navigate('Home');
    }

    return (
        <>
            <ScrollView style={{ flex: 1, backgroundColor: '#F6F6F6' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/logo.png')} style={{ width: 200, height: 200 }} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 32 }}>
                    <View>
                        <TextInput
                            style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholder={'Digite o nome...'}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
                            placeholder={'Digite o email...'}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder={'Digite a senha...'}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            style={{ height: 50, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10 }}
                            value={confirm_password}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            placeholder={'Confirme a senha...'}
                        />
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity style={styles.buttonEntrar} onPress={() => makeRegister()}><Text style={styles.buttonEntrarText}>Cadastrar</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
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

export default Cadastrar;
