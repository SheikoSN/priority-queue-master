const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		var detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);

		return detachedRoot == null ? null : detachedRoot.data;
	}

	detachRoot() {
		if (this.root == null) {
			return null;
		}

		var detachedRoot = this.root;
		this.root = null;

		if (detachedRoot.left == null || detachedRoot.right == null) {
			this.parentNodes.shift();
		}

		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length == 0) {
			return;
		}

		var lastNode = this.parentNodes.pop();
		var detachedFromParent = lastNode.parent;
		lastNode.remove();

		lastNode.appendChild(detached.left);
		lastNode.appendChild(detached.right);

		if (detachedFromParent != null && detached != detachedFromParent && this.parentNodes[0] != detachedFromParent) {
			this.parentNodes.unshift(detachedFromParent);
		}

		if (lastNode.left == null || lastNode.right == null) {
			this.parentNodes.unshift(lastNode);
		}

		detached.left = null;
		detached.right = null;

		this.root = lastNode;
	}

	size() {
		if (this.root == null) {
			return 0;
		}

		var subtrahend = 0;
		var lastNode = this.parentNodes[this.parentNodes.length - 1];
		if (lastNode.parent != null && lastNode.parent == this.parentNodes[0]) {
			subtrahend = 1;
		}

		return 2 * this.parentNodes.length - 1 - subtrahend;
	}

	isEmpty() {
		return this.root == null;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.root == null) {
			this.root = node;
			this.parentNodes = [node];
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left != null && this.parentNodes[0].right != null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node != null && node.parent != null && node.parent.priority < node.priority) {
			if (this.root == node.parent) {
				this.root = node;
			}

			this.swapNodesInParenList(node, node.parent);

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (node == null) {
			return;
		}

		var swapUpNode = null;

		if (node.left != null && node.right != null) {
			if (node.left.priority > node.right.priority) {
				if (node.left.priority > node.priority) {
					swapUpNode = node.left;
				}
			} else {
				if (node.right.priority > node.priority) {
					swapUpNode = node.right;
				}
			}
		} else if (node.right != null && node.right.priority > node.priority) {
			swapUpNode = node.right;
		} else if (node.left != null && node.left.priority > node.priority) {
			swapUpNode = node.left;
		}

		if (swapUpNode != null) {
			swapUpNode.swapWithParent();

			if (node == this.root) {
				this.root = swapUpNode;
			}

			this.swapNodesInParenList(node, swapUpNode);

			this.shiftNodeDown(node);
		}
	}

	swapNodesInParenList(firstNode, secondNode) {
		var fierstIndexNode = this.parentNodes.indexOf(firstNode);
		var secondIndexNode = this.parentNodes.indexOf(secondNode);

		if (fierstIndexNode >= 0) {
			this.parentNodes[fierstIndexNode] = secondNode;
		}

		if (secondIndexNode >= 0) {
			this.parentNodes[secondIndexNode] = firstNode;
		}
	}
}

module.exports = MaxHeap;
