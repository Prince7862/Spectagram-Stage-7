
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
         <View style={this.state.light_theme 
         ? styles.container
         : styles.containerLight}>
             <View style={this.state.light_theme 
             ? styles.cardContainer
             : styles.cardContainerLight}>
                 <View style={styles.authorContainer}>
                     <View style={styles.authorImageContainer}>
                         <Image
                            source={require("../assets/profile_img.png")}
                            style={styles.profileImage}
                         ></Image>
                     </View>
                     <View style={styles.authorNameContainer}>
                         <Text style={this.state.light_theme 
                         ? styles.authorNameText
                         : styles.authorNameTextLight}>{this.props.post.author}</Text>

                     </View>
                     
                 </View>
                 <Image source={require("../assets/post.jpeg")} style={styles.postImage}/>
                 
                 <View style={styles.captionContainer}>
                     <Text style={this.state.light_theme 
                     ? styles.titleText
                     : styles.titleTextLight}>
                         {this.props.post.title}
                     </Text>
                 </View>

                 <View style={styles.captionContainer}>
                     <Text style={this.state.light_theme 
                     ? styles.captionText
                     : styles.captionTextLight}>
                         {this.props.post.caption}
                     </Text>
                 </View>
                 <View style={styles.actionContainer}>
                     <View style={styles.likeButton}>
                         <Ionicons name={"heart"} size={RFValue(30)} color={"white"}/>
                         <Text style={styles.likeText}>12k</Text>
                     </View>
                 </View>
             </View>
         </View>
      );
    }
}
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#fff",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "#2a2a2a",
    borderRadius: RFValue(20)
  },
  profileImage: {
    height: 0,
    width: 0
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  authorContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  authorNameText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "black",
    
  },
  authorNameTextLight: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
    
  },
  captionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "black",
    paddingTop: RFValue(20),
    
  },
  captionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white",
    paddingTop: RFValue(20)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  titleText: {
    fontSize: RFValue(15),
    color: "#000",
    paddingTop: RFValue(20),
    fontFamily: "Bubblegum-Sans"
  },
  titleTextLight: {
    fontSize: RFValue(15),
    color: "#fff",
    paddingTop: RFValue(20),
    fontFamily: "Bubblegum-Sans"
  }
});
