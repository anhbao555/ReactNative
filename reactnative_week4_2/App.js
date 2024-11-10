import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const DATA = [
  {
    id: '1',
    image : require('./assets/Capture1.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  },
  {
    id: '2',
    image : require('./assets/Capture2.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  },
  {
    id: '3',
    image : require('./assets/Capture3.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  },
  {
    id: '4',
    image : require('./assets/Capture4.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  },
  {
    id: '5',
    image : require('./assets/Capture5.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  },
  {
    id: '6',
    image : require('./assets/Capture6.PNG'),
    price : "69.900 đ",
    title: 'Cáp chuyển từ cổng USB sang PS2...',
  }
];

const Item = ({ title, price, image }) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Chat</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Image source = {require("./assets/Button/return.PNG")} style={styles.topBarButton}/>
        </TouchableOpacity>
        <Text style={styles.topBarText}>Chat</Text>
        <TouchableOpacity>
          <Image source = {require("./assets/Button/Cart.PNG")} style={styles.topBarButton}/>
        </TouchableOpacity>
      </View>

      {/* FlatList content */}
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} price={item.price} image={item.image} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 70 }}  // To avoid hiding items behind bottom bar
      />

      {/* Navigation bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navButton}>
          <Image source = {require("./assets/Button/Menu.PNG")} style={styles.navButtonText}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source = {require("./assets/Button/Home.PNG")} style={styles.navButtonText}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source = {require("./assets/Button/RollbackPage.PNG")} style={styles.navButtonText}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0084ff',  // Blue color for the top bar
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topBarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topBarButton: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    flex : 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    justifyContent : "space-between"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap : "wrap"
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0084ff',  // Blue color for the bottom bar
    paddingVertical: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
