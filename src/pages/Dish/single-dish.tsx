import { Dish } from '../../models/dish';
import { Image, Card, ListGroup } from 'react-bootstrap';

interface SingleDishProps {
  dish: Dish;
}

export function SingleDishComponent({ dish }: SingleDishProps) {
  return (
    <>
      <Card>
        <Card.Img src={dish.imageUrl} style={{ width: "500px", height: "300px", objectFit: "cover" }}/>
        <Card.Body>
          <Card.Title>{dish.title}</Card.Title>
          <Card.Subtitle  className="mb-3">{dish.description}</Card.Subtitle>
          <Card.Subtitle className="pb-5">Author: `{dish.author.firstName} {dish.author.lastName}`</Card.Subtitle>
          <Card.Text className="mb-2">Rate: {dish.rate} / 5.0</Card.Text>
          <Card.Text className="mb-2">Preparation Time: {dish.preparationTime} min.</Card.Text>
          <Card.Text className="mb-2">Calories level: {dish.calorie?.eng}</Card.Text>
          <Card.Text className="mb-2">Cooking Method: {dish.cookingMethod?.eng}</Card.Text>
          <Card.Text className="mb-2">Cost: {dish.cost?.eng}</Card.Text>
          <Card.Text className="mb-2">Cuisine: {dish.cuisine?.eng}</Card.Text>
          <Card.Text className="mb-2">Dietary Preference: {dish.dietaryPreference?.eng}</Card.Text>
          <Card.Text className="mb-2">Difficulty: {dish.difficulty?.eng}</Card.Text>
          <Card.Text className="mb-2">Meal Type: {dish.mealType?.eng}</Card.Text>
          <Card.Text className="mb-2">Seasonality: {dish.seasonality?.eng}</Card.Text>
          <Card.Text className="mb-2">ServingSizes: {dish.servingSize?.eng}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Subtitle className="mb-2">Ingredients:</Card.Subtitle>
          {dish.ingredients.map((ing, index) =>
            <Card.Text key={`${ing.dishId}${ing.ingredient.id}`}>
              {index+1}) {ing.ingredient.eng} - {ing.amount} {ing.unit}.
            </Card.Text>
          )}
        </Card.Body>
        <Card.Body>
          <Card.Subtitle className="mb-2">Steps to prepare:</Card.Subtitle>
          {dish.steps.map((step) =>
            <Card.Text key={step.step}>
              {step.step}: {step.instruction}
            </Card.Text>
          )}
          {/*<Card.Text>{ JSON.stringify(dish.steps) }</Card.Text>*/}
        </Card.Body>
        <Card.Footer>
          <Card.Text>Footer</Card.Text>
        </Card.Footer>
      </Card>
    </>

  );
}