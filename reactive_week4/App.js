import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import AssetExample from './components/AssetExample';

const DATA = [
  {
    id: '1',
    image : require('./assets/1.PNG'),
    shop : "Shop Devang",
    title: 'Ca nấu lẩu, nấu mì mini ...',
  },
  {
    id: '2',
    image : require('./assets/2.PNG'),
    shop : "Shop LTD Food",
    title: '1KG KHÔ GÀ BƠ TỎI ...',
  },
  {
    id: '3',
    image : require('./assets/3.PNG'),
    shop : "Shop Thế giới đồ chơi",
    title: 'Xe cần cầu đa năng',
  },
  {
    id: '4',
    image : require('./assets/4.PNG'),
    shop : "Shop Thế giới đồ chơi",
    title: 'Đồ chơi dạng mô hình',
  },
  {
    id: '5',
    image : require('./assets/5.PNG'),
    shop : "Shop Minh Long Book",
    title: 'Xe cần cầu đa năng',
  },
  {
    id: '6',
    image : require('./assets/6.PNG'),
    shop : "Shop Minh Long Book",
    title: 'Lãnh đạo giản đơn',
  }
];

const Item = ({ title, shop, image }) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.shop}>Shop: {shop}</Text>
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
    <SafeAreaView style={styles.containerList}>
      <Text style= {styles.textTitle}>Bạn cứ thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop!</Text>
      <FlatList
          data = {DATA}
          renderItem={({item}) => <Item image={item.image} title={item.title} shop = {item.shop}/>}
          keyExtractor={item => item.id}
      />
    </SafeAreaView>
      {/* Nav bar */}
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
  containerList: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent : "space-around"

    
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
  textTitle : {
    justifyContent : "center",
    padding : 20
  },
  title: {
    fontSize: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0084ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  topBarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  topBarButton: {
    color: '#fff',
    fontSize: 16,
  },
  button : {
    backgroundColor : 'red',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5
  },
  buttonText : {
    color : 'white'
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0084ff',  // Blue color for the bottom bar
    paddingVertical: 15,
    bottom: 0,
    width: '100%',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
  },

});
