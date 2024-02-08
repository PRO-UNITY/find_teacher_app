import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, Platform, Pressable, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import DoctorInfo from "../../components/teacher-info/TeacherInfo";
import { greenColor, mainColor } from "../../utils/colors";
import { getDoctorById } from "../../services/teacher/teacher";
import AppointmentCard from "../../components/appointment-card/AppointmentCard";

const AppointmentTeacher = ({ navigation, route }) => {
  const [doctor, setDoctor] = useState();
  const { doctorId } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppointment, setIsAppointment] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);


  useEffect(() => {
    getDoctorById(doctorId).then((res) => {
      setDoctor(res);
      console.log(res);
    }).catch((error) => console.log(error))
  }, []);

  const handleAppointment = () => {
    // navigation.navigate('AppointmentSchedule');
    setIsAppointment(!isAppointment)
  }

  const handleBookmarkPress = () => {
    setDoctor({ ...doctor, is_saved: !doctor.is_saved });
  };

  const closeAppointmentModal = () => {
    setIsAppointment(false);
  };
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
          doctorId={doctorId}
          isFavorite={doctor?.is_saved}
          onBookmarkPress={handleBookmarkPress}
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
          onPress={() => navigation.navigate('Chat', { userId: doctorId })}
          style={styles.customButtonChat}
        >
          <Text style={styles.buttonTextChat}>Chat Now</Text>
        </Pressable>
        <Pressable
          onPress={handleAppointment}
          style={styles.customButton}
        >
          <Text style={styles.buttonText}>Add schedule</Text>
        </Pressable>
      </ScrollView>


      <Modal
        visible={isAppointment}
        transparent={true}
        animationType='slide'
        onRequestClose={toggleModal}
      >
        <AppointmentCard
          masterId={doctorId}
          onClose={closeAppointmentModal}
        />
      </Modal>
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
