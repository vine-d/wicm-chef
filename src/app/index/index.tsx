import { View, Text } from "react-native";
import Ingredients from "@/components/ingredients";

import { styles } from "./styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select{"\n"}
        <Text style={styles.subtitle}>the ingredients</Text>
      </Text>
      <Text style={styles.message}>Find out what you can make</Text>

      <Ingredients />
    </View>
  );
}
