import React, { createContext, useState, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const ConfirmationContext = createContext();

export const useConfirmation = () => {
  return useContext(ConfirmationContext);
};

export const ConfirmationProvider = ({ children }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const show = (message, onConfirmCallback) => {
    setMessage(t(message));
    setOnConfirm(() => onConfirmCallback);
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  const confirm = () => {
    onConfirm();
    hide();
  };

  return (
    <ConfirmationContext.Provider value={show}>
      {children}
      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
        onRequestClose={hide}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.btn} onPress={hide}>
                <Text style={styles.btnText}>{t("No")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={confirm}>
                <Text style={styles.btnText}>{t("Yes")}</Text>
              </TouchableOpacity>
           
            </View>
          </View>
        </View>
      </Modal>
    </ConfirmationContext.Provider>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    marginBottom: 20,
    fontSize:20,
    textAlign: 'center',
    fontFamily: "Tajawal",
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  btn: {
    padding: 10, 
  },
  btnText: {
    fontFamily: "Tajawal",
    fontSize: 15, 
    color: 'blue',
  },
});
