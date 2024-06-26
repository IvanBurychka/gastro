import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import DishCart from "./components/Dish.Cart";
import { HeaderComponent } from '../../_components/HeaderComponent';
import { useRecoilValue } from 'recoil';
import { dishesAtom } from '../../recoil/state/dishes.atom';
import { useDishActions } from '../../recoil/actions/dish.actions';
import { DishFilter } from '../../_components/DishFIlter';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const dishes = useRecoilValue(dishesAtom);
  const dishActions = useDishActions();
  const [showFilters, setShowFilters] = useState(false);
  const { search } = useLocation();

  useEffect(() => {
    dishActions.fetchDishes(search);
  }, [search]);

  function handleShowFilters () {
    setShowFilters(!showFilters);
  }

  return (
    <>
      <HeaderComponent />
      {
        showFilters ? <DishFilter handleClose={handleShowFilters}/> : null
      }
      <Container>
        <Button onClick={handleShowFilters}>Show filters</Button>
        <Stack gap={ 3 }>
          { dishes.map((dish) => <DishCart key={ dish.id } dish={ dish }/>) }
        </Stack>
      </Container>
    </>
  )
}