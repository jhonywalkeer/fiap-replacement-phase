class Decimal {
  private value: number

  constructor(value: number | string) {
    this.value = typeof value === 'string' ? parseFloat(value) : value
  }

  toString(): string {
    return this.value.toFixed(2)
  }

  toNumber(): number {
    return this.value
  }
  add(other: Decimal): Decimal {
    return new Decimal(this.value + other.toNumber())
  }

  subtract(other: Decimal): Decimal {
    return new Decimal(this.value - other.toNumber())
  }

  multiply(other: Decimal): Decimal {
    return new Decimal(this.value * other.toNumber())
  }

  divide(other: Decimal): Decimal {
    return new Decimal(this.value / other.toNumber())
  }
}

export { Decimal }
