import { View, Text } from "react-native";
import Animated, { BounceOutDown, SlideInDown } from "react-native-reanimated";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/theme";

type SelectionProps = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};
export default function Selection({
  quantity,
  onClear,
  onSearch,
}: SelectionProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500)}
      exiting={BounceOutDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{quantity} ingredients selected</Text>
        <MaterialIcons
          name="close"
          size={24}
          color={theme.colors.gray_400}
          onPress={onClear}
        />
      </View>
    </Animated.View>
  );
}
