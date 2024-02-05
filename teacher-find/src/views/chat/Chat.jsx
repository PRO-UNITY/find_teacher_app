import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    blueColor,
    greenColor,
    mainColor,
} from '../../utils/colors';
// import {
//     getChatConversationById,
//     putChatConversationById,
// } from '../../services/chat/chat';

const Chat = ({ route }) => {
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState([
        {
            "user": {
                "id": 123,
                "name": "John Doe",
                "role": "admin"
            },
            "messages": [
                {
                    "id": 1,
                    "text": "Hello!",
                    "sender_type": "initiator"
                },
                {
                    "id": 2,
                    "text": "Hi there!",
                    "sender_type": "receiver"
                },
            ]
        },
        {
            "user": {
                "id": 456,
                "name": "Jane Doe",
                "role": "user"
            },
            "messages": [
                {
                    "id": 3,
                    "text": "Hey!",
                    "sender_type": "initiator"
                },
                {
                    "id": 4,
                    "text": "Hello John!",
                    "sender_type": "receiver"
                },
            ]
        },
        {
            "user": {
                "id": 789,
                "name": "Alice",
                "role": "user"
            },
            "messages": [
                {
                    "id": 5,
                    "text": "Good day!",
                    "sender_type": "initiator"
                },
                {
                    "id": 6,
                    "text": "Hi Alice!",
                    "sender_type": "receiver"
                },
            ]
        },
    ]);

    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingNextPage, setLoadingNextPage] = useState(false);
    const [role, setRole] = useState('');
    const pageRef = useRef(1);

    // useEffect(() => {
    //     getChatConversationById(route.params.userId, pageRef.current).then(
    //         (res) => {
    //             console.log(res);
    //             setMessages(res.results);
    //         }
    //     );
    // }, [route.params.userId]);

    // useEffect(() => {
    //     AsyncStorage.getItem('role').then((res) => setRole(res || ''));
    // }, []);

    const loadNextPage = async () => {
        if (loading || loadingNextPage) return;
        setLoadingNextPage(true);
        try {
            const nextPage = pageRef.current + 1;
            const response = await getChatConversationById(
                route.params.userId,
                nextPage
            );
            if (response.next === null) {
                console.log('End of Chat');
                return;
            } else {
                const newMessages = response.results.filter((newMessage) => {
                    return !messages.some(
                        (existingMessage) => existingMessage.id === newMessage.id
                    );
                });
                setMessages((prevMessages) => [...prevMessages, ...newMessages]);
                pageRef.current = nextPage;
            }
        } catch (error) {
            return;
        } finally {
            setLoadingNextPage(false);
        }
    };

    const handleSendMessage = () => {
        const newMessage = {
            text: inputText,
        };
        setMessages((prevMessages) => [newMessage, ...prevMessages]);
        putChatConversationById(route.params.userId, newMessage);
        clearInputs([setInputText]);
    };

    const renderMessage = ({ item }) => {
        const isInitiator = item.sender_type === 'initiator';
        const isReceiver = item.sender_type === 'receiver';

        return (
            <View
                style={[
                    styles.messageContainer,
                    isInitiator ? styles.initiatorMessage : styles.userMessage,
                    isReceiver ? styles.receiverMessage : styles.userMessage,
                ]}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    const reversedMessages = messages.flatMap((msgObj) => msgObj.messages).reverse()

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}
        >
            <View style={styles.header}>
                <Text style={styles.headerText}>Chating</Text>
            </View>

            <FlatList
                data={reversedMessages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => item.id.toString() || index.toString()}
                contentContainerStyle={styles.contentContainer}
                onEndReachedThreshold={0.5}
                onMomentumScrollEnd={({ nativeEvent }) => {
                    const reachedEnd =
                        nativeEvent.layoutMeasurement.height +
                        nativeEvent.contentOffset.y >=
                        nativeEvent.contentSize.height;
                    if (reachedEnd) {
                        loadNextPage();
                    }
                }}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Type a message'
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
    },
    header: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: greenColor,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerButton: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        marginVertical: 5,
        maxWidth: '80%',
        borderRadius: 10,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: mainColor,
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: blueColor,
    },
    initiatorMessage: {
        alignSelf: 'flex-end',
        backgroundColor: blueColor,
    },
    messageText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 25,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: 'white',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: mainColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
