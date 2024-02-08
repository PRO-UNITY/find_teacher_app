import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DoctorsCard from "../../components/doctors/DoctorsCard";
import RenderFooter from "../../components/render-footer/RenderFooter";
import { getTeachers } from "../../services/teacher/teacher";

const TopTeachers = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [page, setPage] = useState(1);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        loadDoctors(page);
        getTeachers().then((res) => console.log(res))
    }, [page]);

    const loadDoctors = async (currentPage) => {
        if (!hasMoreData || loading) {
            return;
        }

        setLoading(true);
        try {
            const response = await getTeachers(currentPage);
            console.log(response);
            setDoctors((prevDoctors) => [...prevDoctors, ...response.results]);

            if (response.next) {
                setPage(currentPage + 1);
            } else {
                setHasMoreData(false);
            }
        } catch (error) {
            console.error('Error loading doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <DoctorsCard
            key={item.id}
            name={item.first_name}
            isChatButton={true}
            rating={item.reviews}
            specialty={item.categories ? item.categories : 'Urolog'}
            imageUrl={
                item.avatar ||
                'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg'
            }
            icon='star'
            iconColor='#FFC700'
            phone={item.phone}
            navigation={navigation}
            screen='AppointDoctor'
            doctorId={item.id}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                style={{ paddingLeft: 4 }}
                data={doctors}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadDoctors(page)}
                ListFooterComponent={
                    <RenderFooter loading={loading} hasMoreData={hasMoreData} />
                }
            />
        </View>
    );
};

export default TopTeachers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingLeft: 25,
    },
});
