核心逻辑集中在reconcileChildrenArray和reconcileChildrenIterator
```以为例reconcileChildrenArray

oldFiber    returnFiber.child，即第一个child，在遍历过程中生指向sibing
nextOldFiber    oldFiber.sibing
newIdx      遍历props.children时的index

function reconcileChildrenArray(
    returnFiber: Fiber,              //父元素 workInProgress.alternate
    currentFirstChild: Fiber | null, //workInProgress.alternate.child
    newChildren: Array<*>,           //props.children
    expirationTime: ExpirationTime,
  ): Fiber | null {

    let resultingFirstChild: Fiber | null = null;   //新的fiber链列的第一个fiber
    let previousNewFiber: Fiber | null = null;      //记录上一个fiber, previousNewFiber.sibing = newFiber，用来形成链表

    let oldFiber = currentFirstChild;
    let lastPlacedIndex = 0;            //
    let newIdx = 0;                     // 记录遍历newChildren的index
    let nextOldFiber = null;            // oldFiber.sibing
    for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
      //如果fiber数比chidren多，如[1,2,3]变成[1]，当进行第二轮遍历时，将oldFiber置为空，
      //这样updateSlot会返回null,即跳出循环，此时有newIdx为1,
      if (oldFiber.index > newIdx) {
        nextOldFiber = oldFiber;
        oldFiber = null;
      } else {
        //如果index是匹配的，那么记录oldFiber.sibling，以进行第下一次遍历
        nextOldFiber = oldFiber.sibling;
      }
      //updateSlot很重要
      //下面选回的fiber，根据oldFiber是否存在来决定创新fiber或clone并更新fiber
      //1)child为null直接返回null
      //2)如果当前的children[newIdx]为数字或字符串，并且index相同则返回一个fiber
      //3)如果为对象,key不同直接返回null, 如果key相同且类型为element且key相同，则返回一个clone的老fiber, 如果类型不同直接create一个新的fiber
      //4)如果是protal, key不同直接返回null，否则返回一个fiber
      //5)如果fiber与child都没有key，则fiber.key = null, child.key = null, fiber.key === child，相当于第二种情况
      const newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime,
      );
      // newFiber为空的话直接跳出循环，即只要oldFiber为害以及key或类型不同就跳出循环
      // 在后面的循环中利用newIdx记录的位置进行操作
      if (newFiber === null) {
        if (oldFiber === null) {
          oldFiber = nextOldFiber;
        }
        break;
      }
      if (shouldTrackSideEffects) {
        //如果oldFiber与newFiber的type不一样，如从div变成了li，那么newFiber是新创建的，
        //它没有alternate，说明当前的oldFiber要删掉
        if (oldFiber && newFiber.alternate === null) {
          deleteChild(returnFiber, oldFiber);
        }
      }
      //newFiber.index = newIdx, newFiber.effectTag = Placement
      //标记newFiber为Placement
      //lastPlaceIndex记录oldFiber.index
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
      if (previousNewFiber === null) {
        resultingFirstChild = newFiber;//记录第一个newFiber，用于生成链表
      } else {
        previousNewFiber.sibling = newFiber;//上一个fiber指向下一个fiber
      }
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }

    //newIdx === newChildren.length说明newChildren遍历完了
    //这就证明oldChildren.length >= newChildren.lenth
    //需要将多余的oldChildren删掉，如[1,2,3]变成了[1]，此时要将2与3删除
    //由于遍历完了1，所以oldFiber也指向了2
    if (newIdx === newChildren.length) {
      deleteRemainingChildren(returnFiber, oldFiber);
      return resultingFirstChild;
    }

    //当newChildren的长度大于oldChildren时，即没有遍历完成，
    //如[1]或[] 变成了[1,2,3],由于newIdx记录了遍历的位置，
    //所以可以接着遍历newChildren余下的元素
    if (oldFiber === null) {
      // If we don't have any more existing children we can choose a fast path
      // since the rest will all be insertions.
      for (; newIdx < newChildren.length; newIdx++) {
        //对于新增的元素，直接create新的fiber
        const newFiber = createChild(
          returnFiber,
          newChildren[newIdx],
          expirationTime,
        );
        if (!newFiber) {
          continue;
        }
        //newFiber.index = newIdx, newFiber.effectTag = Placement
        //标记newFiber为Placement
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          // TODO: Move out of the loop. This only happens for the first run.
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;//生成链
        }
        previousNewFiber = newFiber;
      }
      return resultingFirstChild;//返回firstChild
    }

    // Add all children to a key map for quick lookups.
    // 将己有的children的key与fiber存进map，如果没有key就用index当作key
    const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

    // 在第一次遍历时，如果key与类型不匹配就会跳出循环,
    // 此时newIdx === newChildren.length与oldFiber === null都不会走
    // 这个时候就要比较oldChildren与newChildren了，找出可以重复利用的fiber，
    // 删掉不在需要的fiber
    // Keep scanning and use the map to restore deleted items as moves.
    for (; newIdx < newChildren.length; newIdx++) {
      //根据newChildren[newIdx]里面的key在existingChildren里面查找fiber，如果找得到就clone并更新,
      //如果找不到就创建一个新的
      const newFiber = updateFromMap(
        // 根据key或index从existingChildren里面取出老的fiber,
        // 用 newChildrent[newIdx].key或newIdx从existingChildren里面取，没有就create
        existingChildren,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        expirationTime,
      );
      if (newFiber) {
        if (shouldTrackSideEffects) {
          //如果是利用己有的fiber,由于是clone的，newFiber.alternate是有值的，也就是说要进行更新
          //将该fiber从existingChildren里面删除
          if (newFiber.alternate !== null) {
            // The new fiber is a work in progress, but if there exists a
            // current, that means that we reused the fiber. We need to delete
            // it from the child list so that we don't add it to the deletion
            // list.
            existingChildren.delete(
              newFiber.key === null ? newIdx : newFiber.key,
            );
          }
        }
        //标记newFiber为Placement
        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
        if (previousNewFiber === null) {
          resultingFirstChild = newFiber;
        } else {
          previousNewFiber.sibling = newFiber;//挂链
        }
        previousNewFiber = newFiber;
      }
    }

    if (shouldTrackSideEffects) {
      // Any existing children that weren't consumed above were deleted. We need
      // to add them to the deletion list.
      //将不需要的old chilrent标记为Deletion，并将effect挂在returnFiber上
      //child.effectTag = Deletion, returnFiber.lastEffect.next = child
      //因为child己经不在链表里面了，必须将它的effect挂到returnFiber上面，
      //而newFiber会有completeWork里面将effect挂到returnFiber里面，
      //所以删除操作的优先级最高
      existingChildren.forEach(child => deleteChild(returnFiber, child));
    }

    return resultingFirstChild;
  }
```

