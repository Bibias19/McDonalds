import { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    Alert,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Order'>;

type PaymentMethod = 'credito' | 'debito' | 'pix';

export default function OrderScreen({ navigation }: Props) {
    const { items, updateQuantity, totalPrice, clearCart } = useCart();
    const insets = useSafeAreaInsets();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credito');

    // Dados do cartão
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    // Erros de validação
    const [errors, setErrors] = useState<Record<string, string>>({});

    const formatPrice = (value: number) => {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    };

    // Máscara número do cartão: 0000 0000 0000 0000
    const handleCardNumberChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 16);
        const parts = cleaned.match(/.{1,4}/g);
        const formatted = parts ? parts.join(' ') : cleaned;
        setCardNumber(formatted);
        if (errors.cardNumber) {
            setErrors((prev) => ({ ...prev, cardNumber: '' }));
        }
    };

    // Máscara validade: MM/AA
    const handleExpiryChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 4);
        let formatted = cleaned;
        if (cleaned.length >= 2) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        setCardExpiry(formatted);
        if (errors.cardExpiry) {
            setErrors((prev) => ({ ...prev, cardExpiry: '' }));
        }
    };

    // CVV só números
    const handleCvvChange = (text: string) => {
        const cleaned = text.replace(/\D/g, '').slice(0, 4);
        setCardCvv(cleaned);
        if (errors.cardCvv) {
            setErrors((prev) => ({ ...prev, cardCvv: '' }));
        }
    };

    // Nome do cartão
    const handleNameChange = (text: string) => {
        setCardName(text);
        if (errors.cardName) {
            setErrors((prev) => ({ ...prev, cardName: '' }));
        }
    };

    const validateCardFields = (): boolean => {
        const newErrors: Record<string, string> = {};

        const rawNumber = cardNumber.replace(/\s/g, '');
        if (!rawNumber || rawNumber.length < 13) {
            newErrors.cardNumber = 'Número do cartão inválido';
        }
        if (!cardName.trim() || cardName.trim().length < 3) {
            newErrors.cardName = 'Informe o nome como está no cartão';
        }
        const rawExpiry = cardExpiry.replace('/', '');
        if (!rawExpiry || rawExpiry.length < 4) {
            newErrors.cardExpiry = 'Informe a validade completa (MM/AA)';
        }
        if (!cardCvv || cardCvv.length < 3) {
            newErrors.cardCvv = 'CVV inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFinish = () => {
        const isCard = paymentMethod === 'credito' || paymentMethod === 'debito';

        if (isCard) {
            const isValid = validateCardFields();
            if (!isValid) {
                Alert.alert(
                    'Campos incompletos',
                    'Preencha corretamente os dados do cartão para continuar.'
                );
                return;
            }
        }

        clearCart();
        navigation.navigate('OrderSuccess');
    };

    const isCard = paymentMethod === 'credito' || paymentMethod === 'debito';

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={22} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Seu Pedido</Text>
                <View style={styles.headerButton} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Endereço */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Feather name="map-pin" size={18} color="#DA291C" />
                        <Text style={styles.cardTitle}>Endereço de entrega</Text>
                    </View>
                    <Text style={styles.addressText}>
                        R. Dr. Renato Paes de Barros, 1017{'\n'}
                        Itaim Bibi, São Paulo - SP
                    </Text>
                </View>

                {/* Itens do pedido */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="food" size={18} color="#DA291C" />
                        <Text style={styles.cardTitle}>Itens do pedido</Text>
                    </View>
                    {items.map((item) => (
                        <View key={item.product.id} style={styles.orderItem}>
                            <Image
                                source={item.product.image}
                                style={styles.orderItemImage}
                                resizeMode="contain"
                            />
                            <View style={styles.orderItemInfo}>
                                <Text style={styles.orderItemName} numberOfLines={2}>
                                    {item.product.name}
                                </Text>
                                <Text style={styles.orderItemPrice}>
                                    {item.product.price}
                                </Text>
                                <View style={styles.quantityRow}>
                                    <TouchableOpacity
                                        style={styles.qtyButton}
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            updateQuantity(item.product.id, item.quantity - 1)
                                        }
                                    >
                                        <Ionicons name="remove" size={16} color="#000000" />
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={[styles.qtyButton, styles.qtyButtonActive]}
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            updateQuantity(item.product.id, item.quantity + 1)
                                        }
                                    >
                                        <Ionicons name="add" size={16} color="#FFFFFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.orderItemTotal}>
                                {formatPrice(
                                    parseFloat(
                                        item.product.price
                                            .replace('R$', '')
                                            .replace(',', '.')
                                            .trim()
                                    ) * item.quantity
                                )}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Pagamento */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Feather name="credit-card" size={18} color="#DA291C" />
                        <Text style={styles.cardTitle}>Forma de pagamento</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.paymentOption} 
                        activeOpacity={0.8}
                        onPress={() => setPaymentMethod('credito')}
                    >
                        <View style={paymentMethod === 'credito' ? styles.paymentRadioActive : styles.paymentRadio} />
                        <Text style={styles.paymentText}>Cartão de crédito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.paymentOption} 
                        activeOpacity={0.8}
                        onPress={() => setPaymentMethod('debito')}
                    >
                        <View style={paymentMethod === 'debito' ? styles.paymentRadioActive : styles.paymentRadio} />
                        <Text style={styles.paymentText}>Cartão de débito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.paymentOption} 
                        activeOpacity={0.8}
                        onPress={() => setPaymentMethod('pix')}
                    >
                        <View style={paymentMethod === 'pix' ? styles.paymentRadioActive : styles.paymentRadio} />
                        <Text style={styles.paymentText}>PIX</Text>
                    </TouchableOpacity>

                    {/* Campos do cartão - aparecem só se for crédito ou débito */}
                    {isCard && (
                        <View style={styles.cardForm}>
                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>Número do cartão</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.cardNumber ? styles.inputError : null,
                                    ]}
                                    placeholder="0000 0000 0000 0000"
                                    placeholderTextColor="#AAAAAA"
                                    keyboardType="number-pad"
                                    value={cardNumber}
                                    onChangeText={handleCardNumberChange}
                                />
                                {errors.cardNumber ? (
                                    <Text style={styles.errorText}>{errors.cardNumber}</Text>
                                ) : null}
                            </View>
                            <View style={styles.inputRow}>
                                <Text style={styles.inputLabel}>Nome no cartão</Text>
                                <TextInput
                                    style={[
                                        styles.input,
                                        errors.cardName ? styles.inputError : null,
                                    ]}
                                    placeholder="NOME COMPLETO"
                                    placeholderTextColor="#AAAAAA"
                                    autoCapitalize="characters"
                                    value={cardName}
                                    onChangeText={handleNameChange}
                                />
                                {errors.cardName ? (
                                    <Text style={styles.errorText}>{errors.cardName}</Text>
                                ) : null}
                            </View>
                            <View style={styles.inputRowDouble}>
                                <View style={[styles.inputRow, { flex: 1 }]}>
                                    <Text style={styles.inputLabel}>Validade</Text>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            errors.cardExpiry ? styles.inputError : null,
                                        ]}
                                        placeholder="MM/AA"
                                        placeholderTextColor="#AAAAAA"
                                        keyboardType="number-pad"
                                        value={cardExpiry}
                                        onChangeText={handleExpiryChange}
                                    />
                                    {errors.cardExpiry ? (
                                        <Text style={styles.errorText}>{errors.cardExpiry}</Text>
                                    ) : null}
                                </View>
                                <View style={[styles.inputRow, { flex: 1, marginLeft: 12 }]}>
                                    <Text style={styles.inputLabel}>CVV</Text>
                                    <TextInput
                                        style={[
                                            styles.input,
                                            errors.cardCvv ? styles.inputError : null,
                                        ]}
                                        placeholder="123"
                                        placeholderTextColor="#AAAAAA"
                                        keyboardType="number-pad"
                                        maxLength={4}
                                        secureTextEntry
                                        value={cardCvv}
                                        onChangeText={handleCvvChange}
                                    />
                                    {errors.cardCvv ? (
                                        <Text style={styles.errorText}>{errors.cardCvv}</Text>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Info do PIX - aparece só se for PIX */}
                    {paymentMethod === 'pix' && (
                        <View style={styles.pixInfo}>
                            <MaterialCommunityIcons name="qrcode" size={48} color="#DA291C" />
                            <Text style={styles.pixText}>
                                O QR Code para pagamento será gerado após finalizar o pedido.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Resumo */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Feather name="file-text" size={18} color="#DA291C" />
                        <Text style={styles.cardTitle}>Resumo do pedido</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Taxa de entrega</Text>
                        <Text style={styles.summaryValue}>R$ 0,00</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Desconto</Text>
                        <Text style={styles.summaryValue}>R$ 0,00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total a pagar</Text>
                        <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
                    </View>
                </View>

                <View style={styles.bottomSpacer} />
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                <TouchableOpacity
                    style={styles.finishButton}
                    activeOpacity={0.85}
                    onPress={handleFinish}
                >
                    <Text style={styles.finishButtonText}>Finalizar pedido</Text>
                    <Feather name="check-circle" size={18} color="#000000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 48,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    addressText: {
        fontSize: 14,
        color: '#707070',
        lineHeight: 20,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    orderItemImage: {
        width: 56,
        height: 48,
    },
    orderItemInfo: {
        flex: 1,
        marginLeft: 10,
    },
    orderItemName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000000',
        lineHeight: 17,
    },
    orderItemPrice: {
        fontSize: 12,
        color: '#707070',
        marginTop: 2,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 6,
    },
    qtyButton: {
        width: 26,
        height: 26,
        borderRadius: 6,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyButtonActive: {
        backgroundColor: '#DA291C',
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
        minWidth: 18,
        textAlign: 'center',
    },
    orderItemTotal: {
        fontSize: 14,
        fontWeight: '700',
        color: '#000000',
        marginLeft: 8,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    paymentRadio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#CCCCCC',
    },
    paymentRadioActive: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 5,
        borderColor: '#DA291C',
    },
    paymentText: {
        fontSize: 14,
        color: '#000000',
    },
    cardForm: {
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    inputRow: {
        marginBottom: 12,
    },
    inputRowDouble: {
        flexDirection: 'row',
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#707070',
        marginBottom: 6,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#000000',
        backgroundColor: '#FAFAFA',
    },
    inputError: {
        borderColor: '#DA291C',
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        fontSize: 11,
        color: '#DA291C',
        marginTop: 4,
    },
    pixInfo: {
        marginTop: 12,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'center',
        paddingBottom: 8,
    },
    pixText: {
        fontSize: 13,
        color: '#707070',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 18,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#707070',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    totalRow: {
        marginTop: 6,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    totalLabel: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000000',
    },
    totalValue: {
        fontSize: 17,
        fontWeight: '700',
        color: '#DA291C',
    },
    bottomSpacer: {
        height: 20,
    },
    footer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    finishButton: {
        height: 48,
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    finishButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
});