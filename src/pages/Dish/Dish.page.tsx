import { useParams } from 'react-router-dom';
import { HeaderComponent } from '../../_components/HeaderComponent';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap'
import { useDishActions } from '../../recoil/actions/dish.actions';
import { useRecoilValueLoadable } from 'recoil';
import { dishAtom } from '../../recoil/state/dish.atom';
import { SingleDishComponent } from './single-dish';

export function DishPage() {
  const { dishId } = useParams();
  const dishActions = useDishActions();
  const dish = useRecoilValueLoadable(dishAtom);

  useEffect(() => {
    dishActions.fetchDish(+dishId!)
  }, []);

  switch (dish.state) {
    case 'loading':
      return <> Loading... </>;
    case 'hasError':
      return <> Error </>;
    case 'hasValue':
      return <>
        <HeaderComponent/>
        <Container>
          {
            dish.contents ? <SingleDishComponent dish={dish.contents!}></SingleDishComponent> : <>Loading....</>
          }
        </Container>
      </>;
  }
}