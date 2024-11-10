import React, {useState} from 'react';
import { Button, View, Text, Image, StyleSheet, Card, TouchableOpacity} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ route, navigation }) {
  const { selectedColor, selectedImage } = route.params || {};
  
  // Ảnh mặc định
  const defaultImage = require('./assets/vs.png');
  return (
    <View style = {styles.container}>
        <View style = {{flex : 1}}>
          <Image
            style = {{resizeMode : "contain", height :230, flex : 1}}
            source={selectedImage || defaultImage}
          />
          
        </View>
        <View style = {styles.productname}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</View>
        <View style={styles.ratingContainer}>
        <Text style={styles.ratingStars}>★ ★ ★ ★ ★</Text>
        <Text style={styles.ratingCount}>(Xem 828 đánh giá)</Text>
        </View>
        <View style = {styles.price}>
        <View style = {{color : "black", fontWeight : 700}}>1.790.000</View>
        <View style = {{textDecorationLine: 'line-through'}}>1.790.000</View>
        </View>
        <View style = {styles.slogan}>
        <View>Ở đâu rẻ hơn hoàn tiền</View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style = {styles.colorbtn} onPress={() => navigation.navigate('Details')}>
          <Text style = {styles.colorfont}>4 MÀU - CHỌN MÀU</Text> 
          <Text style= {styles.arrow}>{'>'}</Text>  
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buybtn}>
          <Text style = {styles.buyfont}>Chọn mua</Text>   
        </TouchableOpacity>
        </View>
        
    </View>
    
  );
}

function DetailsScreenProduct({navigation}) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(require('./assets/vs.png'));
  
  const colors = [
    { name: 'Xanh nhạt', color: '#ADD8E6', image : require('./assets/whitephone.png')},
    { name: 'Đỏ', color: '#FF0000', image : require('./assets/redphone.png') },
    { name: 'Đen', color: '#000000', image : require('./assets/blackphone.png') },
    { name: 'Xanh dương', color: '#0000FF', image : require('./assets/bluephone.png') },
  ];

  const handleColorSelect = (item) => {
    setSelectedColor(item.name);
    setSelectedImage(item.image);
  };

  const handleDonePress = () => {
    // Truyền dữ liệu về màn hình sản phẩm
    navigation.navigate("Home", {
      selectedColor: selectedColor,
      selectedImage: selectedImage,
    });
  };
  return (
    <View style={styles.container}>
      <View style = {{flexDirection: "row"}}>
          <Image
            style = {{resizeMode : "contain", height: 100,width: 100}}
            source={selectedImage}
            
          />
          <View style = {styles.productDetails}>
            <Text>Điện Thoại Vsmart Joy 3</Text>
            <Text>Hàng chính hãng</Text>
            
            {selectedColor && (
            <>
              <Text style={styles.selectedColorText}>Màu: <Text style = {{fontWeight : 'bold'}}>{selectedColor}</Text></Text>
              <Text>Cung cấp bới <Text style = {{fontWeight : 'bold'}}>Tiki Tradding</Text></Text>
              <Text style={styles.selectedPriceText}>1.790.000 đ</Text>
            </>
          )}
            
          </View>
        </View>

      <Text>Chọn một màu bên dưới:
      </Text>
    
      <View style = {{alignItems : "center"}}>
        {colors.map((item) => (
          <TouchableOpacity
            style={[styles.colorBlockContainer, { backgroundColor: item.color }]}
            Cung cấp bởi Tiktok Tradding
            onPress={() => handleColorSelect(item)}
          >
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={styles.doneButton}
        onPress={handleDonePress}
      >
        <Text>XONG</Text>
      </TouchableOpacity>
    </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreenProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex : 1,
    backgroundColor: '#ecf0f1',
    padding: 20,
  },

  ratingContainer: {
    flexDirection: 'row',
    justifyContent : "space-around",
    marginBottom: 8,
  },

  ratingStars: {
    fontSize: 16,
    color: '#FFD700', // Màu vàng cho sao
  },
  ratingCount: {
    fontSize: 14,
    marginLeft: 4,
    color: '#888',
  },
  
  productname : {
    height : 18,
    fontWeight : 400,
    fontSize : 15,
    textAlign : "center"
  },
  price :{
    flexDirection: "row",
    alignItems : "flex-start",
    fontStyle : "Roboto",
    justifyContent : "space-around"
  },
  slogan : {
     color : "red", 
     fontWeight : 700
  },
  

  colorbtn : {
    width: '100%',
    flexDirection: 'row', // To place text and arrow in the same line
    alignItems: 'center', // Vertically align items
    borderWidth: 1,
    borderColor: 'black', // Light border color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center', // Space between text and arrow
    marginBottom: 20, // Spacing between buttons
  },

  colorfont : {
    fontWeight: 700, 
    fontSize : 20, color : "black", 
    fontStyle : "bold",
    justifyContent : "center"
  }, 
  buybtn : {
    backgroundColor: 'red', // Red background color for the buy button
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center', // Center the text
    width: '100%'
  },

  buyfont : {
    fontWeight: 700, 
    fontSize : 20, color : "white", 
    fontStyle : "bold",
    justifyContent : "center"
  },

  doneButton : {
    width: '100%',
    flexDirection: 'row', // To place text and arrow in the same line
    alignItems: 'center', // Vertically align items
    borderWidth: 1,
    borderColor: 'black', // Light border color
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center', // Space between text and arrow
    marginBottom: 20, // Spacing between buttons
    backgroundColor: '#1952E294'
  },

  colorBlockContainer: {
    width: 50,
    height: 50,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000',
  },

  productDetails : {
    justifyContent: 'center',
    flexWrap : "wrap"
  },

  selectedPriceText : {
    fontWeight: 'bold'
  },

});

export default App;
