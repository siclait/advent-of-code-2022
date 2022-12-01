class Inventory {
  meals: Meal[] = []

  addMeal(calories: number) {
    this.meals.push({ calories })
  }

  get totalCalories(): number {
    return sum(...this.meals.map((meal) => meal.calories))
  }
}

interface Meal {
  readonly calories: number
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

function nLargest(inventories: Inventory[], n: number): Inventory[] {
  const elements = inventories.sort((a, b) => b.totalCalories - a.totalCalories)
  const result = []
  for (let i = 0; i < n; i++) {
    if (i >= elements.length) break
    result.push(elements[i])
  }
  return result
}

export function mostCalories(inventories: Inventory[]): number {
  return sum(...nLargest(inventories, 1).map((inventory) => inventory.totalCalories))
}

export function totalTopThreeCalories(inventories: Inventory[]): number {
  return sum(...nLargest(inventories, 3).map((inventory) => inventory.totalCalories))
}

function sum(...values: number[]): number {
  return values.reduce((total, x) => total + x)
}
