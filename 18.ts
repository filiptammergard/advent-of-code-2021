export function partOne(input: string) {
  const rows = input.split("\n").map((row) => JSON.parse(row));
  const tree = rows
    .slice(1)
    .reduce(
      (prev, row) => reduce(add(prev, construct(row))),
      construct(rows[0])
    );
  return magnitude(tree);
}

export function partTwo(input: string) {
  return input
    .split("\n")
    .map((row) => JSON.parse(row))
    .reduce(
      (max1, curr1, _, rows) =>
        Math.max(
          max1,
          rows.reduce(
            (max2, curr2) =>
              Math.max(
                max2,
                magnitude(reduce(add(construct(curr1), construct(curr2))))
              ),
            -Infinity
          )
        ),
      -Infinity
    );
}

function add(x: any, y: any) {
  const node = { type: "node", left: x, right: y };
  x.parent = node;
  y.parent = node;
  return node;
}

function construct(x: any, parent = null) {
  if (typeof x == "number") {
    return { type: "leaf", value: x, parent };
  }
  const node: any = { type: "node", parent };
  node.left = construct(x[0], node);
  node.right = construct(x[1], node);
  return node;
}

function order(x: any): any {
  if (x.type == "leaf") {
    return [x];
  } else {
    return order(x.left).concat(order(x.right));
  }
}

function explode(x: any, depth = 0) {
  if (
    x.type == "node" &&
    x.left.type == "leaf" &&
    x.right.type == "leaf" &&
    depth >= 4
  ) {
    const zeroTree = construct(0, x.parent);

    if (x.parent.left == x) {
      x.parent.left = zeroTree;
    } else if (x.parent.right == x) {
      x.parent.right = zeroTree;
    }

    return [zeroTree, x.left.value, x.right.value];
  } else if (x.type == "node") {
    const left: any = explode(x.left, depth + 1);
    if (left != null) return left;

    const right: any = explode(x.right, depth + 1);
    if (right != null) return right;
  }

  return null;
}

function split(x: any) {
  if (x.type == "leaf" && x.value >= 10) {
    const newTree = construct(
      [Math.floor(x.value / 2), Math.ceil(x.value / 2)],
      x.parent
    );
    if (x.parent.left == x) {
      x.parent.left = newTree;
    } else if (x.parent.right == x) {
      x.parent.right = newTree;
    }

    return true;
  } else if (x.type == "node") {
    if (split(x.left)) return true;
    if (split(x.right)) return true;
  }

  return false;
}

function reduce(tree: any) {
  let changed;
  do {
    changed = false;

    const res = explode(tree);
    if (res != null) {
      const [zeroTree, left, right] = res;
      const pieces = order(tree);
      const i = pieces.indexOf(zeroTree);
      if (i > 0) pieces[i - 1].value += left;
      if (i < pieces.length - 1) pieces[i + 1].value += right;
      changed = true;
    } else {
      changed = split(tree);
    }
  } while (changed);
  return tree;
}

function magnitude(tree: any): any {
  if (tree.type == "leaf") {
    return tree.value;
  }
  return 3 * magnitude(tree.left) + 2 * magnitude(tree.right);
}
