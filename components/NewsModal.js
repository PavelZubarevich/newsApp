import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Modal } from "react-native";

export function NewsModal({ visible, children }) {
	return (
		<>
			<Modal visible={visible} animationType="fade" transparent>
				<View style={style.modalBackground}>{children}</View>
			</Modal>
		</>
	);
}

const style = StyleSheet.create({
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		alignItems: "center",
		justifyContent: "center",
	},
});

NewsModal.propTypes = {
	visible: PropTypes.bool,
	children: PropTypes.element,
};
