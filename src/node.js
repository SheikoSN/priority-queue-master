class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (node == null) {
			return;
		}

		if (this.left == null) {
			this.left = node;
			node.parent = this;
		} else if (this.right == null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left == node) {
			if (this.left != null) {
				this.left.parent = null;
				this.left = null;
			}
		} else if (this.right == node) {
			if (this.right != null) {
				this.right.parent = null;
				this.right = null;
			}
		} else {
			throw "passed node is not a child of this node";
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (!this.parent) {
			return
		};

		var parent = this.parent;
		var left = this.left;
		var right = this.right;

		var parentOfParent = this.parent.parent;
		var parentLeft = this.parent.left;
		var parentRight = this.parent.right;
		var current = this;
		var currentLeft = this.left;
		var currentRight = this.right;

		if (currentLeft) {
			currentLeft.parent = parent;
		}
		if (currentRight) {
			currentRight.parent = parent;
		}
		parent.parent = current;
		current.parent = parentOfParent;

		if (parentOfParent) {
			if (parentOfParent.left == parent) {
				parentOfParent.left = current;
			} else {
				parentOfParent.right = current;
			}
		}

		if (parentLeft == current) {
			if (parentRight) {
				parentRight.parent = current;
			}
			current.right = parentRight;
			current.left = parent;
		} else {
			if (parentLeft) {
				parentLeft.parent = current;
			}
			current.right = parent;
			current.left = parentLeft;
		}

		parent.left = currentLeft;
		parent.right = currentRight;
	}
}

module.exports = Node;
