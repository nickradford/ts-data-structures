class Stack<T> {
  private stack: Array<T>

  constructor(_stack?: Array<T>) {
    if (_stack) {
      this.stack = _stack
    } else {
      this.stack = new Array<T>()
    }
  }

  public static From<T>(values: Array<T>) {
    const stack = new Stack(values)
    return stack
  }

  get length(): number {
    return this.stack.length
  }

  public push(item: T) {
    this.stack.push(item)
  }

  public pop(): T {
    return this.stack.pop() as T
  }

  public peek(): T | null {
    if (this.stack.length === 0) {
      return null
    }
    return this.stack[this.stack.length - 1]
  }

  public contains(value: T): boolean {
    if (this.stack.includes(value)) {
      return true
    }
    return false
  }
}

export { Stack }
