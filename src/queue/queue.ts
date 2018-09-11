class Queue<T> {
  private queue: Array<T>

  constructor(_queue?: Array<T>) {
    if (_queue) {
      this.queue = _queue
    } else {
      this.queue = new Array<T>()
    }
  }

  public length(): number {
    return this.queue.length
  }

  public enqueue(item: T) {
    this.queue.push(item)
  }

  public dequeue(): T | undefined {
    return this.queue.shift()
  }

  public peek(): T | null {
    if (this.queue.length === 0) {
      return null
    }
    return this.queue[0]
  }
}

export { Queue }
