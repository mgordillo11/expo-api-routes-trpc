import { TouchableOpacity, Image, View } from 'react-native';

export default function AuthFacebook() {
  return (
    <View>
      <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
        <Image source={require('@/assets/icons/facebook.png')} className="w-10 h-10" />
      </TouchableOpacity>
    </View>
  );
}
