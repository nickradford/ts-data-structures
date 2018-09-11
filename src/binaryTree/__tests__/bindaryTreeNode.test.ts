import { BinaryTreeNode } from '../node'

/** @ignore */
function getInstance<T>(val: T): BinaryTreeNode<T> {
  return new BinaryTreeNode(val)
}

describe('BinaryTreeNode', () => {
  describe('constructor', () => {
    test('create the node', () => {
      const node = getInstance(1)

      expect(node).toBeDefined()
      expect(node.value).toEqual(1)
    })
  })

  describe('.add', () => {
    test('adds a value to the left', () => {
      const node = getInstance(10)
      node.add(getInstance(5))

      expect(node.left).toBeDefined()
      expect(node.left.value).toEqual(5)
    })

    test('recursively adds down the left', () => {
      const node = getInstance(10)
      node.add(getInstance(5))
      node.add(getInstance(2))

      expect(node.left.left).toBeDefined()
      expect(node.left.left.value).toEqual(2)
    })

    test('adds a value to the right', () => {
      const node = getInstance(10)
      node.add(getInstance(15))

      expect(node.right).toBeDefined()
      expect(node.right.value).toEqual(15)
    })

    test('recursively adds down the right', () => {
      const node = getInstance(10)
      node.add(getInstance(15))
      node.add(getInstance(22))

      expect(node.right.right).toBeDefined()
      expect(node.right.right.value).toEqual(22)
    })

    test('throws if you add the same value to a node', () => {
      const node = getInstance(10)
      expect(() => {
        node.add(getInstance(10))
      }).toThrow()
    })
  })

  describe('.find', () => {
    let node
    beforeEach(() => {
      node = getInstance(10)
      node.add(getInstance(5))
      node.add(getInstance(15))
      node.left.find = jest.fn()
      node.right.find = jest.fn()
    })

    test('call recursively down the left', () => {
      node.find(1)
      node.find(20)

      expect(node.left.find).toHaveBeenCalledWith(1)
      expect(node.right.find).toHaveBeenCalledWith(20)
    })
  })

  describe('.map', () => {
    test('should call map recursively', () => {
      const node = getInstance(2)
      node.add(getInstance(1))
      node.add(getInstance(3))

      node.left.map = jest.fn()
      node.right.map = jest.fn()

      node.map(() => {})

      expect(node.left.map).toHaveBeenCalled()
      expect(node.right.map).toHaveBeenCalled()
    })
  })

  describe('.print', () => {
    let spy: {
      [key: string]: any
    } = {}

    beforeEach(() => {
      spy.console = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      spy.console.mockRestore()
    })

    test('call print recursively', () => {
      const node = getInstance(2)
      node.add(getInstance(1))
      node.add(getInstance(3))

      node.print()

      expect(spy.console).toHaveBeenCalledTimes(3)
    })
  })
})
