import {useState} from 'react';
import {
     View,
     Text, 
     Image,
     ScrollView,
     StyleSheet,
     TouchableOpacity,
     StatusBar
    } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import {NativeStackScreenProps} from '@react-navigation/native-stack';
    import { RootStackParamList } from './HomeScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

const combos = [
    {
        id: '1',
        name: 'McOferta Média Big Mac Duplo',
        description: 'Quatro hambúrgueres (100% carne bovina),alface amaricana...',
        price: 'R$ 39,90',
        image: require('../assets/combo-big-mac-duplo.png'),
    },
    {
        id: '2',
        name: 'Novo Brabo Melt Onion Rings',
        description: 'Dois hambúrgueres (100% carne bovina), méquinese,a exclu...',
        price: 'R$ 41,50',
        image: require('../assets/combo-brabo-melt-onion-rings.png'),
    },
    {
        id: '3',
        name: 'McCrispy Chicken Elite',
        description: 'Composto por pão tipo brioche com batata,molho Honey&Fire...',
        price: 'R$ 39,90',
        image: require('../assets/combo-mccrispy-elite.png'),
    },
    {
        id: '4',
        name: 'Duplo Cheddar McMelt',
        description: 'Dois hambúrgueres (100% carne bovina),molho lacteo com queij...',
        price: 'R$ 36,90',
        image: require('../assets/combo-duplo-cheddar-mcmelt.png'),
    }
];
const categories = ['Combos','Lanches', 'Fritas', 'Bebidas'];
export default function MenuScreen({ navigation }: Props) {
    const[activeCategory, setActiveCategory] = useState('Combos');
    return (

    );
}
const styles = StyleSheet.create({
    container: {

    },
    scroll:{

    },
    scrollContent:{

    },
    headerImageWrapper:{

    },
    headerImage:{
        
    },
    headerButton:{

    },
    headerButtonLeft:{

    },
    headerButtonRight:{
    
    },
    infocard:{

    },
    infoTopRow:{

    },
    infoLogo:{

    },
    infoTexts:{

    },
    brandName:{

    },
    brandSubtitle:{

    },
    statusRow:{

    },
    statusText:{
    },
    categoriesRow:{

    },
    categoryPill:{

    },
    categoryPillActive:{

    },
    categoryPillText:{

    },
    categoryPillTextActive:{
    },
    sectionTitle:{

    },
    productRowDivider:{

    },
    productInfo:{

    },
    productName:{

    },
    productDescription:{

    },
    productPrice:{

    },
    productImage:{
        
    },
});