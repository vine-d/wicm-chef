import { useState } from "react";
import { ScrollView, Alert } from "react-native";

import Ingredient from "@/components/ingredient";
import Selection from "@/components/selection";

import { styles } from "./styles";

export default function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(selected.filter((item) => item !== value));
    }
    return setSelected([...selected, value]);
  }

  function handleClearSelection() {
    Alert.alert("Clear selection", "Clear all the selected ingredients?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => setSelected([]) },
    ]);
  }

  return (
    <>
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
      {selected.length > 0 && (
        <Selection
          quantity={selected.length}
          onClear={handleClearSelection}
          onSearch={() => {}}
        />
      )}
    </>
  );
}
