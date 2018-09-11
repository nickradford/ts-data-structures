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
      expect((node.left as BinaryTreeNode<number>).value).toEqual(5)
    })

    test('recursively adds down the left', () => {
      const node = getInstance(10)
      node.add(getInstance(5))
      node.add(getInstance(2))

      const leftNode = node.left as BinaryTreeNode<number>

      expect(leftNode.left).toBeDefined()
      expect((leftNode.left as BinaryTreeNode<number>).value).toEqual(2)
    })

    test('adds a value to the right', () => {
      const node = getInstance(10)
      node.add(getInstance(15))

      const rightNode = node.right as BinaryTreeNode<number>

      expect(rightNode).toBeDefined()
      expect(rightNode.value).toEqual(15)
    })

    test('recursively adds down the right', () => {
      const node = getInstance(10)
      node.add(getInstance(15))
      node.add(getInstance(22))

      const rightNode = node.right as BinaryTreeNode<number>
      const rightRightNode = rightNode.right as BinaryTreeNode<number>

      expect(rightNode).toBeDefined()
      expect(rightRightNode.value).toEqual(22)
    })

    test('throws if you add the same value to a node', () => {
      const node = getInstance(10)
      expect(() => {
        node.add(getInstance(10))
      }).toThrow()
    })
  })

  describe('.find', () => {
    let node: BinaryTreeNode<any>
    let leftNode: BinaryTreeNode<any>
    let rightNode: BinaryTreeNode<any>

    beforeEach(() => {
      node = getInstance(10)
      node.add(getInstance(5))
      node.add(getInstance(15))
      leftNode = node.left as BinaryTreeNode<number>
      rightNode = node.right as BinaryTreeNode<number>

      leftNode.find = jest.fn()
      rightNode.find = jest.fn()
    })

    test('call recursively down the left', () => {
      node.find(1)
      node.find(20)

      expect(leftNode.find).toHaveBeenCalledWith(1)
      expect(rightNode.find).toHaveBeenCalledWith(20)
    })
  })

  describe('.map', () => {
    test('should call map recursively', () => {
      const node = getInstance(2)
      node.add(getInstance(1))
      node.add(getInstance(3))
      const leftNode = node.left as BinaryTreeNode<number>
      const rightNode = node.right as BinaryTreeNode<number>

      leftNode.map = jest.fn()
      rightNode.map = jest.fn()

      node.map(() => undefined)

      expect(leftNode.map).toHaveBeenCalled()
      expect(rightNode.map).toHaveBeenCalled()
    })
  })

  describe('.print', () => {
    let spy: {
      [key: string]: any
    } = {}

    beforeEach(() => {
      spy.console = jest
        .spyOn(console, 'log')
        .mockImplementation(() => undefined)
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
