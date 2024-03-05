import { useState } from "react";
import { ScrollView } from "react-native";

import Ingredient from "@/components/ingredient";
import { styles } from "./styles";

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(selected.filter((item) => item !== value));
    }
    return setSelected([...selected, value]);
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {Array.from({ length: 42 }).map((_, index) => (
        <Ingredient
          key={index}
          name="apple"
          image="apple.png"
          onPress={() => handleToggleSelected(String(index))}
          selected={selected.includes(String(index)) ? true : false}
        />
      ))}
    </ScrollView>
  );
}
