import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NewsList, NewsPage } from "./screens";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name={"NewsList"} component={NewsList} options={{ title: "NEWS APP" }} />

				<Stack.Screen name={"NewsPage"} component={NewsPage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
