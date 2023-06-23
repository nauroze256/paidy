import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Header from "./Header";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Main() {
  const [todos, setTodos] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [todoKey, setTodoKey] = useState(0)

  const dataLoader = async() => {
      try {
          const keys = await AsyncStorage.getAllKeys()
          console.log("keys --- ",keys);
          setTodoKey(keys?.length)
          const result = await AsyncStorage.multiGet(keys);
        for(let i = 0; i < result?.length; i++){
          let object = {}
          object.id = result[i][0]
          object.name = JSON.parse(result[i][1])
          console.log("object --- ",object);
          if(!todos.includes(object)){
          setTodos(p => [...p,object])
          console.log("todos",todos);
          }
        }
      } catch (e) {
        console.log("ee",e);
      }
  };

  useEffect(() => {
    dataLoader();
  }, []);

  const deleteHandler = (ID) => {
    console.log("sss");
    setTodos(prev => prev.filter(val => val.id !== ID))
    AsyncStorage.removeItem(ID)
  };

  const renderItem = ({ item }) => {
    return (
      <TodoItem
        key={item}
        item={item}
        dataLoader={dataLoader}
        deleteHandler={deleteHandler}
      />
    );
  };


  const submitHandler = (text) => {
    console.log("todo ---",todos);
    if(text?.length > 0){
    setTodoKey(todoKey + 1)
    let object = {}
    object.id = `Todo${todoKey}`
    object.name = text
    setTodos(p => [...p,object])
    AsyncStorage.setItem(`Todo${todoKey}`, JSON.stringify(text))
    }
  };

  return (
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          {/* to form */}
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    paddingHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
