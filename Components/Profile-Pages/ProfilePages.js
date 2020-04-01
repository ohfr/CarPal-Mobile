import React from "react";
import {
  View,
  Text,
  Image,
  Picker,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const ProfilePages = props => {
  return (
    <View style={styles.container}>
      <View>
        <Image />
        <Text>First Name Last Name</Text>
        <Text>Email</Text>
        <Text>Phone Number</Text>
      </View>
      <View>
        <Text>Do you prefer to drive or ride?</Text>
        <Picker>
          <Picker.Item label="Drive" value={true} />
          <Picker.Item label="Ride" value={false} />
          <Picker.Item label="Both" value={true} />
        </Picker>
      </View>
      <View>
        <Text>Hobbies</Text>
        <Picker>
          <Picker.Item label="Skiing" value="skiing" />
          <Picker.Item label="Sports" value="sports" />
        </Picker>
      </View>
      <View>
        <Text>Music I love </Text>
        <Picker>
          <Picker.Item label="Jazz" value="jazz" />
          <Picker.Item label="Rock" value="rock" />
        </Picker>
      </View>
      <View>
        <Text>Music I hate</Text>
        <Picker>
          <Picker.Item label="Classical" value="classical" />
          <Picker.Item label="Pop" value="pop" />
        </Picker>
      </View>

      <TouchableOpacity>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  }
});

export default ProfilePages;
