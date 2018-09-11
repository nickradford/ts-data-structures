export class BinaryTreeNode<T> {
  left: BinaryTreeNode<T> | undefined
  right: BinaryTreeNode<T> | undefined
  value: T
  private type: String

  constructor(val: T) {
    this.value = val
    this.type = typeof val
  }

  public add(node: BinaryTreeNode<T>): boolean {
    if (node.value < this.value) {
      if (this.left) {
        this.left.add(node)
        return true
      }
      this.left = node
    } else if (node.value > this.value) {
      if (this.right) {
        this.right.add(node)
        return true
      }
      this.right = node
    } else {
      throw Error(
        `BinaryTreeNode<${this.type}> Error: Value(${
          node.value
        }) already exists in BinaryTree.`
      )
    }
    return true
  }

  public find(value: T): BinaryTreeNode<T> | null {
    if (this.value === value) {
      return this
    } else if (value < this.value && this.left) {
      return this.left.find(value)
    } else if (value > this.value && this.right) {
      return this.right.find(value)
    } else {
      return null
    }
  }

  public map(fn: Function) {
    this.left && this.left.map(fn)
    fn()
    this.right && this.right.map(fn)
  }

  public print() {
    if (this.left) {
      this.left.print()
    }
    console.log(this.value)
    if (this.right) {
      this.right.print()
    }
  }
}
