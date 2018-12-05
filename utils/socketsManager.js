export function Sockets() {
  this.list = [ ];
}

Sockets.prototype.add = function(socket) {
  this.list.push(socket);

  var self = this;
  socket.on('disconnect', function() {
    self.remove(socket);
    console.log(socket.id, 'disconnected, removed from collection')
  });
}
Sockets.prototype.remove = function(socket) {
  var i = this.list.indexOf(socket);
  if (i != -1) {
    this.list.splice(i, 1);
  }
}
Sockets.prototype.emit = function(name, data) {
  var i = this.list.length;
  while(i--) {
    this.list[i].emit(name, data)
  }
}
Sockets.prototype.emitExcept = function(name, data, except) {
  var i = this.list.length;
  while(i--) {
    if (this.list[i] != except) {
      this.list[i].emit(name, data)
    }
  }
}