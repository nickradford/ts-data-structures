import { Stack } from '../'
import { Stack as MStack } from '../../ts-data-structures'

/** @ignore */
function getInstance<T>(initialValue?: Array<T>): Stack<T> {
  if (initialValue) {
    return new Stack<T>(initialValue)
  }
  return new Stack<T>()
}

describe('Stack', () => {
  describe('module', () => {
    test('exports', () => {
      expect(MStack).toBeDefined()
      expect(MStack).toBe(Stack)
    })
  })

  describe('constructor', () => {
    test('default', () => {
      const instance = getInstance()
      expect(instance).toBeDefined()
      expect(instance).toBeInstanceOf(Stack)
    })

    test('with values', () => {
      const instance = getInstance([1, 2, 3])
      expect(instance.length).toEqual(3)
    })
  })

  describe('.push', () => {
    test('adds an item to the queue', () => {
      const instance = getInstance<number>()
      instance.push(1)

      expect(instance.length).toEqual(1)
    })

    test('adds items in the correct order', () => {
      const instance = getInstance<number>()

      instance.push(1)
      instance.push(2)
      instance.push(3)

      const three = instance.pop()
      const two = instance.pop()
      const one = instance.pop()

      expect(one).toEqual(1)
      expect(two).toEqual(2)
      expect(three).toEqual(3)
    })
  })

  describe('.pop', () => {
    test('removes an item from the queue', () => {
      const instance = getInstance([1])
      const item = instance.pop()

      expect(instance.length).toEqual(0)
      expect(item).toEqual(1)
    })

    test('removes items from the end', () => {
      const instance = getInstance<number>([1, 2, 3])

      const three = instance.pop()
      const two = instance.pop()
      const one = instance.pop()

      expect(one).toEqual(1)
      expect(two).toEqual(2)
      expect(three).toEqual(3)
      expect(instance.length).toEqual(0)
    })
  })

  describe('.peek', () => {
    test('returns the first value without dequeuing it', () => {
      const instance = getInstance([1, 2, 3])
      const last = instance.peek()

      expect(last).toEqual(3)
      expect(instance.length).toEqual(3)
    })

    test('empty stack returns null', () => {
      const instance = getInstance()

      expect(instance.peek()).toEqual(null)
    })
  })

  describe('.contains', () => {
    test('returns true when the stack contains the item', () => {
      const instance = getInstance([1, 2, 3])
      expect(instance.contains(1)).toEqual(true)
    })

    test("returns false when the stack doesn't contain the item", () => {
      const instance = getInstance(['a', 'b', 'c'])
      expect(instance.contains('x')).toEqual(false)
    })
  })

  describe('[Symbol.iterator]', () => {
    test('can iterate over the stack', () => {
      const instance = getInstance([1, 2, 3])
      let accumulator = 0

      for (const value of instance) {
        accumulator += value || 0
      }

      expect(accumulator).toEqual(6)
    })
  })

  describe('static methods', () => {
    describe('.From', () => {
      test('has a static From method', () => {
        expect(Stack.From).toBeDefined()
      })

      test('creates a stack from the provided values', () => {
        const instance = Stack.From([1, 2, 3])

        expect(instance.length).toEqual(3)
      })
    })
  })
})
