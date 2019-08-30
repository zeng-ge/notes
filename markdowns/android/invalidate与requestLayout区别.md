## invalidate与requestLayout区别

## invalidate流程

> invalidate首先将view及其所有父辈ViewGroup进行标记，直至ViewRootImpl，进而触发performTraversals, 进而倒至performDraw.

> 从DockerView从上而下调用updateDisplayListIfDirty来递归view，并根据view的标志位判断其是否需要重绘。通过view.draw或view.dispatchDraw来重绘view及viewGroup的所有children

> 不会触发performMeasure及performLayout，所以view的onMeasure及onLayout不会触发

```kotlin
-> invalidate()
-> invalidate(invalidateCache: true)
-> invalidate(left: 0, top: 0, right: right - left, bottom-top, invalidateCache: true, fullInvalidate: true)
    if (invalidateCache) {
        //设置PFLAG_INVALIDATED标志位，标志着view是invaliated,比dirtied更高一级
        mPrivateFlags |= PFLAG_INVALIDATED;
        //请除PFLAG_DRAWING_CACHE_VALID标志位
        mPrivateFlags &= ~PFLAG_DRAWING_CACHE_VALID;
    }
    
    final AttachInfo ai = mAttachInfo;
    final ViewParent p = mParent;
    if (p != null && ai != null && l < r && t < b) {
        final Rect damage = ai.mTmpInvalRect;
        //记录下要重绘的区域
        damage.set(l, t, r, b);
        //调用父元素的invalidateChild, 一般是指ViewGroup.invalidateChild
        p.invalidateChild(this, damage);
    }
-> p.invalidateChild(childView, damage);
    //设置parent的invalidated标志位,清除drawing cached标志位,与child是一样的
    if (child.mLayerType != LAYER_TYPE_NONE) {
        mPrivateFlags |= PFLAG_INVALIDATED;
        mPrivateFlags &= ~PFLAG_DRAWING_CACHE_VALID;
    }

    do {
        View view = null;
        if (parent instanceof View) {
            view = (View) parent;
        }

        if (drawAnimation) {
            if (view != null) {
                view.mPrivateFlags |= PFLAG_DRAW_ANIMATION;
            } else if (parent instanceof ViewRootImpl) {
                ((ViewRootImpl) parent).mIsAnimating = true;
            }
        }

        // If the parent is dirty opaque or not dirty, mark it dirty with the opaque
        // flag coming from the child that initiated the invalidate
        if (view != null) {
            if ((view.mViewFlags & FADING_EDGE_MASK) != 0 &&
                    view.getSolidColor() == 0) {
                opaqueFlag = PFLAG_DIRTY;
            }
            if ((view.mPrivateFlags & PFLAG_DIRTY_MASK) != PFLAG_DIRTY) {
                view.mPrivateFlags = (view.mPrivateFlags & ~PFLAG_DIRTY_MASK) | opaqueFlag;
            }
        }
        //改写parent本身的标志位，并返回parent的parent
        //在do while中向上遍历父级元素并重设标志位
        parent = parent.invalidateChildInParent(location, dirty);
        if (view != null) {
            // Account for transform on current parent
            Matrix m = view.getMatrix();
            if (!m.isIdentity()) {
                RectF boundingRect = attachInfo.mTmpTransformRect;
                boundingRect.set(dirty);
                m.mapRect(boundingRect);
                dirty.set((int) Math.floor(boundingRect.left),
                        (int) Math.floor(boundingRect.top),
                        (int) Math.ceil(boundingRect.right),
                        (int) Math.ceil(boundingRect.bottom));
            }
        }
    } while (parent != null);
-> invalidateChildInParent
    //父元素窗口和子元素的dirty区域做union，从而得到父元素需要刷新的区域
    dirty.union(0, 0, mRight - mLeft, mBottom - mTop);
    
    //将parent的两个标志位置上，对于直接父元素这一步其实在invalidate己经有了
    //返回parent的parent
    mPrivateFlags &= ~PFLAG_DRAWING_CACHE_VALID;
    if (mLayerType != LAYER_TYPE_NONE) {
        mPrivateFlags |= PFLAG_INVALIDATED;
    }

    return mParent;
-> ViewRootImpl.invalidateChildInParent，它没有父元素
-> ViewRootImpl.invalidateRectOnScreen   
-> ViewRootImpl.scheduleTraversals   触发重绘，通过发消息来触发
-> ViewRootImpl.doTraversal
-> ViewRootImpl.performTraversals(内部会performMeasure, performLayout, performDraw)
    这里只会触发performDraw
-> ViewRootImpl.performDraw
-> ViewRootImpl.draw
    mAttachInfo.mThreadedRenderer.draw(mView, mAttachInfo, this, callback);
    这是ThreadedRenderer.draw，这个mView是DockerView
-> ThreadedRenderer.draw(mView, mAttachInfo, this, callback);
-> ThreadedRenderer.updateRootDisplayList(view)
-> updateViewTreeDisplayList(view)
    //这个view是DockerView, 而updateDisplayListIfDirty方法继承自View
    view.updateDisplayListIfDirty()
-> View.updateDisplayListIfDirty
    //如果己标记为invalidate, 在调用invalidate时将view及其所有父级标记了
    if ((mPrivateFlags & PFLAG_DRAWING_CACHE_VALID) == 0
        || !renderNode.isValid()
        || (mRecreateDisplayList)) {
    // Don't need to recreate the display list, just need to tell our
    // children to restore/recreate theirs
    // 如果本身没有改变，就遍历它们的子view
    if (renderNode.isValid()
            && !mRecreateDisplayList) {
        mPrivateFlags |= PFLAG_DRAWN | PFLAG_DRAWING_CACHE_VALID;
        mPrivateFlags &= ~PFLAG_DIRTY_MASK;
        //对于ViewGroup而己就是遍历子元素并view.updateDisplayListIfDirty
        //开如递归调child触发draw
        dispatchGetDisplayList();

        return renderNode; // no work needed
    }

    // If we got here, we're recreating it. Mark it as such to ensure that
    // we copy in child display lists into ours in drawChild()
    mRecreateDisplayList = true;

    int width = mRight - mLeft;
    int height = mBottom - mTop;
    int layerType = getLayerType();

    final DisplayListCanvas canvas = renderNode.start(width, height);

    try {
        if (layerType == LAYER_TYPE_SOFTWARE) {
            buildDrawingCache(true);
            Bitmap cache = getDrawingCache(true);
            if (cache != null) {
                canvas.drawBitmap(cache, 0, 0, mLayerPaint);
            }
        } else {
            computeScroll();

            canvas.translate(-mScrollX, -mScrollY);
            mPrivateFlags |= PFLAG_DRAWN | PFLAG_DRAWING_CACHE_VALID;
            mPrivateFlags &= ~PFLAG_DIRTY_MASK;

            // Fast path for layouts with no backgrounds
            if ((mPrivateFlags & PFLAG_SKIP_DRAW) == PFLAG_SKIP_DRAW) {
                //遍历child，并调用child.draw来进行draw
                dispatchDraw(canvas);
                drawAutofilledHighlight(canvas);
                if (mOverlay != null && !mOverlay.isEmpty()) {
                    mOverlay.getOverlayView().draw(canvas);
                }
                if (debugDraw()) {
                    debugDrawFocus(canvas);
                }
            } else {
                //直接绘制, 其内部会调用dispatchDraw来绘制children
                draw(canvas);
            }
        }
    } finally {
        renderNode.end(canvas);
        setDisplayListProperties(renderNode);
    }
```

## requestLayout流程
```kotlin
-> requestLayout
    //将标志位置于强制布局及invalidated
    mPrivateFlags |= PFLAG_FORCE_LAYOUT;
    mPrivateFlags |= PFLAG_INVALIDATED;

    //直接调用父级的requestLayout,这会递归到ViewRootImpl
    if (mParent != null && !mParent.isLayoutRequested()) {
        mParent.requestLayout();
    }
-> ViewRootImpl.requestLayout
    mLayoutRequested = true;// 标记为是否要重新计算大小
    scheduleTraversals(); // 准备重绘
```

