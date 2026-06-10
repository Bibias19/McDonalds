import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
 
 
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
 
 
export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
};
 
 
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
 
export default function HomeScreen({ navigation }: Props) {
    return (
        // SafeAreaView: respeita notch/barras do sistema.
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
 
            {/* View principal — flex: 1 ocupa tudo, alignItems/justifyContent centraliza */}
            <View style={styles.container}>
                {/* ===== TOPO: logo + nome ===== */}
                <View style={styles.header}>
                    <Image
                        source={require('../images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={styles.brandName}>Mc'Donalds</Text>
                </View>
 
                {/* ===== MEIO: textos de boas-vindas ===== */}
                <View style={styles.welcomeSection}>
                    <Text style={styles.title}>Seja bem-vindo!</Text>
                    <Text style={styles.subtitle}>
                        Escolha como prefere aproveitar sua refeição. Estamos aqui para
                        oferecer praticidade e sabor em cada detalhe!
                    </Text>
                </View>
 
                <View style={styles.cardsRow}>
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <View style={styles.iconCircle}>
                            <MaterialCommunityIcons
                                name="hamburger"
                                size={36}
                                color="#DA291C"
                            />
                        </View>
                        <View style={styles.cardLabelPill}>
                            <Text style={styles.cardLabel}>Para comer aqui</Text>
                        </View>
                    </TouchableOpacity>
 
                    <TouchableOpacity
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('Menu')}
                    >
                        <View style={styles.iconCircle}>
                            <Feather name="shopping-bag" size={34} color="#DA291C" />
                        </View>
                        <View style={styles.cardLabelPill}>
                            <Text style={styles.cardLabel}>Para levar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
 
 
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#DA291C', // ALTERADO: vermelho McDonald's
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 30, // ALTERADO: borda arredondada no topo
        borderTopRightRadius: 30, // ALTERADO: borda arredondada no topo
    },
    header: {
        alignItems: 'center',
        marginBottom: 28,
    },
    logo: {
        width: 80, // ALTERADO: 72 -> 80
        height: 80, // ALTERADO: 72 -> 80
        marginBottom: 12, // ALTERADO: 10 -> 12
        borderRadius: 40, // ALTERADO: adicionado borda redonda
        borderWidth: 3, // ALTERADO: adicionado borda
        borderColor: '#DA291C', // ALTERADO: borda vermelha
    },
    brandName: {
        fontSize: 26, // ALTERADO: 22 -> 26
        fontWeight: '800', // ALTERADO: 700 -> 800
        color: '#DA291C', // ALTERADO: preto -> vermelho McDonald's
        letterSpacing: 1, // ALTERADO: 0.3 -> 1
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 36,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 28, // ALTERADO: 26 -> 28
        fontWeight: '800', // ALTERADO: 700 -> 800
        color: '#DA291C', // ALTERADO: preto -> vermelho McDonald's
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16, // ALTERADO: 15 -> 16
        lineHeight: 24, // ALTERADO: 22 -> 24
        color: '#666666', // ALTERADO: #707070 -> #666666
        textAlign: 'center',
        fontWeight: '500', // ALTERADO: adicionado peso médio
    },
    cardsRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 16, // ALTERADO: 14 -> 16
    },
    card: {
        flex: 1,
        maxWidth: 168,
        backgroundColor: '#FFFFFF',
        borderRadius: 24, // ALTERADO: 20 -> 24
        paddingVertical: 28,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 200,
        // Sombra iOS:
        shadowColor: '#DA291C', // ALTERADO: preto -> vermelho
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15, // ALTERADO: 0.08 -> 0.15
        shadowRadius: 12,
        // Sombra Android:
        elevation: 6,
    },
    iconCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFF5F4', // ALTERADO: #F2F2F2 -> vermelho bem claro
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    cardLabelPill: {
        backgroundColor: '#DA291C', // ALTERADO: #F2F2F2 -> vermelho
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 14,
        width: '100%',
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: 14,
        fontWeight: '700', // ALTERADO: 600 -> 700
        color: '#FFFFFF', // ALTERADO: preto -> branco
        textAlign: 'center',
    },
});