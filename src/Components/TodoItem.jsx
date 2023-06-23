import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TodoItem = ({ item, deleteHandler }) => {

  return (
      <View style={styles.item}>
        <Text style={{flexBasis:"80%"}}>{item.name}</Text>
        <TouchableOpacity onPress={() => deleteHandler(item.id)} style={{alignContent:'flex-end',flexBasis:'15%',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{color:'red'}}>Delete</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#ccd8ff",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent:'space-between',
    flexDirection: "row",
  },
});

export default TodoItem;
