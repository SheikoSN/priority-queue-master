const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize) {
			this.maxSize = maxSize;
		} else {
			this.maxSize = 30;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.heap.size() >= this.maxSize) {
			throw "Size has been overflowed.";
		} else {
			this.heap.push(data, priority);
		}
	}

	shift() {
		if (this.isEmpty()) {
			throw "This heap is empty.";
		} else {
			return this.heap.pop();
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
