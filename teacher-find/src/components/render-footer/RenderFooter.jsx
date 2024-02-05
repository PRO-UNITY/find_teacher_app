import { ActivityIndicator } from 'react-native';

import { StyleSheet } from 'react-native';
import React from 'react';

const RenderFooter = ({ loading }) => {
    return loading ? (
        <ActivityIndicator size='large' color='#0000ff' style={styles.footer} />
    ) : null;
};

export default RenderFooter;

const styles = StyleSheet.create({
    footer: {
        marginVertical: 20,
    },
});
