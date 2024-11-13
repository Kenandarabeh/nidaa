import React from 'react';
import { 
  View, 
  Platform, 
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

interface CustomKeyboardAvoidingViewProps {
  topContent: React.ReactNode;
  middleContent: React.ReactNode;
  bottomContent: React.ReactNode;
  enabled?: boolean;
  style?: ViewStyle;
}

const CustomKeyboardAvoidingView: React.FC<CustomKeyboardAvoidingViewProps> = ({ 
  topContent, 
  middleContent, 
  bottomContent,
  enabled = true,
  style
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={enabled}
      style={[styles.container, style]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View style={styles.section}>
        {topContent}
      </View>

      <View style={[styles.section, styles.middleSection]}>
        {middleContent}
      </View>

      {bottomContent && (
        <View style={[styles.section, styles.bottomSection]}>
          {bottomContent}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  section: {
    width: '100%',
    alignItems: 'center'
  },
  middleSection: {
    flex: 1
  },
  bottomSection: {
    marginBottom: 0
  }
});

export default React.memo(CustomKeyboardAvoidingView);
