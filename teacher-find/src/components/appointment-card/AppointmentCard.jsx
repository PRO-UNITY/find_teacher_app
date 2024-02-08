import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
} from 'react-native';
import React from 'react';
import { greenColor, mainColor, redColor } from '../../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { makeAppointment } from '../../services/teacher/teacher';

const AppointmentCard = ({ onClose, masterId }) => {
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const [content, setContent] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [time, setTime] = React.useState(new Date());

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatePickerModal = () => {
        setShowTimePicker(false);
        setShowDatePicker(true);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showTimePickerModal = () => {
        setShowTimePicker(true);
        setShowDatePicker(false);
    };

    const appointToMaster = () => {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        // Format selected time
        const formattedTime = `${time.getHours().toString().padStart(2, '0')}:${time
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;

        const data = {
            doctor: masterId,
            date: formattedDate,
            time: formattedTime,
            content: content,
        };
        makeAppointment(data)
            .then((res) => {
                console.log(res);
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.cardHeader}>Appointment</Text>

                <View style={styles.pickerContainer}>
                    <Pressable
                        onPress={showDatePickerModal}
                        style={[styles.customButton]}
                    >
                        <Text style={styles.buttonText}>Choose date</Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            testID='datePicker'
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display='default'
                            onChange={onChangeDate}
                            style={styles.picker}
                        />
                    )}
                </View>
                <View style={styles.pickerContainer}>
                    <Pressable
                        onPress={showTimePickerModal}
                        style={[styles.customButton, { width: '100%' }]}
                    >
                        <Text style={styles.buttonText}>Choose time</Text>
                    </Pressable>
                    {showTimePicker && (
                        <DateTimePicker
                            testID='timePicker'
                            value={time}
                            mode='time'
                            is24Hour={true}
                            display='default'
                            onChange={onChangeTime}
                            style={styles.picker}
                        />
                    )}
                </View>
                <TextInput
                    style={styles.input}
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    placeholder='Content'
                />

                <Pressable
                    style={styles.sendAppointmentButton}
                    onPress={appointToMaster}
                >
                    <Text style={styles.closeText}>Send</Text>
                </Pressable>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeText}>Close</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        borderRadius: 12,
        backgroundColor: 'white',
        padding: 20,
        elevation: 5,
    },
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: mainColor,
    },
    sendAppointmentButton: {
        padding: 10,
        backgroundColor: mainColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    closeButton: {
        padding: 10,
        backgroundColor: redColor,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    closeText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        marginTop: 10,
        margin: 0,
    },
    customButton: {
        width: '100%',
        backgroundColor: greenColor,
        padding: 10,
        borderRadius: 5,
        marginBottom: 25,
        alignItems: 'center',
    },
    pickerContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginVertical: 10,
        borderRadius: 5,
        fontSize: 16,
    },
});
