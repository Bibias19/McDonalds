import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image 
          style={styles.logo}
          resizeMode='contain'
          source={require('./images/logo.png')} />
          <Text style={styles.brandName}>McDonald's</Text>
        </View>
        <View style={styles.welcomeSection}>
          <Text style={styles.title}>Seja Bem-vindo!</Text>
          <Text style={styles.subtitle}>O que você gostaria de pedir hoje?</Text>
        </View>
        <View style={styles.cardsRow}>
          <TouchableOpacity 
           style={styles.card}
           activeOpacity={0.85}
           onPress={() => { }}
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
          <TouchableOpacity style={styles.card}>
            <View style={styles.iconCircle}>
              <Feather
                name="shopping-bag"
                size={34}
                color="#DA291C"
              />
            </View>
            <View style={styles.cardLabelPill}>
              <Text style={styles.cardLabel}>Para levar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#DA291C', // Vermelho McDonald's no fundo da SafeArea
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 30, // Cantos arredondados no topo
    borderTopRightRadius: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 80, // Aumentado de 72 para 80
    height: 80,
    marginBottom: 12, // Aumentado de 10 para 12
    borderRadius: 40, // Adicionado para deixar a logo redonda
    borderWidth: 3, // Borda ao redor da logo
    borderColor: '#DA291C', // Borda vermelha
  },
  brandName: {
    fontSize: 26, // Aumentado de 22 para 26
    fontWeight: '800', // Mudado de 700 para 800
    color: '#000000', // Mudado de preto para vermelho McDonald's
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1, // Espaçamento entre letras
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28, // Aumentado de 26 para 28
    fontWeight: '800', // Mudado de 700 para 800
    color: '#DA291C', // Mudado de preto para vermelho
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16, // Aumentado de 15 para 16
    lineHeight: 22,
    color: '#666666', // Mudado de #707070 para um tom mais escuro
    textAlign: 'center',
    fontWeight: '500', // Adicionado peso médio
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16, // Aumentado de 14 para 16
  },
  card: {
    flex: 1,
    maxWidth: 168,
    backgroundColor: '#ffffff',
    borderRadius: 24, // Aumentado de 20 para 24
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    minHeight: 30,
    // Shadow para iOS
    shadowColor: '#DA291C', // Sombra vermelha
    shadowOffset: { width: 0, height: 4 }, // Aumentado o offset
    shadowOpacity: 0.15, // Aumentado a opacidade
    shadowRadius: 8, // Aumentado o raio
    // Elevation para Android
    elevation: 6, // Aumentado de 3 para 6
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFF5F4', // Fundo vermelho bem claro
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardLabelPill: {
    backgroundColor: '#DA291C', // Mudado de #f2f2f2 para vermelho
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700', // Mantido 700
    color: '#FFFFFF', // Mudado de preto para branco
    textAlign: 'center',
  }
});