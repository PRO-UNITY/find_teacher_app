import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
// import DoctorsCard from '../../../components/masters-card/MastersCard';
import RenderFooter from '../../components/render-footer/RenderFooter';
// import { getAppointments, getDoctors } from '../../services/masters/masters';
import { getAppointmentDoctors } from '../../services/teacher/teacher';
import ClientAppointmentCards from '../../components/appointment-card/ClientAppointmentsCard';
import AppointmentCard from '../../components/appointment-card/AppointmentCard';
import {
    blueColor,
    grayColor,
    greenColor,
    redColor,
    yellowColor,
} from '../../utils/colors';

const Appointments = ({ navigation }) => {
    const [doctors, setDoctors] = useState([]);
    const [page, setPage] = useState(1); 891
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const isFocused = useIsFocused();

    // get appointment doctors
    useEffect(() => {
        getAppointmentDoctors(page).then((res) => {
            console.log(res);
            setDoctors(res.results);
        });
    }, [isFocused]);

    //   const loadAppointments = async (currentPage: number) => {
    //     if (!hasMoreData || loading) {
    //       return;
    //     }
    //     setLoading(true);
    //     try {
    //       const response = await getAppointments(currentPage);

    //       if (response && response.results) {
    //         console.log(response);

    //         setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

    //         if (response.next) {
    //           // setPage(currentPage + 1);
    //           console.log('next page');
    //         } else {
    //           setHasMoreData(false);
    //         }
    //       } else {
    //         // Handle the case where response or results is undefined
    //         console.error(
    //           'Invalid response or results in getAppointments:',
    //           response
    //         );
    //       }
    //     } catch (error) {
    //       console.error('Error loading doctors:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    const renderItem = ({ item }) => (
        <ClientAppointmentCards
            key={item.id}
            name={item.doctor.first_name}
            rating={item.doctor.review}
            date={item.timestamp}
            time={item.timestamp}
            status={item?.status ? item.status : 'No status'}
            specialty={item.categories ? item.categories : 'Massajist'}
            imageUrl={
                item.doctor.avatar ||
                'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
            }
            navigation={navigation}
            screen='MasterDetails'
            masterId={item.id}
            icon='ellipse'
            iconColor={
                item.status === 'IN_PROGRESS'
                    ? grayColor
                    : item.status === 'CANCELLED'
                        ? redColor
                        : item.status === 'ONGOING'
                            ? greenColor
                            : item.status === 'COMPLETED'
                                ? blueColor
                                : yellowColor
            }
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.appointmentContent}>
                <Text style={styles.title}>Your Appointments</Text>
            </View>
            <FlatList
                data={doctors}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadAppointments(page)}
                ListFooterComponent={
                    <RenderFooter loading={loading} hasMoreData={hasMoreData} />
                }
            />
        </View>
    );
};

export default Appointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
        paddingBottom: 16,
    },
    appointmentContent: {
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#054A80',
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginBottom: 16,
    },
    searchBarInputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    footer: {
        marginVertical: 20,
    },
});
