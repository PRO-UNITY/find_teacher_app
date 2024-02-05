import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DoctorsCard from "../../components/doctors/DoctorsCard";
import RenderFooter from "../../components/render-footer/RenderFooter";
import { SearchBar } from "react-native-elements";
import { mainColor } from "../../utils/colors";
import { Icon } from 'react-native-elements';


const SavedTeachers = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            first_name: 'John Doe',
            reviews: 4.5,
            categories: 'Accounant',
            avatar: 'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg',
            phone: '123-456-7890'
        },
        {
            id: 2,
            first_name: 'Jane Smith',
            reviews: 4.8,
            categories: 'Science',
            avatar: 'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg',
            phone: '987-654-3210'
        },
        {
            id: 2,
            first_name: 'Jane Smith',
            reviews: 4.8,
            categories: 'Backend Developer',
            avatar: 'https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg',
            phone: '987-654-3210'
        },
    ]);

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
            <View style={styles.searcherContainer}>
                <SearchBar
                    placeholder='Search Doctors...'
                    value={searchQuery}
                    platform='default'
                    containerStyle={styles.searchBarContainer}
                    inputContainerStyle={styles.searchBarInputContainer}
                    loadingProps={{}}
                    showLoading={false}
                    lightTheme={false}
                    round={false}
                    onClear={() => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                    onChangeText={(text) => handleSearch(text)}
                />

                <Pressable onPress={() => navigation.navigate('Filter')} style={styles.filterButton}>
                    <Icon name='category' size={24} />
                </Pressable>
            </View>


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

export default SavedTeachers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingLeft: 25,
    },
    searcherContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: mainColor,
        padding: 10,
        borderRadius: 12,
        elevation: 5,
    },
    searchBarContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: '80%',
    },
    searchBarInputContainer: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
});
