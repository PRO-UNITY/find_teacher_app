import {
    Image,
    StyleSheet,
    Text,
    View,
    Platform,
    Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { greenColor, mainColor, redColor } from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { addDoctorToSaved } from '../../services/doctor/doctor';
// import ReviewContentsModal from '../review-modal/ReviewContentsModal';

const DoctorInfo = ({
    avatar,
    first_name,
    about,
    review,
    doctorId,
    isFavorite,
    onBookmarkPress,
    content,
    navigation,
}) => {
    const [isSaved, setIsSaved] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);

    const handleSaveDoctor = () => {
        const data = {
            doctor: doctorId,
        };
        addDoctorToSaved(data).then(() => {
            setIsSaved(true);
            onBookmarkPress();
        });
    };

    const handleViewComments = () => {
        // setModalVisible(true);
        // console.log('modal visible', isModalVisible);
        navigation.navigate('Reviews', { doctorId });
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: avatar }} style={styles.image} />
            <Text style={styles.name}>Teacher {first_name}</Text>
            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.infoContainerText}>Save</Text>
                        <TouchableOpacity
                            onPress={() => handleSaveDoctor()}
                            style={styles.infoCard}
                        >
                            <Icon
                                name={isFavorite ? 'bookmark' : 'bookmark'}
                                size={24}
                                color={redColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.infoContainerText}>Experiences</Text>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoCardText}>+10 year</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.infoContainerText}>Rating</Text>
                        <Pressable onPress={handleViewComments} style={styles.infoCard}>
                            <Icon name='star' size={16} color='red' />
                            <Text style={styles.infoCardText}>{review}</Text>
                        </Pressable>
                    </View>
                </View>
                <View>
                    <Text style={styles.aboutTitle}>About Teacher</Text>
                    <Text style={styles.about}>{about}</Text>
                </View>
            </View>
            {isModalVisible && (
                <ReviewContentsModal
                    contents={content}
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                />
            )}
        </View>
    );
};

export default DoctorInfo;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        marginVertical: 12,
        backgroundColor: '#ffffff4e',
        padding: 4,
        paddingBottom: 20,
        width: '100%',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
        paddingHorizontal: 4,
    },
    infoContainerText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        color: greenColor
    },
    infoCard: {
        flexDirection: 'row',
        gap: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 60,
        marginTop: 10,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    infoCardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: greenColor,
    },
    aboutTitle: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
    },
    about: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
});
