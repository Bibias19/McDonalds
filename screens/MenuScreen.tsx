import { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeScreen";
import { getProdutos } from "../data/produtos";

type Props = NativeStackScreenProps<RootStackParamList, "Menu">;

const categories = ['Combos', 'Lanches', 'Bebidas', 'Acompanhamentos', 'Sobremesas'];

export default function MenuScreen({ navigation }: Props) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Combos');

    const produtosDaCategoria = getProdutos(categoriaSelecionada);
    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerImageWrapper}>
                    <Image
                        source={require('../images/restaurante.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={[styles.headerButton, styles.headerButtonLeft]}
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={22} color="#5e5e5e" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.headerButton, styles.headerButtonRight]}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Feather name="file-text" size={22} color="#5e5e5e" />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoCard}>
                    <View style={styles.infoTopRow}>
                        <Image
                            source={require('../images/logo.png')}
                            style={styles.infoLogo}
                            resizeMode="contain"
                        />
                        <View style={styles.infoText}>
                            <Text style={styles.brandName}>McDonald's</Text>
                            <Text style={styles.brandSubtitle}>R. Dr. Renato Paes de Barros, 1017</Text>
                        </View>
                    </View>
                    <View style={styles.statusRow}>
                        <Feather name="clock" size={14} color="#59bb48" />
                        <Text style={styles.statusText}>Aberto até 22:00</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesRow}
                    >
                        {categories.map((category) => {
                            const isActive = category === categoriaSelecionada;
                            return (
                                <TouchableOpacity
                                    key={category}
                                    activeOpacity={0.8}
                                    onPress={() => setCategoriaSelecionada(category)}
                                    style={[
                                        styles.categoryPill,
                                        isActive && styles.categoryPillActives
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            isActive && styles.categoryTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                    </ScrollView>
                    <Text style={styles.sectionTitle}>{categoriaSelecionada}</Text>
                    {produtosDaCategoria.map((produto, index) => (
                        <TouchableOpacity
                            key={produto.id}
                            style={[
                                styles.productRow,
                                index > 0 && styles.productRowDivider,
                            ]}
                            activeOpacity={0.85}
                            onPress={() => {
                                navigation.navigate("ProductDetail", {
                                    productId: produto.id,
                                });

                            }}
                        >
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>
                                    {produto.name}
                                </Text>
                                <Text style={styles.productDescription} numberOfLines={2}>
                                    {produto.description}
                                </Text>
                                <Text style={styles.productPrice}>
                                    {produto.price}
                                </Text>
                            </View>
                            <Image
                                source={produto.image}
                                style={styles.productImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    headerImageWrapper: {
        width: '100%',
        height: 200,
        position: 'relative',
        backgroundColor: '#000',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    headerButton: {
        position: 'absolute',
        top: 48,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    headerButtonLeft: {
        left: 16,
    },
    headerButtonRight: {
        right: 16,
    },
    infoCard: {
        backgroundColor: '#fff',
        marginTop: -24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        minHeight: 600,
    },
    infoTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoLogo: {
        width: 48,
        height: 48,
        borderRadius: 8,
    },
    infoText: {
        flex: 1,
    },
    brandName: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    brandSubtitle: {
        fontSize: 13,
        color: '#5e5e5e',
        marginTop: 2,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 12,
    },
    statusText: {
        color: '#59bb48',
        fontSize: 13,
        fontWeight: 'bold',
    },
    categoriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 18,
        paddingRight: 12,
    },
    categoryPill: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        backgroundColor: '#dfdfdf',
        borderRadius: 22,
    },
    categoryPillActives: {
        backgroundColor: '#FFC72C',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
    categoryTextActive: {
        color: '#000000',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
    },
    productRowDivider: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 13,
        color: '#5e5e5e',
        lineHeight: 18,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    productImage: {
        width: 90,
        height: 70,
    },

})