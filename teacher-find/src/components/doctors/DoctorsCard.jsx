import React from 'react';
import { StyleSheet, Text, View, Platform, Image, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { mainColor } from '../../utils/colors';



const DoctorsCard = ({
    imageUrl,
    name,
    rating,
    specialty,
    isChatButton,
    icon,
    iconColor,
    navigation,
    screen,
    doctorId,
}) => {

    return (
        <Pressable onPress={() => navigation.navigate(screen, { doctorId })} style={[styles.container, isChatButton ? styles.withChatButton : null]}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>Mr. {name}</Text>
                <Text style={styles.phoneText}>{specialty}</Text>

                <View style={styles.ratingContainer}>
                    <Icon name={icon} style={[styles.starIcon, { color: iconColor }]} />
                    <Text style={styles.ratingText}>{rating}</Text>
                </View>
                {
                    isChatButton && (
                        <Pressable onPress={() => navigation.navigate('Chat', { doctorId })} style={styles.chatNowButton}>
                            <Text style={styles.chatNowText}>Chat Now</Text>
                        </Pressable>
                    )
                }
            </View>
        </Pressable>
    );
};

export default DoctorsCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        gap: 32,
        padding: 16,
        borderRadius: 8,
        marginTop: 12,
        backgroundColor: '#fff',
        marginHorizontal: 2,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 30,
    },
    textContainer: {
        gap: 4,
        alignItems: 'flex-start',
        marginTop: -8,
        color: '#404446',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    ratingText: {
        fontSize: 14,
        color: '#404446',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#404446',
    },
    starIcon: {
        fontSize: 16,
    },
    phoneText: {
        color: '#404446',
    },
    chatNowButton: {
        color: '#054A80',
        fontWeight: 'bold',
        backgroundColor: mainColor,
        padding: 10,
        borderRadius: 6,
        marginTop: 6,
    },
    chatNowText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    withChatButton: {
        marginRight: 16,
    },
});
