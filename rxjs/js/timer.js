var timer = Rx.Observable.interval(2000)
var filter = timer.filter(function(val){
  return val % 2 === 0;
});
var map = filter.map(function(val){
  return 'value: ' + val;
});
var subscription = map.subscribe(function(val){
  console.log(val)
});

