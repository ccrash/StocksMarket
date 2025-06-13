import React, {useEffect} from 'react'
import {View, Switch, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useThemeStore} from '../store/useThemeStore'
import {RootStackParamList} from '../types/navigation'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

type Navigation = NativeStackNavigationProp<RootStackParamList>

export const useHomeHeader = () => {
  const navigation = useNavigation<Navigation>()
  const {theme, isDark, toggleTheme} = useThemeStore()

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: theme.background},
      headerLeft: () => renderHeaderLeft(isDark, toggleTheme, theme.text)
    })
  }, [navigation, isDark, toggleTheme, theme.text])
}

function renderHeaderLeft(isDark: boolean, toggleTheme: () => void, textColor: string) {
  return (
    <View style={{paddingLeft: 16}}>
      <Switch
        value={isDark}
        onValueChange={toggleTheme}
        thumbColor={textColor}
        trackColor={{false: '#ccc', true: '#666'}}
      />
    </View>
  )
}

function renderHeaderRight(textColor: string, onPress: () => void) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="alert-circle" size={24} color={textColor} style={{paddingRight: 16}} />
    </TouchableOpacity>
  )
}
