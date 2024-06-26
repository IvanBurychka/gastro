import { Dish } from "../../../models/dish";
import { Card } from "react-bootstrap";

export default function DishCart({ dish }: { dish: Dish }) {
  return (
    <Card>
      <Card.Img variant="top" src={dish.imageUrl} style={{ width: '200px', position: 'relative', left: '50%', transform: 'translateX(-50%)'}} />
      <Card.Body>
        <Card.Title>{dish.title}</Card.Title>
        <Card.Text>
          {dish.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}