import { useRecoilValue } from 'recoil';
import {
  caloriesAtom,
  cookingMethodsAtom,
  cuisinesAtom,
  dietaryPreferencesAtom,
  seasonalitiesAtom,
  difficultiesAtom,
  mealTypesAtom, servingSizesAtom, costsAtom, allergiesAtom,
} from '../recoil/state/dish-options.atom';
import { useEffect, useState } from 'react';
import { useDishOptionActions } from '../recoil/actions/dish-options.actions';
import { Offcanvas, Accordion, Form, Button } from 'react-bootstrap';
import { ArrayedFilter, FilterInterface } from '../models/Dish-Query';
import { filterToUrl } from '../_utils/mappers';
import { useNavigate } from 'react-router-dom';

type FilterModalProps = {
  handleClose: () => void,
}

const defaultFilter: FilterInterface = {
  search: null,
  cuisines: [],
  preparationTime: null,
  rate: null,
  mealType: [],
  dietaryPreference: [],
  cookingMethod:  [],
  seasonality: [],
  allergies: [],
  difficulty: [],
  calorie: [],
  servingSize: [],
  cost: [],
  ingredients: [],
}

export const DishFilter = ({ handleClose }: FilterModalProps) => {
  const dishOptionActions = useDishOptionActions();
  const navigate = useNavigate();

  const cuisines = useRecoilValue(cuisinesAtom);
  const mealTypes = useRecoilValue(mealTypesAtom);
  const cookingMethods = useRecoilValue(cookingMethodsAtom);
  const dietaryPreferences = useRecoilValue(dietaryPreferencesAtom);
  const seasonalities = useRecoilValue(seasonalitiesAtom);
  const difficulties = useRecoilValue(difficultiesAtom);
  const calories = useRecoilValue(caloriesAtom);
  const servingSizes = useRecoilValue(servingSizesAtom);
  const costs = useRecoilValue(costsAtom);
  const allergies = useRecoilValue(allergiesAtom);

  const [filter, setFilter] = useState<FilterInterface>(defaultFilter)

  useEffect(() => {
    dishOptionActions.fetchCuisines();
    dishOptionActions.fetchMealTypes();
    dishOptionActions.fetchCookingMethods();
    dishOptionActions.fetchDietaryPreferences();
    dishOptionActions.fetchSeasonalities();
    dishOptionActions.fetchDifficulties();
    dishOptionActions.fetchCalories();
    dishOptionActions.fetchServingSizes();
    dishOptionActions.fetchCosts();
    dishOptionActions.fetchAllergies();
  }, []);

  function onHandleClose () {
    handleClose();
  }

  function onHandleFilter () {
    const query = filterToUrl(filter);
    handleClose();
    navigate({
      pathname: '/',
      search: query
    });
  }

  function onClearFilter () {
    setFilter(defaultFilter);
  }

  const onArrayValueSelected = (key: keyof ArrayedFilter, e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [key]: e.target.checked
        ? [...filter[key], Number(e.target.value)]
        : filter[key].filter((id) => id !== Number(e.target.value))
    });
  }

  // preparationTime
  // alergie

  return (
    <>
      <Offcanvas show={true} onHide={onHandleClose} placement='start'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button onClick={onHandleFilter}>Filter</Button>
          <Button onClick={onClearFilter}>Clear</Button>
          <Form itemScope={true}>
            <Form.Label htmlFor="search">Search:</Form.Label>
            <Form.Control
              type="search"
              id="search"
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              value={filter.search ?? ''}
            />
            <Form.Label htmlFor="rate">Rate: {filter.rate} stars</Form.Label>
            <Form.Control
              onChange={(e) => setFilter({ ...filter, rate: Number(e.target.value) })}
              type="range"
              id="rate"
              min={0}
              max={5}
              step={0.5}
              defaultValue={filter.rate ?? 0}
            />
            <Form.Label htmlFor="preparationTime">Preparation Time: {filter.preparationTime} min.</Form.Label>
            <Form.Control
              onChange={(e) => setFilter({ ...filter, preparationTime: Number(e.target.value) })}
              type="range"
              id="rate"
              min={0}
              max={360}
              step={5}
              defaultValue={filter.preparationTime ?? 0}
            />
          </Form>
          <br/>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Cuisines</Accordion.Header>
              <Accordion.Body>
                {/*<Form onChange={(e) => formChange('cuisines', e)}>*/}
                <Form key={'cuisines'}>
                  {
                    cuisines.map((cuisine) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`cuisine-${cuisine.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`cuisine-${cuisine.id.toString()}`}
                            value={cuisine.id}
                            checked={filter.cuisines.includes(cuisine.id)}
                            onChange={(e) => onArrayValueSelected('cuisines', e)}
                          />
                          <Form.Check.Label htmlFor={`cuisine-${cuisine.id.toString()}`}>{cuisine.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Meal Types</Accordion.Header>
              <Accordion.Body>
                <Form key={'mealType'} id={'mealType'}>
                  {
                    mealTypes.map((mealType) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`mealType-${mealType.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`mealType-${mealType.id.toString()}`}
                            value={mealType.id}
                            checked={filter.mealType.includes(mealType.id)}
                            onChange={(e) => onArrayValueSelected('mealType', e)}
                          />
                          <Form.Check.Label htmlFor={`mealType-${mealType.id.toString()}`}>{mealType.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Cooking Methods</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    cookingMethods.map((cookingMethod) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`cookingMethod-${cookingMethod.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`cookingMethod-${cookingMethod.id.toString()}`}
                            value={cookingMethod.id}
                            checked={filter.cookingMethod.includes(cookingMethod.id)}
                            onChange={(e) => onArrayValueSelected('cookingMethod', e)}
                          />
                          <Form.Check.Label htmlFor={`cookingMethod-${cookingMethod.id.toString()}`}>{cookingMethod.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Dietary Preferences</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    dietaryPreferences.map((dietaryPreference) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`dietaryPreference-${dietaryPreference.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`dietaryPreference-${dietaryPreference.id.toString()}`}
                            value={dietaryPreference.id}
                            checked={filter.dietaryPreference.includes(dietaryPreference.id)}
                            onChange={(e) => onArrayValueSelected('dietaryPreference', e)}
                          />
                          <Form.Check.Label htmlFor={`dietaryPreference-${dietaryPreference.id.toString()}`}>{dietaryPreference.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Seasonality</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    seasonalities.map((seasonality) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`seasonality-${seasonality.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`seasonality-${seasonality.id.toString()}`}
                            value={seasonality.id}
                            checked={filter.seasonality.includes(seasonality.id)}
                            onChange={(e) => onArrayValueSelected('seasonality', e)}
                          />
                          <Form.Check.Label htmlFor={`seasonality-${seasonality.id.toString()}`}>{seasonality.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Difficulty</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    difficulties.map((difficulty) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`difficulty-${difficulty.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`difficulty-${difficulty.id.toString()}`}
                            value={difficulty.id}
                            checked={filter.difficulty.includes(difficulty.id)}
                            onChange={(e) => onArrayValueSelected('difficulty', e)}
                          />
                          <Form.Check.Label htmlFor={`difficulty-${difficulty.id.toString()}`}>{difficulty.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Calories</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    calories.map((calory) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`calory-${calory.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`calory-${calory.id.toString()}`}
                            value={calory.id}
                            checked={filter.calorie.includes(calory.id)}
                            onChange={(e) => onArrayValueSelected('calorie', e)}
                          />
                          <Form.Check.Label htmlFor={`calory-${calory.id.toString()}`}>{calory.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>Serving Sizes</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    servingSizes.map((servingSize) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`servingSize-${servingSize.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`servingSize-${servingSize.id.toString()}`}
                            value={servingSize.id}
                            checked={filter.servingSize.includes(servingSize.id)}
                            onChange={(e) => onArrayValueSelected('servingSize', e)}
                          />
                          <Form.Check.Label htmlFor={`servingSize-${servingSize.id.toString()}`}>{servingSize.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>Cost</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    costs.map((cost) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`cost-${cost.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`cost-${cost.id.toString()}`}
                            value={cost.id}
                            checked={filter.cost.includes(cost.id)}
                            onChange={(e) => onArrayValueSelected('cost', e)}
                          />
                          <Form.Check.Label htmlFor={`cost-${cost.id.toString()}`}>{cost.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>Allergies</Accordion.Header>
              <Accordion.Body>
                <Form>
                  {
                    allergies.map((allergy) => {
                      return (
                        <Form.Check
                          type='checkbox'
                          key={`allergy-${allergy.id}`}
                        >
                          <Form.Check.Input
                            type='checkbox'
                            id={`allergy-${allergy.id.toString()}`}
                            value={allergy.id}
                            checked={filter.allergies.includes(allergy.id)}
                            onChange={(e) => onArrayValueSelected('allergies', e)}
                          />
                          <Form.Check.Label htmlFor={`allergy-${allergy.id.toString()}`}>{allergy.eng}</Form.Check.Label>
                        </Form.Check>
                      )
                    })
                  }
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}