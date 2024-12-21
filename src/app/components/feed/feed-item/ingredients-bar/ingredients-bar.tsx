import { useMemo } from 'react';
import style from './ingredients-bar.module.scss';
import { useGetIngredientsQuery } from '../../../../services/app-api';
import { fromArrayToObject } from '../../../../services/utils';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IIngredientsBar {
	ingredients: string[];
	cost: number;
	maxShow?: number;
}
export default function IngredientsBar({
	ingredients,
	cost,
	maxShow = 4,
}: IIngredientsBar) {
	const { data } = useGetIngredientsQuery();
	const ingredientsFromEntries = useMemo(
		() => fromArrayToObject(data?.data),
		[data]
	);

	const leftIngredients =
		ingredients.length - (maxShow + 1) > 0
			? ingredients.length - (maxShow + 1)
			: 0;
	return (
		<div className={style.container}>
			<div className={`${style.ingredients_bar} mr-6`}>
				{ingredients.length !== 0 &&
					ingredients.map((id, index) => {
						if (index > maxShow) return;
						return (
							<img
								key={ingredientsFromEntries[id]._id + index}
								src={ingredientsFromEntries[id].image_mobile}
								alt={ingredientsFromEntries[id].name}
								style={{
									transform: `translate(${49 * index}px)`,
									zIndex: 500 - index,
								}}
							/>
						);
					})}
				<div className={style.last_ingredient}>
					<span
						className={style.left_ingredients}
						style={{
							transform: `translate(${49 * (maxShow + 1)}px)`,
						}}>
						{leftIngredients > 0 ? `+${leftIngredients}` : null}
					</span>
					{leftIngredients > 0 && (
						<img
							style={{
								transform: `translate(${49 * (maxShow + 1)}px)`,
								zIndex: 500 - (maxShow + 1),
								opacity: '0.6',
							}}
							src={
								ingredientsFromEntries[
									ingredients[ingredients.length - maxShow]
								] &&
								ingredientsFromEntries[
									ingredients[ingredients.length - maxShow]
								].image_mobile
							}
							alt={
								ingredientsFromEntries[
									ingredients[ingredients.length - maxShow]
								] &&
								ingredientsFromEntries[
									ingredients[ingredients.length - maxShow]
								].name
							}
						/>
					)}
				</div>
			</div>
			<span>
				{cost}
				<CurrencyIcon type='primary' className='ml-2' />
			</span>
		</div>
	);
}
