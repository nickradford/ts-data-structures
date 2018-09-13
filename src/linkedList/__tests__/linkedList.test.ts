import { LinkedList } from '../'
import { LinkedListNode } from '../node'

import {
  LinkedList as MLinkedList,
  LinkedListNode as MLinkedListNode
} from '../../ts-data-structures'

/** @ignore */
function getInstance<T>(elements?: Array<T>): LinkedList<T> {
  return new LinkedList(elements)
}

describe('LinkedList', () => {
  describe('module', () => {
    test('exports', () => {
      expect(MLinkedList).toBeDefined()
      expect(MLinkedListNode).toBeDefined()
      expect(MLinkedList).toBe(LinkedList)
      expect(MLinkedListNode).toBe(LinkedListNode)
    })
  })

  describe('constructor', () => {
    test('returns an empty list', () => {
      const instance = getInstance()

      expect(instance).toBeDefined()
      expect(instance).toBeInstanceOf(LinkedList)
      expect(instance.size).toEqual(0)
    })

    test('instantiates with values', () => {
      const instance = getInstance([1, 2, 3])

      expect(instance.size).toBe(3)
      expect(instance.firstNode).toBeDefined()
      expect((instance.firstNode as LinkedListNode<number>).value).toEqual(1)
    })
  })

  describe('.add', () => {
    test('adds an element to the end of the list', () => {
      const instance = getInstance([1])
      instance.add(2)
      const secondItem = (instance.firstNode as LinkedListNode<number>).next

      expect((secondItem as LinkedListNode<number>).value).toEqual(2)
      expect(instance.size).toEqual(2)
    })
  })

  describe('.find', () => {
    test('returns the object if found', () => {
      const instance = getInstance([1, 2, 3, 4])
      let found = instance.find(3) as LinkedListNode<number>

      if (found) {
        expect(found.value).toEqual(3)
        return
      } else {
        throw Error('Casting failed')
      }
    })

    test('returns false if not found', () => {
      const instance = getInstance([1, 2, 3, 4])
      let found = instance.find(30) as boolean

      if (found === false) {
        expect(found).toEqual(false)
        return
      } else {
        throw Error('Casting failed')
      }
    })

    test('finds with a predicate function', () => {
      const instance = getInstance([1, 2, 3, 4])
      let found = instance.find(n => n.value === 3) as LinkedListNode<number>

      if (found) {
        expect(found.value).toEqual(3)
      }
    })
  })

  describe('.forEach', () => {
    test('calls the callback once for each item', () => {
      const logValue = jest.fn()

      const instance = getInstance([1, 2, 3, 4, 5])
      instance.forEach(logValue)

      expect(logValue).toHaveBeenCalledTimes(5)
    })

    test('returning false breaks early', () => {
      const logValue = jest.fn().mockImplementation(() => false)

      const instance = getInstance([1, 2, 3, 4, 5])
      instance.forEach(logValue)

      expect(logValue).toHaveBeenCalledTimes(1)
    })
  })

  describe('.map', () => {
    test('calls the callback once on each item and returns an array with the return values', () => {
      const getSquare = jest
        .fn()
        .mockImplementation((n: LinkedListNode<number>) => n.value * n.value)
      const initialValues = [1, 2, 3, 4, 5]
      const instance = getInstance(initialValues)

      const result = instance.map(getSquare)
      expect(result).toEqual(initialValues.map(v => v * v))
      expect(getSquare).toHaveBeenCalledTimes(5)
    })
  })
})
