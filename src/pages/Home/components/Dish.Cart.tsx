import { Dish } from "../../../models/dish";
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';

export default function DishCart({ dish }: { dish: Dish }) {
  console.log(dish);
  return (
    <Card>
      <Row>
        <Col md={3}>
          <Card.Img variant="top" src={dish.imageUrl} style={{ width: '200px', position: 'relative', left: '50%', transform: 'translateX(-50%)'}} />
        </Col>
        <Col md={9} className="d-flex flex-column justify-content-around" >
          <Row>
            <Card.Title>{dish.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{dish.description}</Card.Subtitle>
            <Row>
              <Col md={3}>
                <Card.Text className="mb-2">Preparation Time: {dish.preparationTime} min.</Card.Text>
              </Col>
              <Col md={3}>
                <Card.Text className="mb-2">Rate: {dish.rate} / 5.0</Card.Text>
              </Col>
            </Row>
          </Row>
          <Row>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>Calories level: {dish.calorie?.eng}</ListGroup.Item>
                <ListGroup.Item>Cooking Method: {dish.cookingMethod?.eng}</ListGroup.Item>
                <ListGroup.Item>Cost: {dish.cost?.eng}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>Cuisine: {dish.cuisine?.eng}</ListGroup.Item>
                <ListGroup.Item>Dietary Preference: {dish.dietaryPreference?.eng}</ListGroup.Item>
                <ListGroup.Item>Difficulty: {dish.difficulty?.eng}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>Meal Type: {dish.mealType?.eng}</ListGroup.Item>
                <ListGroup.Item>Seasonality: {dish.seasonality?.eng}</ListGroup.Item>
                <ListGroup.Item>ServingSizes: {dish.servingSize?.eng}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row >
            <Col className="d-flex justify-content-between">
              <Card.Text>Author: `{dish.author.firstName} {dish.author.lastName}`</Card.Text>
              <Button className="mx-4">See more...</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}