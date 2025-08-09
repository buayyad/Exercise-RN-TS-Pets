import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import pets from "@/data/pets";
import PetItem from "./PetItem";

const PetList = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [adoptedPets, setAdoptedPets] = useState<number[]>([]);
  const handleAdoptPet = (petId: number) => {
    setAdoptedPets([...adoptedPets, petId]);
  };
  const petList = pets
    .filter(
      (pet) =>
        pet.name.toLowerCase().includes(query.toLowerCase()) &&
        (type === "All" || pet.type === type) &&
        !adoptedPets.includes(pet.id)
    )
    .map((pet) => <PetItem key={pet.id} pet={pet} onAdopt={handleAdoptPet} />);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={setQuery}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setType("All")}
          style={styles.filterButton}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType("Cat")}
          style={styles.filterButton}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType("Dog")}
          style={styles.filterButton}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType("Rabbit")}
          style={styles.filterButton}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
