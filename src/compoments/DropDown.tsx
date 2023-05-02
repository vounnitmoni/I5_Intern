import React, { FC, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Icon } from '@rneui/themed';

interface Props {
  label: string;
  style?: StyleProp<ViewStyle>;
}

const Dropdown: React.FC<Props> = ({ label, style }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
          <View style={styles.dropdown}>
            <TouchableOpacity>
                <Text >Home</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Popular</Text>
            </TouchableOpacity>
          </View>
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{label}</Text>
      <Icon type='font-awesome' name='chevron-down'/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'black',
    top: 50,
    width: "100%"
  },
});

export default Dropdown;