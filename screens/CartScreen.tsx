import { useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './HomeScreen';
import { useCart } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
    const { items, removeItem, updateQuantity, totalPrice } = useCart();
    const insets = useSafeAreaInsets();

    const formatPrice = (value: number) => {
        return `R$ ${value.toFixed(2).replace('.', ',')}`;
    };

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
                <Text style={styles.headerTitle}>Sacola</Text>
                <View style={styles.headerButton} />
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="basket-outline" size={64} color="#CCCCCC" />
                        <Text style={styles.emptyTitle}>Sua sacola está vazia</Text>
                        <Text style={styles.emptySubtitle}>
                            Adicione itens do cardápio para começar seu pedido.
                        </Text>
                        <TouchableOpacity
                            style={styles.browseButton}
                            activeOpacity={0.85}
                            onPress={() => navigation.navigate('Menu')}
                        >
                            <Text style={styles.browseButtonText}>Ver cardápio</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.sectionTitle}>Itens adicionados</Text>
                        {items.map((item) => (
                            <View key={item.product.id} style={styles.cartItem}>
                                <Image
                                    source={item.product.image}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName} numberOfLines={2}>
                                        {item.product.name}
                                    </Text>
                                    <Text style={styles.itemPrice}>
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
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    activeOpacity={0.8}
                                    onPress={() => removeItem(item.product.id)}
                                >
                                    <Feather name="trash-2" size={18} color="#DA291C" />
                                </TouchableOpacity>
                            </View>
                        ))}
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Taxa de entrega</Text>
                            <Text style={styles.summaryValue}>R$ 0,00</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>{formatPrice(totalPrice)}</Text>
                        </View>
                        <View style={styles.bottomSpacer} />
                    </>
                )}
            </ScrollView>

            {items.length > 0 && (
                <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate('Order')}
                    >
                        <Text style={styles.continueButtonText}>Continuar pedido</Text>
                        <Ionicons name="arrow-forward" size={18} color="#000000" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 120,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
        marginTop: 16,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#707070',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    browseButton: {
        marginTop: 24,
        backgroundColor: '#FFC72C',
        borderRadius: 22,
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
    browseButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    itemImage: {
        width: 70,
        height: 60,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
        lineHeight: 18,
    },
    itemPrice: {
        fontSize: 13,
        fontWeight: '700',
        color: '#DA291C',
        marginTop: 4,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 8,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyButtonActive: {
        backgroundColor: '#DA291C',
    },
    qtyText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000000',
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        padding: 8,
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
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
        fontSize: 18,
        fontWeight: '700',
        color: '#000000',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#DA291C',
    },
    bottomSpacer: {
        height: 20,
    },
    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    continueButton: {
        height: 48,
        backgroundColor: '#FFC72C',
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000000',
    },
});