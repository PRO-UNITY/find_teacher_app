import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SearchBar } from "react-native-elements";
import { grayColor, greenColor, mainColor } from "../../utils/colors";
import { getTeachers } from "../../services/teacher/teacher";
import RenderFooter from "../../components/render-footer/RenderFooter";
import DoctorsCard from "../../components/doctors/DoctorsCard";

const categories = [
  'Science',
  'Developer',
  'Psychologist',
  'CISCO',
  'JAVA',
];

const Filter = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    'Science'
  );


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

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setDoctors([]);
    setPage(1);
  };

  const renderCategoryButton = (category, index) => (
    <Pressable
      key={index}
      style={[
        styles.categoryButton,
        {
          backgroundColor: category === selectedCategory ? greenColor : '#fff',
          borderColor: category === selectedCategory ? greenColor : grayColor,
        },
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text
        style={[{ color: category === selectedCategory ? '#fff' : '#000' }]}
      >
        {category}
      </Text>
    </Pressable>
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
    <View style={styles.container}>
      <SearchBar
        placeholder='Where?'
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

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category, index) =>
          renderCategoryButton(category, index)
        )}
      </ScrollView>


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

      <Pressable style={styles.applyButton}>
        <Text>Apply</Text>
      </Pressable>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 25,
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
  applyButton: {
    backgroundColor: mainColor,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 28,
    left: 25,
    right: 25,
  },
});

