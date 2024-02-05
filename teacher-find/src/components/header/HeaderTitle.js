import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { greenColor, mainColor } from '../../utils/colors';

const HeaderTitle = ({ icons, navigation }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
            }}
        >
            <View style={styles.header}>
                <Text style={styles.titleText}>Find Teacher</Text>
                <View style={styles.iconsContainer}>
                    {icons.map((icon, index) => (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate(icon.screen)}
                        >
                            <View style={styles.iconContainer}>
                                <Icon name={icon.name} color={icon.color} size={icon.size} />
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HeaderTitle;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: greenColor,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        padding: 8, // Adjust as needed
    },
});
