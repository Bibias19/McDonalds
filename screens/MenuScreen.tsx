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
 
const combos = [
    {
        id: 1,
        name: 'McOferta Média Big Mac Duplo',
        description: 'O clássico Big Mac, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 39,90',
        image: require('../images/combo-big-mac-duplo.png')
    },
    {
        id: 2,
        name: 'Novo Brabo Melt Onion Ring',
        description: 'Delicioso hambúrguer com anéis de cebola crocantes, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 41,50',
        image: require('../images/combo-brabo-melt-onion-rings.png'),
    },
    {
        id: 3,
        name: 'McCrispy Chicken Elite',
        description: 'Saboroso hambúrguer de frango crispy, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 39,90',
        image: require('../images/combo-mcrispy-elite.png'),
    },
    {
        id: 4,
        name: 'Duplo Cheddar McMelt',
        description: 'Hambúrguer suculento com cheddar derretido, acompanhado de batatas médias e uma bebida média.',
        price: 'R$ 36,20',
        image: require('../images/combo-duplo-cheddar-mcmelt.png'),
    },
];
 
const categories = ['Combos', 'Lanches', 'Bebidas', 'Fritas'];
 
export default function MenuScreen({ navigation }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>('Combos');
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
                            const isActive = category === activeCategory;
                            return (
                                <TouchableOpacity
                                    key={category}
                                    activeOpacity={0.8}
                                    onPress={() => setActiveCategory(category)}
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
                    <Text style={styles.sectionTitle}>Combos</Text>
                    {combos.map((combo, index) => (
                       <TouchableOpacity
                            key={combo.id}
                            style={[
                                styles.productRow,
                                index > 0 && styles.productRowDivider
                            ]}
                            activeOpacity={0.85}
                            onPress={() => {
                                
                             }}

                       >
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}></Text>
                            <Text style={styles.productDescription} numberOfLines={2}>
                                {combo.description}
                            </Text>
                            <Text style={styles.productPrice}>{combo.price}</Text>
                        </View>
                        <Image
                            source={combo.image}
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
 
    },
    infoTopRow: {
 
    },
    infoLogo: {
 
    },
    infoText: {
 
    },
    brandName: {
 
    },
    brandSubtitle: {
 
    },
    statusRow: {
 
    },
    statusText: {
 
    },
    categoriesRow: {
 
    },
    categoryPill: {
 
    },
    categoryPillActives: {
 
    },
    categoryText: {
 
    },
    categoryTextActive: {
 
    },
    sectionTitle: {
 
    },
    productRow: {
 
    },
    productRowDivider: {
 
    },
    productInfo: {
 
    },
    productName: {
 
    },
    productDescription: {
 
    },
    productPrice: {
 
    },
    productImage: {
 
    },
 
})