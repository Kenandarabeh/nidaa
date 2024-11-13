import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CustomTextInput from '../constants/CustomTextInput';

const Screen = () => {

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Your screen content */}
        <CustomTextInput />
        <CustomTextInput />
        {/* More components */}
      </ScrollView>

};
