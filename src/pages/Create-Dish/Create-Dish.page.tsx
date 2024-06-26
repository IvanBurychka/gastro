import { HeaderComponent } from '../../_components/HeaderComponent';
import { DishCreate } from '../../models/Dish-Create';
import { Accordion, Button, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  allergiesAtom,
  caloriesAtom,
  cookingMethodsAtom,
  costsAtom,
  cuisinesAtom,
  dietaryPreferencesAtom,
  difficultiesAtom, mainIngrediantsAtom,
  mealTypesAtom,
  seasonalitiesAtom,
  servingSizesAtom,
} from '../../recoil/state/dish-options.atom';
import { useDishOptionActions } from '../../recoil/actions/dish-options.actions';
import { createUserDishes } from '../../api/dishes.api';

const emptyDish: DishCreate = {
  title: null,
  description: null,
  cuisineId: null,
  costId: null,
  dietaryPreferenceId: null,
  ingredientIds: [],
  allergyIds: [],
  calorieId: null,
  cookingMethodId: null,
  difficultyId: null,
  servingSizeId: null,
  preparationTime: null,
  seasonalityId: null,
  mealTypeId: null,
  file: null,
};

function getItemById<T extends { id: number }>(list: T[], id: number): T | undefined {
  return list.find((item) => item.id === id);
}

function getItemNamesByIds<T extends { id: number, eng: string }>(list: T[], ids: number[]): string[] {
  return list.filter((item) => ids.includes(item.id)).map((item) => item.eng);
}

export default function CreateDishPage() {
  const [createDish, setCreateDish] = useState<DishCreate>(emptyDish);
  const dishOptionsActions = useDishOptionActions();
  const cuisines = useRecoilValue(cuisinesAtom);
  const costs = useRecoilValue(costsAtom);
  const dietaryPreferences = useRecoilValue(dietaryPreferencesAtom);
  const calories = useRecoilValue(caloriesAtom);
  const cookingMethods = useRecoilValue(cookingMethodsAtom);
  const difficulties = useRecoilValue(difficultiesAtom);
  const servingSizes = useRecoilValue(servingSizesAtom);
  const seasonalities = useRecoilValue(seasonalitiesAtom);
  const mealTypes = useRecoilValue(mealTypesAtom);
  const allergies = useRecoilValue(allergiesAtom);
  const mainIngredients = useRecoilValue(mainIngrediantsAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dishOptionsActions.fetchCuisines();
    dishOptionsActions.fetchCosts();
    dishOptionsActions.fetchDietaryPreferences();
    dishOptionsActions.fetchCalories();
    dishOptionsActions.fetchCookingMethods();
    dishOptionsActions.fetchDifficulties();
    dishOptionsActions.fetchServingSizes();
    dishOptionsActions.fetchSeasonalities();
    dishOptionsActions.fetchMealTypes();
    dishOptionsActions.fetchAllergies();
    dishOptionsActions.fetchMainIngredients();
  }, []);

  async function storeDish() {
    await createUserDishes(10, createDish);
  }

  async function clearForm() {
    setCreateDish(emptyDish);
    if (fileInputRef?.current?.value) {
      fileInputRef.current.value = '';
    }
  }

  function handleTextChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCreateDish({ ...createDish, [name]: value });
  }

  function handleNumberChange (event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCreateDish({ ...createDish, [name]: +value });
  }

  function handleSingleSelect<T extends { id: number }>(key: keyof DishCreate, list: T[], event: React.ChangeEvent<HTMLSelectElement>) {
    if (!+event.target.value) {
      return;
    }
    setCreateDish({
      ...createDish,
      [key]: getItemById(list, +event.target.value)?.id ?? null,
    });
  }

  function handleMultiValueSelected (key: 'allergyIds' | 'ingredientIds', e: React.ChangeEvent<HTMLInputElement>) {
    setCreateDish({
      ...createDish,
      [key]: e.target.checked
        ? [...createDish[key], Number(e.target.value)]
        : createDish[key].filter((id) => id !== Number(e.target.value))
    });
  }

  const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCreateDish({ ...createDish, file: event.target.files[0]})
    }
  };

  return (
    <>
      <HeaderComponent />
      <div>Create New Dish</div>
      <Button onClick={storeDish}>create</Button>
      <Button onClick={clearForm}>clear form</Button>
      <Container>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={createDish.title ?? ''}
              name="title"
              onChange={handleTextChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Description"
              value={createDish.description ?? ''}
              name="description"
              onChange={handleTextChange}
            />
          </Form.Group>
          <Form.Group controlId="photo">
            <Form.Label>Photo:</Form.Label>
            <Form.Control
              type="file"
              placeholder="File"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Label>Preparation Time:</Form.Label>
            <InputGroup.Text>Preparation Time:</InputGroup.Text>
            <Form.Control
              aria-label="Preparation Time"
              type="number"
              name={"preparationTime"}
              value={createDish.preparationTime ?? ''}
              onChange={handleNumberChange}
            />
            <InputGroup.Text>minutes</InputGroup.Text>
          </InputGroup>
          <Row>
            <Form.Group controlId="cuisineId" className="col-md-4">
              <Form.Label>Cuisine: {createDish.cuisineId ? getItemById(cuisines, createDish.cuisineId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('cuisineId', cuisines, e)} name='cuisineId' value={createDish.cuisineId?.toString()}>
                {
                  [{ id: 0, eng: 'Select cuisine'}, ...cuisines].map((cuisine) => {
                    return (
                      <option key={cuisine.id} value={cuisine.id}>{cuisine.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="costId" className="col-md-4">
              <Form.Label>Cost: {createDish.costId ? getItemById(costs, createDish.costId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('costId', costs, e)} name='costId' value={createDish.costId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Cost Level'}, ...costs].map((cost) => {
                    return (
                      <option key={cost.id} value={cost.id}>{cost.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="dietaryPreferenceId" className="col-md-4">
              <Form.Label>Dietary Preference: {createDish.dietaryPreferenceId ? getItemById(dietaryPreferences, createDish.dietaryPreferenceId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('dietaryPreferenceId', dietaryPreferences, e)} name='dietaryPreferenceId' value={createDish.dietaryPreferenceId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Dietary Preference'}, ...dietaryPreferences].map((preference) => {
                    return (
                      <option key={preference.id} value={preference.id}>{preference.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="calorieId" className="col-md-4">
              <Form.Label>Calories: {createDish.calorieId ? getItemById(calories, createDish.calorieId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('calorieId', calories, e)} name='calorieId' value={createDish.calorieId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Calorie Level'}, ...calories].map((calorie) => {
                    return (
                      <option key={calorie.id} value={calorie.id}>{calorie.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="cookingMethodId" className="col-md-4">
              <Form.Label>Cooking methods: {createDish.cookingMethodId ? getItemById(cookingMethods, createDish.cookingMethodId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('cookingMethodId', cookingMethods, e)} name='cookingMethodId' value={createDish.cookingMethodId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Cooking Method'}, ...cookingMethods].map((method) => {
                    return (
                      <option key={method.id} value={method.id}>{method.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="difficaltyId" className="col-md-4">
              <Form.Label>Difficulty: {createDish.difficultyId ? getItemById(difficulties, createDish.difficultyId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('difficultyId', difficulties, e)} name='cookingMethodId' value={createDish.difficultyId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Difficulty'}, ...difficulties].map((difficulty) => {
                    return (
                      <option key={difficulty.id} value={difficulty.id}>{difficulty.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="servingSizeId" className="col-md-4">
              <Form.Label>Serving Size: {createDish.servingSizeId ? getItemById(servingSizes, createDish.servingSizeId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('servingSizeId', servingSizes, e)} name='servingSizeId' value={createDish.servingSizeId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Serving Size'}, ...servingSizes].map((size) => {
                    return (
                      <option key={size.id} value={size.id}>{size.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="seasonalityId" className="col-md-4">
              <Form.Label>Seasonality: {createDish.seasonalityId ? getItemById(seasonalities, createDish.seasonalityId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('seasonalityId', seasonalities, e)} name='seasonalityId' value={createDish.seasonalityId?.toString()}>
                {
                  [{ id: 0, eng: 'Seasonality'}, ...seasonalities].map((seasonality) => {
                    return (
                      <option key={seasonality.id} value={seasonality.id}>{seasonality.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="mealTypeId" className="col-md-4">
              <Form.Label>Meal Type: {createDish.mealTypeId ? getItemById(mealTypes, createDish.mealTypeId)!.eng : ''}</Form.Label>
              <Form.Select onChange={(e) => handleSingleSelect('mealTypeId', mealTypes, e)} name='mealTypeId' value={createDish.mealTypeId?.toString()}>
                {
                  [{ id: 0, eng: 'Select Meal Type'}, ...mealTypes].map((type) => {
                    return (
                      <option key={type.id} value={type.id}>{type.eng}</option>
                    )
                  })
                }
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Accordion className="col-md-6">
              <Accordion.Item eventKey="9">
                <Accordion.Header>Allergies: {getItemNamesByIds(allergies, createDish.allergyIds).join(', ')}</Accordion.Header>
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
                              checked={createDish.allergyIds.includes(allergy.id)}
                              onChange={(e) => handleMultiValueSelected('allergyIds', e)}
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
            <Accordion className="col-md-6">
              <Accordion.Item eventKey="9">
                <Accordion.Header>Main Ingreds: {getItemNamesByIds(mainIngredients, createDish.ingredientIds).join(', ')}</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    {
                      mainIngredients.map((ingredient) => {
                        return (
                          <Form.Check
                            type='checkbox'
                            key={`ingredient-${ingredient.id}`}
                          >
                            <Form.Check.Input
                              type='checkbox'
                              id={`ingredient-${ingredient.id.toString()}`}
                              value={ingredient.id}
                              checked={createDish.ingredientIds.includes(ingredient.id)}
                              onChange={(e) => handleMultiValueSelected('ingredientIds', e)}
                            />
                            <Form.Check.Label htmlFor={`ingredient-${ingredient.id.toString()}`}>{ingredient.eng}</Form.Check.Label>
                          </Form.Check>
                        )
                      })
                    }
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row>
            <div className="col-md-6">hello</div>
            <div className="col-md-6">hello</div>
          </Row>
        </Form>
      </Container>
    </>
  )
}