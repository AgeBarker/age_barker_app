import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../assets/colors";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

interface ControlPanelProps {
    onTakePhoto: () => void;
    onChoosePhoto: () => void | Promise<void>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onTakePhoto, onChoosePhoto }) => {
    return (
        <View style={styles.controlPanel}>
            <PrimaryButton title="Take photo" onPress={onTakePhoto} />
            <SecondaryButton title="Choose photo" onPress={onChoosePhoto} />
        </View>
    );
}

const styles = StyleSheet.create({
    controlPanel: {
        width: '100%',
        backgroundColor: colors.bg,
        alignItems: 'center',
    },
});

export default ControlPanel;
