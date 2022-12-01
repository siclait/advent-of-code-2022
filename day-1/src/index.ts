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

export function nLargest<T>(items: T[], comparator: (a: T, b: T) => number, n: number): T[] {
  const elements = [...items].sort(comparator)
  const result = []
  for (let i = 0; i < n; i++) {
    if (i >= elements.length) break
    result.push(elements[i])
  }
  return result
}

function nLargestInventories(inventories: Inventory[], n: number): Inventory[] {
  return nLargest(inventories, (a, b) => b.totalCalories - a.totalCalories, n)
}

export function mostCalories(inventories: Inventory[]): number {
  return sum(...nLargestInventories(inventories, 1).map((inventory) => inventory.totalCalories))
}

export function totalTopThreeCalories(inventories: Inventory[]): number {
  return sum(...nLargestInventories(inventories, 3).map((inventory) => inventory.totalCalories))
}

function sum(...values: number[]): number {
  return values.reduce((total, x) => total + x)
}
