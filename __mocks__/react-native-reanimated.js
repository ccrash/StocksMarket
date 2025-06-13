import Reanimated from 'react-native-reanimated/mock'

// override problematic native APIs
Reanimated.call = () => {}
Reanimated.addWhitelistedUIProps = () => {}
Reanimated.createAnimatedComponent = comp => comp
Reanimated.AnimatedImage = 'AnimatedImage'
Reanimated.AnimatedText = 'AnimatedText'
Reanimated.Image = 'Image'

// disable shared transitions
Reanimated.sharedTransitionTag = undefined

module.exports = Reanimated
