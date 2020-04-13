/**
      observable.subscribe()时会生先生成一个Subscriber(Subscription的子类，默认是SafeSubscriber)实例，
      下面的例子相当于形成了两条链：
      filterObserable => filterOperator.source => MapObserable => MapOperator.source => ScanObservable =>
        ScanOperator.source => of

      of是生产型Observable,它的_subscribe方法会直接对数据进行处理
      for (var i = 0; i < count && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();

      of的subscriber是ScanSubscriber

    */
      var of = Rx.Observable.of(1,2,3);
      /**      
        ScanOperator.source = ofObservable
        ScanSubscriber.destination = mapSubscriber
        所有的Operator都是通过lift实现, 返回一个Observable，它包含一个具体的ScanOperator实例
        ScanOperator会记录accumulator与seed，当subscribe时会执行call来实现
        function scan(accumulator, seed) {
            return this.lift(new ScanOperator(accumulator, seed));
        }
        exports.scan = scan;
        var ScanOperator = (function () {
            function ScanOperator(accumulator, seed) {
                this.accumulator = accumulator;
                this.seed = seed;
            }
            //实例化一个ScanSubscriber，在这里它的destinatin = MapSubscriber
            ScanOperator.prototype.call = function (subscriber, source) {
                return source._subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed));
            };
            return ScanOperator;
        }());

       Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
        };
      */    
      var scan = of.scan(
        function(accumulator, next){
          console.log(accumulator + ' | ' + next)
          return accumulator + next
        }, 0);

      /**
        MapOperator.source = scanObservable
        MapSubscriber.destination = FilterSubscriber
        同scan的实现基本一样，它依赖MapOperator与MapSubscriber
        mapSubscriber.destination = filterSubscriber
        返回一个Observable
      */
      var map = scan.map(function(value){
        console.log('sum:' + value)
        return 2 * value;
      });

      /**
        FilterOperator.source = MapObservable
        FilterSubscriber.destination = sink
        同scan，也是个Operator,依赖FilterOperator与FilterSubscriber        
        返回mapObservable
      */
      var filter = map.filter(function(value){
        return value > 2
      });

      /**
        destination是SafeSubscriber(Subscriber的子类)实例,它的next是这个指定的函数
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        sink是SubScriber实例
        sink.destination = safeSubscriber
      */
      var subscription = filter.subscribe(function(value){
        console.log('double sum:' + value)
      });
      console.log(subscription);


      function * generate(max){
          for(var i = 1; i <= max; i++) {
              yield i;
          }
      }
      const yieldObservable = Rx.Observable.from(generate(3))
    yieldObservable.subscribe(console.log)



const fromObservable = Rx.Observable.from(['a', 'b', 'c'])
// fromObservable
//     .repeat(3)
//     .subscribe(console.log)

// fromObservable
//     .repeatWhen(function(notifier){
//         return notifier.delay(12000)
//     })
//     .subscribe(console.log)


const rangeObservable = Rx.Observable.range(1, 5, Rx.Scheduler.asap)
console.log('scheduler begin')
rangeObservable.subscribe(console.log)
console.log('scheduler end')



Rx.Observable.from([1, 2, 3]).concatMap(value => {
    return new Rx.Observable(observer => {
        observer.next(`concat map -- ${value}`)
        setTimeout(() => {
            observer.complete()
        }, 2000)
    })
}).subscribe(console.log)