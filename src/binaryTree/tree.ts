import { BinaryTreeNode } from './node'

export class BinaryTree<T> {
  root: BinaryTreeNode<T> | null = null

  public add(value: T) {
    let node: BinaryTreeNode<T> | undefined

    // Coerce the input to be a BinaryTreeNode of the correct type.
    if (value) {
      node = new BinaryTreeNode(value)

      if (this.root === null) {
        this.root = node
      } else {
        this.root.add(node)
      }
    }
  }

  public count(): number {
    let accumulator = 0
    this.map(() => accumulator++)
    return accumulator
  }

  public map(fn: Function) {
    return this.root && this.root.map(fn)
  }

  public find(value: T): BinaryTreeNode<T> | null | undefined {
    if (this.root) {
      return this.root.find(value)
    }
  }

  public contains(value: T): boolean {
    if (this.find(value)) {
      return true
    }
    return false
  }

  public print() {
    this.root && this.root.print()
  }
}
