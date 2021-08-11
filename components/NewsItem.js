import React from "react";
import PropTypes from "prop-types";
import { Image, Text, View, StyleSheet } from "react-native";

export function NewsItem({ title, urlToImage }) {
	const { item, itemImg, itemTitle } = styles;

	return (
		<View style={item}>
			<Image source={{ uri: urlToImage }} style={itemImg} />
			<Text style={itemTitle}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: "#fff",
		margin: 6,
		padding: 15,
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		minHeight: 110,
	},
	itemImg: {
		width: "20%",
		borderRadius: 10,
	},
	itemTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 20,
		width: "70%",
	},
});

NewsItem.propTypes = {
	title: PropTypes.string,
	urlToImage: PropTypes.string,
	description: PropTypes.string,
};
