import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/constants/interface";
import { fetchProducts } from "@/store/features/productsSlice";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Flatlist() {
  const { products, status } = useSelector(
    (state: RootState) => state.products
  );
  console.log("products==>", products);
  console.log("status==>", status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (status == "pending") {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ alignSelf: "center", marginVertical: 20 }}
      />
    );
  }
  return (
    <View>
      <ThemedText type="title">Flatlist</ThemedText>
      <FlatList
        data={products}
        keyExtractor={(data: Product) => `${data.id}`}
        numColumns={2}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ marginHorizontal: 10 }}
        renderItem={({ item, index }: { item: Product; index: number }) => {
          return (
            <View
              key={index}
              style={{
                flex: 1,
                borderColor: "#ccc",
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 200, resizeMode: "cover" }}
              />
              <View style={{ padding: 10, gap: 2 }}>
                <ThemedText type="subtitle" numberOfLines={1}>
                  {item.title}
                </ThemedText>
                <ThemedText type="default" numberOfLines={2}>
                  {item.description}
                </ThemedText>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
