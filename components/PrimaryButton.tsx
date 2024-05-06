import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../assets/colors";

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: colors.light,
        fontSize: 18,
    },
});

export default PrimaryButton;