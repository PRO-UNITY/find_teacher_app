import { greenColor } from './colors';

// utils.js

// export const formatBusyDaysToMarkedDates = (busyDays) => {
//     return busyDays.reduce((acc, busyDay) => {
//         const dateString = new Date(busyDay.timestamp).toISOString().split('T')[0];
//         acc[dateString] = {
//             selected: true,
//             selectedColor: greenColor,
//             selectedTextColor: 'white',
//         };
//         return acc;
//     },);
// };

export const formatBusyDaysToMarkedDates = (busyDays) => {
    return busyDays.reduce((acc, busyDay) => {
        const dateString = new Date(busyDay.timestamp).toISOString().split('T')[0];
        acc[dateString] = {
            selected: true,
            selectedColor: greenColor,
            selectedTextColor: 'white',
        };
        return acc;
    }, {});
};

