import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen, { RootStackParamList } from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <SafeAreaProvider>
            <CartProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Menu" component={MenuScreen} />
                        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                        <Stack.Screen name="Order" component={OrderScreen} />
                        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CartProvider>
        </SafeAreaProvider>
    );
}