import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState();
  const [taskItem, setTaskItem] = useState([]);

  const [click, setClick] = useState();
  const [isPressed, setIsPressed] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log(task);
    setTaskItem([...taskItem, task]);
    setTask(null);
    setClick(null);
  };

  const expandableTask = (index) => {
    if (isPressed) {
      setClick(null);
    }
    return (
      <TouchableOpacity key={index} onPress={() => completedTask(index)}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Remove</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const completedTask = (index) => {
    let itemCopy = [...taskItem];
    itemCopy.splice(index, 1);
    setTaskItem(itemCopy);
    setClick(null);
    setIsPressed(!isPressed);
  };

  return (
    <View style={styles.container}>
      {/* Todays Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.items}>
            {/* This is where the tasks will be called */}
            {taskItem.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setClick(index);
                    setIsPressed(!isPressed);
                  }}
                >
                  {item != null && <Task text={item} />}
                  {click === index && expandableTask(index)}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    maxWidth: 250,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    width: 250,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 20,
  },
  scroll: {
    marginTop: 30,
    height: "76%",
  },
  deleteButton: {
    backgroundColor: "white",
    padding: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -7,
    marginBottom: 5,
  },
  deleteButtonText: {
    padding: 10,
    color: "red",
  },
});
