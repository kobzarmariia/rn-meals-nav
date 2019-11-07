import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOption = {
	mode: 'modal',
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Colors.primaryColor,
		},
		headerTitleStyle: {
			fontFamily: 'open-sans-bold',
		},
		headerBackTitleStyle: {
			fontFamily: 'open-sans',
		},
		headerTintColor: 'white',
	},
};

const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoryMeals: CategoryMealsScreen,
		MealDetail: MealDetailScreen,
	},
	defaultStackNavOption
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	defaultStackNavOption
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />,
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans' }}>Meals!</Text>
				) : (
					'Meals'
				),
		},
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: 'Favorites!',
			tabBarIcon: tabInfo => <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />,
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans' }}>Favorites!</Text>
				) : (
					'Favorites! '
				),
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: 'open-sans',
					},
					activeTintColor: Colors.accentColor,
				},
		  });

const FilterNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	defaultStackNavOption
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: FilterNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		},
	}
);

export default createAppContainer(MainNavigator);
