import { Queue } from '../index'
import { Queue as MQueue } from '../../ts-data-structures'

/** @ignore */
function getInstance<T>(initialValue?: Array<T>): Queue<T> {
  if (initialValue) {
    return new Queue<T>(initialValue)
  }
  return new Queue<T>()
}

describe('Queue', () => {
  describe('module', () => {
    test('exports', () => {
      expect(MQueue).toBeDefined()
      expect(MQueue).toBe(Queue)
    })
  })

  describe('constructor', () => {
    test('default', () => {
      const instance = getInstance()
      expect(instance).toBeDefined()
      expect(instance).toBeInstanceOf(Queue)
    })

    test('with values', () => {
      const instance = getInstance([1, 2, 3])
      expect(instance.length()).toEqual(3)
    })
  })

  describe('.enqueue', () => {
    test('adds an item to the queue', () => {
      const instance = getInstance<number>()
      instance.enqueue(1)

      expect(instance.length()).toEqual(1)
    })

    test('adds items in the correct order', () => {
      const instance = getInstance<number>()

      instance.enqueue(1)
      instance.enqueue(2)
      instance.enqueue(3)

      const one = instance.dequeue()
      const two = instance.dequeue()
      const three = instance.dequeue()

      expect(one).toEqual(1)
      expect(two).toEqual(2)
      expect(three).toEqual(3)
    })
  })

  describe('.dequeue', () => {
    test('removes an item from the queue', () => {
      const instance = getInstance([1])
      const item = instance.dequeue()

      expect(instance.length()).toEqual(0)
      expect(item).toEqual(1)
    })

    test('removes items from the front', () => {
      const instance = getInstance<number>([1, 2, 3])

      const one = instance.dequeue()
      const two = instance.dequeue()
      const three = instance.dequeue()

      expect(one).toEqual(1)
      expect(two).toEqual(2)
      expect(three).toEqual(3)
      expect(instance.length()).toEqual(0)
    })
  })

  describe('.peek', () => {
    test('returns the first value without dequeuing it', () => {
      const instance = getInstance([1, 2, 3])
      const front = instance.peek()

      expect(front).toEqual(1)
      expect(instance.length()).toEqual(3)
    })
  })
})
