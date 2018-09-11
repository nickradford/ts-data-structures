import { LinkedListNode } from './node'

type PredicateFunction = (node: LinkedListNode<any>) => boolean
type MapFunction = (node: LinkedListNode<any>) => any

class LinkedList<T> {
  private _size: number = 0
  get size(): number {
    return this._size
  }

  private _firstNode: LinkedListNode<T> | undefined
  get firstNode(): LinkedListNode<T> | undefined {
    return this._firstNode
  }

  private _lastNode: LinkedListNode<T> | undefined

  constructor(elements?: Array<T>) {
    if (elements) {
      elements.forEach(el => this.add(el))
    }
  }

  public add(element: T) {
    const node = new LinkedListNode(element)
    if (!this._firstNode) {
      this._firstNode = node
      this._lastNode = node
    } else {
      if (this._lastNode) {
        this._lastNode.next = node
      }
      this._lastNode = node
    }
    this._size += 1
  }

  public find(
    valueOrPredicateFn: T | PredicateFunction
  ): LinkedListNode<T> | boolean {
    let value: T
    let fn: PredicateFunction | undefined

    /* istanbul ignore else */
    if (typeof valueOrPredicateFn == 'function') {
      fn = valueOrPredicateFn
    } else if ((value = <T>valueOrPredicateFn)) {
      fn = (n: LinkedListNode<T>) => n.value == value
    } else {
      throw Error(`LinkedList.find - invalid parameter (${valueOrPredicateFn})`)
    }

    fn = fn as PredicateFunction

    let node = this.firstNode

    while (node) {
      if (fn(node)) {
        return node
      } else {
        node = node.next
      }
    }
    return false
  }
  /** Iterate over each node and perform a function
   * @param {Function} fn - The function to perform, optionally return false to break early.
   */
  public forEach(fn: Function) {
    let node = this.firstNode
    while (node) {
      if (fn(node) == false) {
        return
      }
      node = node.next
    }
  }
  /** Map over the LinkedList and perform a function
   * @param {MapFunction} fn - The function to perform on each item.
   * @returns {Array} The values returned from the MapFunction
   */
  public map(fn: MapFunction): Array<any> {
    let node = this.firstNode
    let accumulator = []
    while (node) {
      accumulator.push(fn(node))
      node = node.next
    }

    return accumulator
  }
}

export { LinkedList }
