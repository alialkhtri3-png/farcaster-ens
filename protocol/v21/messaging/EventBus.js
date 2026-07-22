class EventBus {
 emit(event,data){
  return {
   event,
   data,
   timestamp:Date.now()
  };
 }
}

module.exports=EventBus;
