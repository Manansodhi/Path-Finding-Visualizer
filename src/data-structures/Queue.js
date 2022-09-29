export class Queue {
  constructor() {
    this.queue = [];
  }
  push(item) {
    this.queue.push(item);
  }
  front() {
    return !this.isEmpty() ? this.queue[0] : null;
  }
  back() {
    return !this.isEmpty() ? this.queue[this.queue.length - 1] : null;
  }
  pop() {
    if (!this.isEmpty()) {
      this.queue.shift();
    }
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}
