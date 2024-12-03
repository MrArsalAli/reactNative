import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, View, StyleSheet, Dimensions, Image } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;

export default function Bykea() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="menu" size={24} color="black" />
        <Text style={styles.headerTxt}>BYKEA</Text>
        <MaterialIcons name="call" size={24} color="black" />
      </View>

      {/* Banner Image View */}
      <View style={styles.bannerImgView}>
        <Image
          style={styles.bannerImg}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs7qTAyawynCNb2btqQTMtmrfiFiWlSBuaQg&s",
          }}
        />
      </View>

      {/* Info View */}
      <View style={styles.infoView}>
        <MaterialIcons name="attach-money" size={24} color="green" />
        <MaterialIcons name="message" size={24} color="green" />
      </View>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <Card title={"Carpool"} icon={"directions-car"} bgColor={"#ccc"} />
          <View style={styles.card}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
        </View>
      </View>
    </View>
  );
}

const Card = ({
  bgColor,
  icon,
  title,
}: {
  bgColor: string;
  icon: any;
  title: string;
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={{ textAlign: "right" }}>{title}</Text>
      <MaterialIcons name={icon} size={70} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTxt: {
    fontWeight: "bold",
    letterSpacing: 2,
    fontSize: 21,
  },
  header: {
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  bannerImgView: {
    height: SCREEN_HEIGHT / 3.5,
    backgroundColor: "#B0CABD",
    padding: 14,
  },
  bannerImg: {
    height: "90%",
    borderRadius: 12,
  },
  infoView: {
    height: 45,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: -20,
  },
  bottomContainer: {
    flex: 1,
    margin: 14,
    gap: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    justifyContent: "space-between",
  },
});
