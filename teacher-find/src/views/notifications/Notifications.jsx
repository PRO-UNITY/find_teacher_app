import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import NotificationItem from '../../components/notification-item/NotificationItem';
import { getNotifications } from '../../services/notification/notification';
import { mainColor } from '../../utils/colors';

const Notification = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);

    useEffect(() => {
        fetchNotifications(page);
    }, [page]);

    const fetchNotifications = async (pageNumber) => {
        try {
            setLoading(true);
            const res = await getNotifications(pageNumber);
            console.log(res);

            if (res?.results?.length > 0) {
                setNotifications((prevNotifications) => [
                    ...prevNotifications,
                    ...res.results,
                ]);
                if (res?.next) {
                    setPage((prevPage) => prevPage + 1);
                } else {
                    setHasMoreData(false);
                }
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEndReached = () => {
        if (!loading && notifications.length > 0 && hasMoreData) {
            if (navigation && navigation.dispatch) {
                fetchNotifications(page);
            } else {
                console.error('Navigation object or dispatch method is not available.');
            }
        }
    };

    return (
        <View style={styles.container}>
            {
                notifications.length === 0 && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>No notifications found</Text>
                    </View>
                )
            }
            <FlatList
                data={notifications}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <NotificationItem
                        notificationId={item.id}
                        navigation={navigation}
                        avatar={item.user.avatar}
                        sender={item.user.first_name}
                        isSeen={item.is_seen ? 'Seen' : 'Unseen'}
                        date={item.created_at}
                        content={
                            item.notification_type === 'MESSAGE_DOCTOR_SENT'
                                ? 'MESSAGE_MASTER_SENT'
                                : item.notification_type === 'DOCTOR_CONFIRMED_APPOINTMENT'
                                    ? 'MASTER_CONFIRMED_APPOINTMENT'
                                    : item?.notification_type
                        }
                    />
                )}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    notificationItem: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        gap: 4,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    sender: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    seen: {
        fontSize: 12,
        color: mainColor,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: '#555',
        marginBottom: 8,
    },
    content: {
        fontSize: 14,
        color: '#333',
    },
});

export default Notification;
