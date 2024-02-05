import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import { blueColor, grayColor, redColor } from '../../utils/colors';
import { SearchBar } from 'react-native-elements';

const ChatList = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState([
    {
      initiator: {
        first_name: 'John',
      },
      receiver: {
        first_name: 'John',
        avatar: 'https://c8.alamy.com/comp/D2ENPC/happy-male-teacher-with-textbooks-in-classroom-D2ENPC.jpg',
      },
      last_message: 'Hello',
      is_activate: true,
    },
    {
      initiator: {
        first_name: 'John',
      },
      receiver: {
        first_name: 'James',
        avatar: 'https://st3.depositphotos.com/16122460/18966/i/450/depositphotos_189668580-stock-photo-young-male-teacher-with-book.jpg',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'Sobir',
      },
      receiver: {
        first_name: 'Sobir',
        avatar: 'https://www.shutterstock.com/image-photo/portrait-confident-african-american-male-260nw-388588375.jpg',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'Ibrohim',
      },
      receiver: {
        first_name: 'Ibragim',
        avatar: 'https://www.shutterstock.com/image-photo/indian-male-entrepreneur-casual-shirt-260nw-2169877605.jpg',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'Jobir',
      },
      receiver: {
        first_name: 'Jobir',
        avatar: 'https://www.shutterstock.com/image-photo/happy-teacher-stationery-against-beige-260nw-2265988341.jpg',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'John',
      },
      receiver: {
        first_name: 'David',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-O-QY_dcj5TKxFLeCh1apU757mXUxnMmTQ&usqp=CAU',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'James Cameron',
      },
      receiver: {
        first_name: 'Doe',
        avatar: 'https://media.istockphoto.com/id/1160926571/photo/portrait-of-male-elementary-school-teacher-standing-in-classroom.jpg?s=612x612&w=0&k=20&c=l_CVoCyASapk6kyppTvBGWZzNULZJauCrMBDSE3wI_k=',
      },
      last_message: 'Hello',
      is_activate: false,
    },
    {
      initiator: {
        first_name: 'John',
        avatar: 'https://st3.depositphotos.com/16122460/18966/i/450/depositphotos_189668580-stock-photo-young-male-teacher-with-book.jpg',
      },
      receiver: {
        first_name: 'Merlin',
        avatar: 'https://www.w3schools.com/w3images/avatar2.png',
      },
      last_message: 'Hello',
      is_activate: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);

  //   const fetchChatRooms = async () => {
  //     const response = await getChatRooms(page);
  //     console.log(response);
  //     const newChatRooms = response.results;
  //     setChatRooms((prevChatRooms) =>
  //       page === 1 ? newChatRooms : [...prevChatRooms, ...newChatRooms]
  //     );
  //     setPage((prevPage) => (response.next ? prevPage + 1 : prevPage));
  //   };

  //   useEffect(() => {
  //     fetchChatRooms();
  //   }, []);

  //   useEffect(() => {
  //     AsyncStorage.getItem('role').then((res) => setRole(res || ''));
  //   }, []);

  //   const handleCompleteAppointment = (
  //     appointments: number,
  //     statusId: number
  //   ) => {
  //     const data = {
  //       appointments: appointments,
  //     };
  //     Alert.alert(
  //       'Complete Appointment',
  //       'Are you sure you want to complete this appointment?',
  //       [
  //         {
  //           text: 'No',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: () => {
  //             statusAppointment(data.appointments, statusId).then(() => {
  //               Alert.alert(
  //                 'Appointment Completed',
  //                 'The appointment has been completed.'
  //               );
  //             });
  //           },
  //         },
  //       ]
  //     );
  //   };

  const handleSearch = (text) => {
    getFilteredDoctors(text).then((res) => {
      setDoctors(res.results);
    });
    setSearchQuery(text);
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      disabled={item.is_activate ? false : true}
      style={styles.userItem}
      onPress={() => {
        navigation.navigate('Chat', {
          userId: item.id,
        });
      }}
    >
      <Image source={{ uri: item.receiver.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.type === 'initiator'
            ? item.initiator.first_name
            : item.receiver.first_name}
        </Text>
        <Text style={styles.lastMessage}>{item.last_message}</Text>

        {role === 'doctor' && (
          <TouchableOpacity
            style={[
              item.is_activate
                ? styles.completeButton
                : styles.disableCompeteButton,
            ]}
          // onPress={() => handleCompleteAppointment(item.appointments, 3)}
          >
            <Text style={styles.completeButtonText}>
              {item.is_activate ? 'Complete' : 'Completed'}
            </Text>
          </TouchableOpacity>
        )}
        {role === 'patient' && (
          <TouchableOpacity
            style={[
              item.is_activate
                ? styles.completeButton
                : styles.disableCompeteButton,
            ]}
          >
            <Text style={styles.completeButtonText}>
              {item.is_activate ? 'In Progress' : 'Completed'}
            </Text>
          </TouchableOpacity>
        )}
        {role === 'patient' && item.is_activate === false && (
          <TouchableOpacity
            onPress={() => setShowReviewModal(true)}
            style={styles.reviewButton}
          >
            <Text style={styles.completeButtonText}>Send review</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.time}></Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
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
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={chatRooms}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
        //   onEndReached={fetchChatRooms}
        onEndReachedThreshold={0.1}
      />
    </ScrollView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: blueColor,
    padding: 6,
    borderRadius: 5,
  },
  disableCompeteButton: {
    backgroundColor: redColor,
    padding: 6,
    borderRadius: 5,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  reviewButton: {
    backgroundColor: grayColor,
    padding: 6,
    borderRadius: 5,
    marginTop: 10,
  },
  lastMessage: {
    color: '#555',
  },
  time: {
    color: '#777',
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
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
