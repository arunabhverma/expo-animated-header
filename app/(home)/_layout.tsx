import { Slot, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function Layout() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, [navigation]);

  return <Slot />;
}
