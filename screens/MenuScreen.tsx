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
 
type Props = NativeStackScreenProps<RootStackParamList, "Menu">;
type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: number;
};

const combos: Product[] = [
    {
        id: 'combo-1',
        name: 'McOferta Média Big Mac Duplo',
        description: 'O clássico Big Mac, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 39,90',
        image: require('../images/combo-big-mac-duplo.png')
    },
    {
        id: 'combo-2',
        name: 'Novo Brabo Melt Onion Ring',
        description: 'Delicioso hambúrguer com anéis de cebola crocantes, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 41,50',
        image: require('../images/combo-brabo-melt-onion-rings.png'),
    },
    {
        id: 'combo-3',
        name: 'McCrispy Chicken Elite',
        description: 'Saboroso hambúrguer de frango crispy, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 39,90',
        image: require('../images/combo-mcrispy-elite.png'),
    },
    {
        id: 'combo-4',
        name: 'Duplo Cheddar McMelt',
        description: 'Hambúrguer suculento com cheddar derretido, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 36,20',
        image: require('../images/combo-duplo-cheddar-mcmelt.png'),
    },
];
const lanches: Product[] = [
    {
        id: 'lanche-1',
        name: 'Big Mac',
        description: 'O clássico hambúrguer com dois hambúrgueres, alface, queijo, picles, cebola e molho especial.',
        price: 'R$ 27,90',
        image: require('../images/lanche-big-mac.png')
    },
    {
        id: 'lanche-2',
        name: 'Duplo Quarterão',
        description: 'Dois hambúrgueres com queijo, alface, tomate, picles e ketchup.',
        price: 'R$ 15,50',
        image: require('../images/lanche-duplo-quarterao.png'),
    },
    {
        id: 'lanche-3',
        name: 'McMelt',
        description: 'Composto por pão tipo brioche de batata,molho Honey&fire...',
        price: 'R$ 18,90',
        image: require('../images/lanche-mcmelt.png'),
    },
    {
        id: 'lanche-4',
        name: 'Cheddar McMelt',
        description: 'Hambúrguer suculento com cheddar derretido, alface e molho especial.',
        price: 'R$ 18,90',
        image: require('../images/lanche-cheddar-mcmelt.png'),
    }
];
const Acompanhamentos: Product[] = [
    {
        id: 'acompanhamento-1',
        name: 'Batata Frita Grande',
        description: 'Batatas fritas crocantes, perfeitas para acompanhar seu lanche.',
        price: 'R$ 12,90',
        image: require('../images/fritas-grande.png')
    }, {
        id: 'acompanhamento-2',
        name: 'Batata Frita Média',
        description: 'Batatas fritas crocantes, perfeitas para acompanhar seu lanche.',
        price: 'R$ 9,90',
        image: require('../images/fritas-media.png')
    },
   
    {
        id: 'acompanhamento-3',
        name:'Batata pequena',
        description: 'Batatas fritas crocantes, perfeitas para acompanhar seu lanche.',
        price: 'R$ 6,90',
        image: require('../images/fritas-pequena.png')
    }
];
const Bebidas: Product[] = [
    {
        id: 'bebida-1',
        name: 'Coca-Cola 350ml',
        description: 'Refrigerante sabor cola, perfeito para acompanhar seu lanche.',
        price: 'R$ 6,90',
        image: require('../images/bebida-coca-cola.png')
    }
];
const bebidas: Product[] = [
    {
        id: 'bebida-1',
        name: 'Coca-Cola 350ml',
        description: 'Refrigerante sabor cola, perfeito para acompanhar seu lanche.',
        price: 'R$ 6,90',
        image: require('../images/coca-cola.png')
    },
    {
        id: 'bebida-2',
        name: 'Fanta Laranja 350ml',
        description: 'Refrigerante sabor laranja, perfeito para acompanhar seu lanche.',
        price: 'R$ 5,90',
        image: require('../images/fanta-laranja.png')
    },
    {
        id: 'bebida-3',
        name: 'Agua Mineral 500ml',
        description: 'Água mineral natural, perfeita para acompanhar seu lanche.',
        price: 'R$ 3,90',
        image: require('../images/agua.png')
    }

];

const categories = ['Combos', 'Lanches', 'Acompanhamentos','Bebidas' , 'Sobremesas'];
function getProdutos(categoriaSelecionada: string): Product[] {
    switch (categoriaSelecionada) {
        case 'Combos':
            return combos;
        case 'Lanches':
            return lanches;
        case 'Acompanhamentos':
            return Acompanhamentos;
        case 'Bebidas':
            return Bebidas;
        default:
            return [];
    }
}
 
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
                        onPress={() => { }}
                    >
                        <Feather name="file-text" size={22} color="#8e8989" />
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
                                index > 0 && styles.productRowDivider
                            ]}
                            activeOpacity={0.85}
                            onPress={() => {
                                
                             }}

                       >
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{produto.name}</Text>
                            <Text style={styles.productDescription} numberOfLines={2}>
                                {produto.description}
                            </Text>
                            <Text style={styles.productPrice}>{produto.price}</Text>
                        </View>
                        <Image
                            source={produto.image}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                       </TouchableOpacity>

                    ))
                }
                </View>
            </ScrollView>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
 
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    headerImageWrapper: {
        width: '100%',
        height: 240,
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
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    headerButtonLeft: {
        left: 16,
 
    },
    headerButtonRight: {
        right: 16,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal:-24,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 40,
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
        color:'#000000',
        fontWeight: 'bold',
    },
    brandSubtitle: {
        fontSize: 13,
        color: '#707070',
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
        gap: 10,
        paddingVertical: 8,
        paddingRight: 12,
    },
    categoryPill: {
        paddingVertical: 6,
        paddingHorizontal: 19,
        backgroundColor: '#f2f2f2',
        borderRadius: 22,
    },
    categoryPillActives: {
        backgroundColor: '#ffc72c',
    },
    categoryText: {
        fontSize: 14,
        color: '#737272',
        fontWeight: '600',
    },
    categoryTextActive: {
        color: '#000000',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 22,
        color: '#000000',
        fontWeight: 'bold',
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
        borderTopColor: '#e4e2e2',
    },
    productInfo: {
        flex: 1,
    },
    productName: {
         fontWeight: 'bold',
        fontSize: 14,
        color: '#121212',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 12,
        color: '#707070',
        lineHeight: 18,
        marginBottom: 8,
 
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
 
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
 
    },
 
})