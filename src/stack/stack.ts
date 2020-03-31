class Stack<T> implements Iterable<T> {
  private stack: Array<T>

  constructor(_stack?: Array<T>) {
    if (_stack) {
      this.stack = _stack
    } else {
      this.stack = new Array<T>()
    }
  }

  static From<T>(values: Array<T>) {
    const stack = new Stack(values)
    return stack
  }

  get length(): number {
    return this.stack.length
  }

  push(item: T) {
    this.stack.push(item)
  }

  pop(): T {
    return this.stack.pop() as T
  }

  peek(): T | null {
    if (this.stack.length === 0) {
      return null
    }
    return this.stack[this.stack.length - 1]
  }

  contains(value: T): boolean {
    if (this.stack.includes(value)) {
      return true
    }
    return false
  }

  [Symbol.iterator](): Iterator<T, undefined> {
    let index = 0
    const self = this

    return {
      next() {
        if (index <= self.length) {
          return {
            value: self.stack[index++],
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}

export { Stack }
