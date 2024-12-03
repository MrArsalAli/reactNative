import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { FlatList, Image, View, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import * as Crypto from "expo-crypto";

const imagesArr = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1680985551022-ad298e8a5f82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW9iaWxlfGVufDB8fDB8fHww",
  "https://plus.unsplash.com/premium_photo-1664201890729-a9653a3592cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1529653762956-b0a27278529c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlfGVufDB8fDB8fHww",
];

export default function index() {
  const [images, setImages] = useState(imagesArr);

  const uploadImageToCloudinary = async (obj: any) => {
    const cloudName = "dl4kqxuyk";
    const apiKey = "583277238221135";
    const apiSecret = "Mtnn7RAmrG_KTAuzq3dT55YqKGQ";

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(timestamp, apiSecret);

    const formData = new FormData();
    console.log("obj=>", obj);

    formData.append("file", {
      uri: obj.uri,
      name: obj.fileName,
      type: obj.mimetype,
    });

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", await signature);

    console.log("formData=>", formData);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("data=>", data.secure_url);
      return data.secure_url;
    } else {
      console.log("error=>", data.error.message);
      return data.error.message;
    }
  };

  async function generateSignature(timestamp: any, apiSecret: any) {
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      signatureString
    );
    return await digest;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const link = await uploadImageToCloudinary(result.assets[0]);
      //   setImage(result.assets[0].uri);
      setImages([link, ...images]);
    }
  };

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const link = await uploadImageToCloudinary(result.assets[0]);
        //   setImage(result.assets[0].uri);
        setImages([link, ...images]);
      }
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.iconView}>
        <Entypo
          style={{
            padding: 10,
            borderRadius: 125,
            backgroundColor: "#ccc",
          }}
          onPress={pickImage}
          name="images"
          size={24}
          color="black"
        />
        <Entypo
          onPress={pickImageFromCamera}
          style={styles.icon}
          name="camera"
          size={24}
          color="black"
        />
      </ThemedView>

      <FlatList
        data={images}
        keyExtractor={(data) => data}
        renderItem={({ item, index }) => {
          return <Image source={{ uri: item }} style={styles.img} />;
        }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  iconView: {
    padding: 16,
    position: "absolute",
    zIndex: 12,
    backgroundColor: "transparent",
    right: -10,
    gap: 10,
  },
  icon: {
    padding: 10,
    borderRadius: 125,
    backgroundColor: "#ccc",
  },
  img: { height: 200, aspectRatio: 4 / 2, marginVertical: 10 },
});
