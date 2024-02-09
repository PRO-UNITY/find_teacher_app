import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import DoctorsCard from '../../components/doctors/DoctorsCard';
import { grayColor, greenColor, mainColor } from '../../utils/colors';

// import { getDoctors, getFilteredDoctors } from '../../services/doctor/doctor';
import RenderFooter from '../../components/render-footer/RenderFooter';
import { getDoctorByCategoryFilter, getFilteredDoctors, getTeachers, getTopTeachers } from '../../services/teacher/teacher';
import { getCategories } from '../../services/category/category';


const Home = ({ navigation }) => {
    const [doctors, setDoctors] = useState([]);
    const [topDoctors, setTopDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        loadDoctors(page);

    }, [page]);

    useEffect(() => {
        loadTopDoctors(page);
    }, [page]);

    useEffect(() => {
        getCategories().then((res) => {
            setCategories([{ name: 'All' }, ...res]);
        });
    }, []);

    const loadTopDoctors = async () => {
        if (loading) {
            console.log('no more data');
            return;
        }
        setLoading(true);
        try {
            const response = await getTopTeachers();
            console.log('response');
            console.log(response);
            console.log('response');
            setTopDoctors((prevDoctors) => [...prevDoctors, ...response.results]);
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
    }

    const loadDoctors = async (currentPage) => {
        if (!hasMoreData || loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await getTeachers(currentPage);
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


    const handleSearch = (text) => {
        getFilteredDoctors(text).then((res) => {
            setDoctors(res.results);
        }).catch
        setSearchQuery(text);
    };

    // const handleCategoryPress = async (category) => {
    //     setSelectedCategory(category);
    //     if (category.name === 'All') {
    //         loadDoctors(page);
    //         console.log('amir');
    //         return;
    //     }
    //     try {
    //         if (category === 'All') {
    //             console.log('All');
    //             const response = await loadDoctors();
    //             setDoctors(response.results);
    //             return;
    //         } else {
    //             const response = await getDoctorByCategoryFilter(category.id);
    //             setDoctors(response.results);
    //             console.log(response);
    //         }
    //     } catch (error) {
    //         console.error('Error filtering doctors:', error);
    //     }
    // };

    const handleCategoryPress = async (category) => {
        setHasMoreData(true);
        setSelectedCategory(category);
        setPage(1);
        console.log(category.name);
        if (category.name == 'All') {
            loadDoctors(1);
            return;
        }
        try {
            const response = await getDoctorByCategoryFilter(category.id);
            setDoctors(response.results);
        } catch (error) {
            console.error('Error filtering doctors:', error);
        }
    };


    const renderCategoryButton = (category, index) => (
        <Pressable
            key={index}
            style={[
                styles.categoryButton,
                {
                    backgroundColor: category.name === selectedCategory.name ? mainColor : '#fff',
                    borderColor: category.name === selectedCategory.name ? mainColor : grayColor,
                },
            ]}
            onPress={() => handleCategoryPress(category)}
        >
            <Text
                style={[{ color: category.name === selectedCategory.name ? '#fff' : '#000' }]}
            >
                {category.name}
            </Text>
        </Pressable>
    );

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
            screen='AppointTeacher'
            doctorId={item.id}
        />
    );
    const renderItemList = ({ item }) => (
        <DoctorsCard
            key={item.id}
            name={item.first_name}
            isChatButton={false}
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
            screen='AppointTeacher'
            doctorId={item.id}
        />
    );

    return (
        <ScrollView style={styles.container}>
            <SearchBar
                placeholder='Search Teacher...'
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

            <Text style={styles.title}>TOP Teachers</Text>
            <FlatList
                style={{ marginBottom: 16, marginTop: 16, flexDirection: 'row', gap: 16, paddingRight: 16, padding: 4 }} // A
                horizontal
                data={topDoctors}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadDoctors(page)}
                ListFooterComponent={
                    <RenderFooter loading={loading} hasMoreData={hasMoreData} />
                }
            />
            <Text style={styles.titleTitle}>Categories</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
            >
                {categories.map((category, index) =>
                    renderCategoryButton(category, index)
                )}
            </ScrollView>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 22 }}>
                <Text style={styles.titleTitle}>Popular Teacher</Text>
                <Pressable onPress={() => navigation.navigate('TopTeachers')}>
                    <Text style={{ color: greenColor, fontSize: 16, fontWeight: 'bold' }}>View All</Text>
                </Pressable>
            </View>

            <FlatList
                style={{
                    paddingVertical: 4,
                }}
                data={doctors}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItemList}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadDoctors(page)}
                ListFooterComponent={
                    <RenderFooter loading={loading} hasMoreData={hasMoreData} />
                }
            />
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 25,
        paddingHorizontal: 25,
        paddingBottom: 16,
    },
    categoryScroll: {
        flexGrow: 0,
        height: 45,
    },
    categoryButton: {
        borderColor: grayColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 22,
        marginRight: 4,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        fontWeight: 'bold',
    },
    titleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
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
    filterButton: {
        position: 'absolute',
        right: 25,
        top: 100,
        backgroundColor: mainColor,
        padding: 10,
        borderRadius: 12,
        elevation: 5,
    },
});
