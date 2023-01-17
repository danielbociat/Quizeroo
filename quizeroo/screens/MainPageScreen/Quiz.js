import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import back from '../../Images/back.png';

const Quiz = ({
  navigation,
  route: {
    params: {title},
  },
}) => {
  return (
    <View>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={back} style={styles.image}></Image>
      </Pressable>
      <ScrollView>
        <View>
          <Text style={styles.Title}>{title}</Text>
          <Text style={styles.Text2}>Questions :</Text>
          <View>
            
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Title: {
    fontSize: 50,
    alignSelf: 'center',
    padding: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  questions: {
    backgroundColor: '#E6D254',
    height: '90%',
  },
  Text2: {
    fontWeight: 'normal',
    fontSize: 22,
    padding: 10,
    // textDecorationLine: "underline",
  },
  image: {
    marginTop: 15,
    marginLeft: 10,
    height: 30,
    width: 30,
  },
});

export default Quiz;