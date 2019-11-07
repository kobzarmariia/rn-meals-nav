import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import MealItem from './MealItem';

const MealList = ({ listData, navigation }) => {
	const favoriteMeals = useSelector(state => state.meals.favoriteMeals);

	const renderMealItem = itemData => {
		const isFavorite = favoriteMeals.some(meal => itemData.item.id === meal.id);
		return (
			<MealItem
				title={itemData.item.title}
				onSelectMeal={() => {
					navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							isFav: isFavorite,
						},
					});
				}}
				duration={itemData.item.duration}
				affordability={itemData.item.affordability}
				complexity={itemData.item.complexity}
				image={itemData.item.imageUrl}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				data={listData}
				keyExtractor={(item, index) => item.id}
				renderItem={renderMealItem}
				style={{ width: '100%' }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MealList;
