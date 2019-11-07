import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
			if (existingIndex >= 0) {
				return {
					...state,
					favoriteMeals: state.favoriteMeals.filter(meal => meal.id !== action.mealId),
				};
			} else {
				return {
					...state,
					favoriteMeals: [
						...state.favoriteMeals,
						state.meals.find(meal => meal.id === action.mealId),
					],
				};
			}
		case SET_FILTERS:
			const appliedFilters = action.filters;
			const filteredMeals = state.meals.filter(meal => {
				if (appliedFilters.glutenFree && !meal.isGlutenFree) {
					return false;
				}
				if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
					return false;
				}
				if (appliedFilters.vegetarian && !meal.isVegetarian) {
					return false;
				}
				if (appliedFilters.vegan && !meal.isVegan) {
					return false;
				}
				return true;
			});
			return { ...state, filteredMeals: filteredMeals };
		default:
			return state;
	}
};

export default mealsReducer;
