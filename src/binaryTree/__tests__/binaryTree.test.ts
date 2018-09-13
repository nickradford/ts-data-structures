import { BinaryTree, BinaryTreeNode } from '../'
import { BinaryTree as MBinaryTree } from '../../ts-data-structures'

function getInstance<T>(): BinaryTree<T> {
  return new BinaryTree<T>()
}

describe('BinaryTree', () => {
  test('exports', () => {
    expect(MBinaryTree).toBeDefined()
    expect(MBinaryTree).toBe(BinaryTree)
  })
  test('instantiates', () => {
    const tree = getInstance()

    expect(tree.count()).toEqual(0)
  })

  describe('.add', () => {
    const tree = getInstance<number>()
    const value = 123
    tree.add(value)

    test('adds the value to the tree', () => {
      expect(tree.count()).toEqual(1)
      expect(tree.contains(value)).toEqual(true)
    })

    test('throws if the value exists in the tree already', () => {
      expect(() => {
        tree.add(value)
      }).toThrowError(
        `BinaryTreeNode<number>.add Error: Value(${value}) already exists in BinaryTree.`
      )
    })
  })

  describe('.contains', () => {
    const tree = getInstance<string>()
    const addedValue = 'xyz'
    const nonAddedValue = '123'

    tree.add(addedValue)

    test('returns true if the value is in the tree', () => {
      expect(tree.contains(addedValue)).toEqual(true)
    })

    test('returns false if the value is not in the tree', () => {
      expect(tree.contains(nonAddedValue)).toEqual(false)
    })
  })

  describe('.print', () => {
    test('should call print on the root node', () => {
      const tree = getInstance()
      tree.add(1)
      ;(tree.root as BinaryTreeNode<number>).print = jest.fn()

      tree.print()

      expect((tree.root as BinaryTreeNode<number>).print).toHaveBeenCalled()
    })
  })
})
