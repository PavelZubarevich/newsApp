import React from "react";
import { Image, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export function NewsPage({ route, navigation }) {
	return (
		<ScrollView style={style.main} contentContainerStyle={style.view}>
			<Image source={{ uri: route.params.urlToImage }} style={style.image} />
			<Text style={style.title}>{route.params.title}</Text>
			<Text style={style.text}>{route.params.content}</Text>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Text style={style.btn}>TO NEWS LIST</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const style = StyleSheet.create({
	main: {
		padding: 15,
	},
	view: {
		alignItems: "center",
	},
	image: {
		width: "90%",
		height: 200,
		borderRadius: 15,
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		marginBottom: 35,
	},
	btn: {
		backgroundColor: "#fff",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 15,
		fontWeight: "bold",
	},
});
