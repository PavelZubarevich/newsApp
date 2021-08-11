import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, TextInput, StyleSheet } from "react-native";

export function Header({ fetchData }) {
	let [search, setSearch] = useState("");
	const searchHandler = (text) => {
		setSearch(text);
	};

	const { input, header } = style;
	return (
		<View style={header}>
			<TextInput
				style={input}
				placeholder="Search news"
				onChangeText={searchHandler}
				defaultValue={search}
				onSubmitEditing={() => {
					fetchData(search);
					setSearch("");
				}}
			/>
		</View>
	);
}

const style = StyleSheet.create({
	input: {
		fontSize: 18,
		padding: 10,
		backgroundColor: "#fff",
		borderRadius: 20,
	},
	header: {
		paddingHorizontal: 6,
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomColor: "#fff",
		borderBottomWidth: 2,
	},
});

Header.propTypes = {
	searchHandler: PropTypes.func,
};
