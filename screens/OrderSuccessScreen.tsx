import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'OrderSuccess'>;

export default function OrderSuccessScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#DA291C" />

            <View style={styles.content}>
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark" size={48} color="#FFFFFF" />
                </View>
                <Text style={styles.title}>Pedido finalizado!</Text>
                <Text style={styles.subtitle}>
                    Seu pagamento foi efetuado com sucesso.{'\n'}
                    Em breve seu pedido será preparado.
                </Text>

                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Feather name="clock" size={18} color="#DA291C" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Tempo estimado</Text>
                            <Text style={styles.infoValue}>25 - 35 minutos</Text>
                        </View>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoRow}>
                        <Feather name="hash" size={18} color="#DA291C" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Número do pedido</Text>
                            <Text style={styles.infoValue}>#8429</Text>
                        </View>
                    </View>
                    <View style={styles.infoDivider} />
                    <View style={styles.infoRow}>
                        <Feather name="map-pin" size={18} color="#DA291C" />
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Endereço</Text>
                            <Text style={styles.infoValue}>
                                R. Dr. Renato Paes de Barros, 1017
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
                <TouchableOpacity
                    style={styles.homeButton}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.homeButtonText}>Voltar ao início</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DA291C',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    iconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    infoCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoText: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: '#707070',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
    },
    infoDivider: {
        height: 1,
        backgroundColor: '#E8E8E8',
        marginVertical: 14,
    },
    footer: {
        paddingHorizontal: 24,
        paddingTop: 12,
    },
    homeButton: {
        height: 48,
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
});