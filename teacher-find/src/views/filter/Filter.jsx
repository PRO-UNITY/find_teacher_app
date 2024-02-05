import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import { grayColor, greenColor, mainColor } from "../../utils/colors";

const categories = [
  'Science',
  'Developer',
  'Psychologist',
  'CISCO',
  'JAVA',
];

const Filter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    'Science'
  );

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

