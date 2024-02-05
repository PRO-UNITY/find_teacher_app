import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, Platform, Pressable } from "react-native";
import React, { useState } from "react";
import DoctorInfo from "../../components/teacher-info/TeacherInfo";
import { greenColor, mainColor } from "../../utils/colors";

const AppointmentTeacher = ({ navigation }) => {

  const [doctor, setDoctor] = useState({
    first_name: "James",
    reviews: 5,
    is_saved: false,
    content: "Doctor content",
    about: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, laborum sunt libero minus animi repudiandae nam illum soluta architecto similique eveniet id, eos, quaerat necessitatibus itaque reiciendis. Dolorum, totam reiciendis?",
    avatar: "https://img.freepik.com/free-photo/young-handsome-man-holding-notebooks-concept-e-learning-courses_1258-26588.jpg",
  });

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <DoctorInfo
          first_name={doctor?.first_name}
          review={doctor?.reviews}
          // doctorId={doctorId}
          isFavorite={doctor?.is_saved}
          // onBookmarkPress={handleBookmarkPress}
          content={doctor?.content}
          navigation={navigation}
          about={
            doctor?.about
              ? doctor?.about
              : 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, laborum sunt libero minus animi repudiandae nam illum soluta architecto similique eveniet id, eos, quaerat necessitatibus itaque reiciendis. Dolorum, totam reiciendis?'
          }
          avatar={
            doctor?.avatar
              ? doctor?.avatar
              : 'https://img.freepik.com/free-photo/medium-shot-smiley-man-wearing-coat_23-2148816193.jpg'
          }
        />

        <Pressable
          style={styles.customButtonChat}
        >
          <Text style={styles.buttonTextChat}>Chat Now</Text>
        </Pressable>
        <Pressable
          style={styles.customButton}
        >
          <Text style={styles.buttonText}>Add schedule</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AppointmentTeacher;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 12,
    flex: 1,
    position: 'relative',
  },
  customButtonChat: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    backgroundColor: greenColor,
    color: '#fff',
    padding: 14,
    borderRadius: 5,
    marginBottom: 14,
    alignItems: 'center',
  },
  buttonTextChat: {
    fontWeight: 'bold',
    color: '#fff'
  },
  customButton: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: mainColor,
    padding: 14,
    borderRadius: 5,
    marginBottom: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  }
});
