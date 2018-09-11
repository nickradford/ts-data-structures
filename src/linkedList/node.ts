class LinkedListNode<T> {
  next: LinkedListNode<T> | undefined
  value: T

  constructor(_value: T) {
    this.value = _value
  }
}

export { LinkedListNode }
