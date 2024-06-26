import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { ownDishesSelector } from '../../recoil/state/own-dishes.atom';
import React from 'react';
import { HeaderComponent } from '../../_components/HeaderComponent';
import { Card, Button, Container, Row } from 'react-bootstrap';
import './user-dishes.css';
import { useNavigate } from 'react-router-dom';
import { userAtom } from '../../recoil/state/user.atom';

export function UserDishesPage() {
  const authValue = useRecoilValue(userAtom);
  const dishes = useRecoilValueLoadable(ownDishesSelector)
  const navigate = useNavigate();

  function navigateToCreateDish() {
    navigate(`/user/${authValue?.id}/dishes/create`)
  }

  return (
    <>
      <HeaderComponent />
      {
        dishes.state === 'hasValue' && dishes.contents
          ?
          <Container>
            <Button onClick={navigateToCreateDish}>Create New Dish</Button>
            <br/>
            {dishes.contents.map((dish, i) => (
              <Row key={dish.id}>
                <Card style={{ width: '36rem' }} key={dish.id}>
                  <Card.Img variant="top" src={dish.imageUrl} className='user-dish-image'/>
                  <Card.Body>
                    <Card.Title>{dish.title}</Card.Title>
                    <Card.Text>
                      {dish.description}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Row>
            ))}
          </Container>

          : <div>Loading...</div>
      }
    </>
  )
}
