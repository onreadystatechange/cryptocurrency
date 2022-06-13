import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type HeaderProps = {
  title: string;
  avatar: ImageSourcePropType;
};

export function Header(props: HeaderProps) {
  const { title, avatar } = props;

  return (
    <>
      <StatusBar style="auto" backgroundColor="#385775" />
      <View style={headerContainer}>
        <Text style={header}>{title}</Text>
        <Image source={avatar} style={image} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 130,
    paddingTop: 50,
    paddingBottom: 32,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "#385775",
  },
  header: {
    fontWeight: "700",
    fontSize: 20,
    color: "#FFFFFF",
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
});

const { headerContainer, header, image } = styles;
