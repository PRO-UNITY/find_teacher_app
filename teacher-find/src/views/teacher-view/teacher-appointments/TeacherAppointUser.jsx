import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

// import PatientsCardInfo from '../../../components/patients-card/PatientCardInfo';
import ClientsCardInfo from '../../../components/clients-card/ClientsCardInfo';
import { getPatientById } from '../../../services/student/student';
import { statusAppointment } from '../../../services/teacher/teacher';
// import {
//   blueColor,
//   greenColor,
//   redColor,
//   yellowColor,
// } from '../../../utils/colors';
import { blueColor, greenColor, redColor, yellowColor } from '../../../utils/colors';

const MasterAppointmentUser = ({ navigation, route }) => {
    const { patientId } = route.params;
    const [appointmentData, setAppointmentData] = React.useState(null);

    useEffect(() => {
        getPatientById(patientId).then((res) => {
            setAppointmentData(res);
        });
    }, [patientId]);

    const handleStatusAppointment = ({
        patientId,
        statusId,
        alertMessage,
    }) => {
        Alert.alert(
            `Are you sure you want to ${alertMessage}?`,
            `${alertMessage} Confirmation`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () =>
                        statusAppointment(patientId, statusId).then((res) => {
                            if (statusId === 1) {
                                Alert.alert(
                                    'Appointment Canceled',
                                    'The appointment has been canceled.'
                                );
                            } else {
                                Alert.alert(
                                    'Appointment Accepted',
                                    'The appointment has been accepted.'
                                );
                            }
                            navigation.goBack();
                        }),
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            {appointmentData ? (
                // @ts-ignore
                <ClientsCardInfo
                    key={appointmentData.id}
                    first_name={appointmentData.user.first_name}
                    content={appointmentData.content}
                    date={appointmentData.timestamp}
                    time={appointmentData.timestamp}
                    imageUrl={
                        appointmentData.user.avatar
                            ? appointmentData.user.avatar
                            : 'https://thumbs.dreamstime.com/b/happy-african-american-man-showing-thumbs-up-gesture-satisfied-client-young-glasses-like-look-camera-smiling-male-student-165241106.jpg'
                    }
                    icon='ellipse'
                    iconColor={
                        appointmentData.status === 'ONGOING'
                            ? blueColor
                            : appointmentData.status === 'CANCELED'
                                ? redColor
                                : appointmentData.status === 'COMPLETED'
                                    ? greenColor
                                    : yellowColor
                    }
                    gender={appointmentData.user.gender === 1 ? 'Male' : 'Female'}
                    status={appointmentData.status}
                    screen='AppointmentDetails'
                    navigation={'navigation'}
                    patientId={appointmentData.id}
                    buttons={[
                        {
                            label: 'Accept',
                            onPress: () =>
                                handleStatusAppointment({
                                    patientId: patientId,
                                    statusId: 2,
                                    alertMessage: 'accept the appointment',
                                }),
                            color: greenColor,
                        },
                        {
                            label: 'Cancel',
                            onPress: () =>
                                handleStatusAppointment({
                                    patientId: patientId,
                                    statusId: 1,
                                    alertMessage: 'cancel the appointment',
                                }),
                            color: redColor,
                        },
                    ]}
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default MasterAppointmentUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
});
