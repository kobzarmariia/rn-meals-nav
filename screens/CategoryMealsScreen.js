import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = ({ navigation }) => {
	const categoryId = navigation.getParam('categoryId');
	const availableMeals = useSelector(state => state.meals.filteredMeals);
	const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

	if (displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meals find!</DefaultText>
			</View>
		);
	}

	return <MealList listData={displayedMeals} navigation={navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
	const categoryId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find(category => category.id === categoryId);

	return {
		headerTitle: selectedCategory.title,
	};
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoryMealsScreen;
