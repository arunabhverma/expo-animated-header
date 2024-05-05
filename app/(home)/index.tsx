import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  useWindowDimensions,
  // ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@react-navigation/native";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  NativeViewGestureHandler,
  ScrollView,
} from "react-native-gesture-handler";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const Home = () => {
  const panGestureRef = useRef();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isDragEnable, setIsDragEnable] = useState(false);
  const { height } = useWindowDimensions();
  const bottomSheetHeight = useSharedValue(0);
  const savedBottomSheetHeight = useSharedValue(0);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    bottomSheetHeight.value = event.contentOffset.y;
  });

  // useEffect(() => {
  //   if (isOpen) {
  //     bottomSheetHeight.value = withSpring(height / 2.5);
  //   } else {
  //     onCancel();
  //   }
  // }, [isOpen, height]);

  const onCancel = () => {
    // bottomSheetHeight.value = withTiming(height, {
    //   duration: 100,
    // });
    // setTimeout(() => {
    //   setIsOpen(false);
    //   setIsDragEnable(false);
    // }, 150);
  };

  const animatedModalStyle = useAnimatedStyle(() => {
    return {
      height: bottomSheetHeight.value,
      // transform: [{ translateY: bottomSheetHeight.value }],
    };
  });

  console.log("stat", isDragEnable);

  const pan = Gesture.Pan()
    .onStart(() => {})
    .onChange((e) => {
      // let changeY = bottomSheetHeight.value + e.changeY;
      // if (changeY > 0) {
      //   bottomSheetHeight.value = changeY;
      // } else {
      //   // runOnJS(setIsDragEnable)(true);
      // }
    })
    .onEnd((e) => {
      // if (
      //   bottomSheetHeight.value > height / 2.5 &&
      //   bottomSheetHeight.value < height / 2
      // ) {
      //   bottomSheetHeight.value = withSpring(height / 2.5);
      // } else if (bottomSheetHeight.value > height / 2) {
      //   runOnJS(onCancel)();
      // } else if (bottomSheetHeight.value <= 0) {
      //   runOnJS(setIsDragEnable)(true);
      // } else {
      //   bottomSheetHeight.value = withDecay({
      //     velocity: e.velocityY,
      //     // clamp: [undefined, height / 2.5],
      //   });
      // }
    })
    .withRef(panGestureRef);

  const Wrapper = (props) => {
    return <GestureDetector {...props} />;
    // if (!props.isEnable) {
    //   return <GestureDetector {...props} />;
    // } else {
    //   return <View style={{ flex: 1 }} children={props.children} />;
    // }
  };

  const changeStyle = useAnimatedStyle(() => {
    let translateY = interpolate(
      -bottomSheetHeight.value,
      [0, height],
      [0, height]
    );
    return {
      transform: [{ translateY: -bottomSheetHeight.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Button title={"Open Bottom Sheet"} onPress={() => setIsOpen(true)} />
      <Modal
        animationType="fade"
        visible={isOpen}
        onRequestClose={onCancel}
        transparent
      >
        <Animated.View
          style={[
            {
              height: height,
              backgroundColor: "white",
              // transform: [{ translateY: 0 }],
            },
            changeStyle,
          ]}
        >
          <Animated.ScrollView
            onScroll={scrollHandler}
            disableScrollViewPanResponder={false}
          >
            {new Array(400).fill(1).map((_, index) => (
              <Text key={index.toString()}>{index + 1}. Hello world!</Text>
            ))}
          </Animated.ScrollView>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
