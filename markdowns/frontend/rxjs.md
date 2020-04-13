### 操作符

#### 创建型

1. create
2. of
3. range
4. generate
5. repeat
6. empty
7. throw
8. nerver
9. interval
10. timer
11. from
12. fromPromise
13. fromEvent
14. fromEventPattern
15. ajax
16. repeatWhen
17. defer

#### 合并类

1. concat / concatAll
2. merge / mergeAll
3. zip / zipAll
4. combineLatest / withLatestFrom
5. startWith
6. race
7. forkJoin
8. combineAll
9. switch
10. exhaust

#### 辅助型

1. count
2. max
3. min
4. reduce
5. every
6. find
7. findIndex
8. isEmpty
9. defaultIfEmpty

#### 过滤型

1. filter
2. first
3. last
4. take / takeWhen / takeUtil / takeLast
5. skip / skipWhen / skipUtil / skipLast
6. throttleTime / throttle                           收到数据后，设定时器（关门），到时间后开门 重复前面的过程
7. debounceTime / debounce                  收到数据后开启定时器，如果在定时器关闭前有数据来，就重新生成定时器，定时器结束时吞出数据。重复前面的过程
8. auditTime / audit                                    收到数据后，开启定时器，定时器关闭前只记录最新的数据，定时器关闭时吞出最后的数据。重复前面的过程       throttle是在定时器开启前就吞出了数据，audit是在定时器半闭时吞出数据
9. sampleTime / simple                              开启定时器，记录最新数据，定时器结束时吞出最新的那条数据，与前面几个不同的地方在于，定时器不是接收数据后触发，而是一直存在
10. distinct / distinctUtilChanged / distinctUtilKeyChanged
11. ignoreElements
12. elementAt
13. single

#### 转换型

1. map
2. mapTo
3. pluck
4. bufferTime / bufferCount / bufferWhen / bufferToggle / buffer
5. windowTime / windowCount / windowWhen / windowToggle / window
6. concatMap / mergeMap / switchMap / exhaustMap
7. scan / mergeScan