import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({ navigation }) => {
	const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

	if (favoriteMeals.length === 0 || !favoriteMeals) {
		return (
			<View style={styles.content}>
				<DefaultText>No favorite meals!</DefaultText>
			</View>
		);
	}

	return <MealList listData={favoriteMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Favorites',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName="ios-menu"
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FavoritesScreen;
