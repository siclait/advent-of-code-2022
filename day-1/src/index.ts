class Inventory {
  meals: Meal[] = []

  addMeal(calories: number) {
    this.meals.push(new Meal(calories))
  }

  get totalCalories(): number {
    return this.meals.reduce((total, meal) => total + meal.calories, 0)
  }
}

class Meal {
  constructor(readonly calories: number) {}
}

export function parseInput(input: string): Inventory[] {
  const inventories: Inventory[] = []
  let inventory = new Inventory()
  for (const value of input.split("\n")) {
    if (value === "") {
      inventories.push(inventory)
      inventory = new Inventory()
      continue
    }
    inventory.addMeal(parseInt(value))
  }
  return inventories
}

export function mostCalories(inventories: Inventory[]): number {
  return Math.max(...inventories.map((inventory) => inventory.totalCalories))
}
