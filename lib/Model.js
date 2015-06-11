module.exports = Model;

var dataStore = require('./DataStore.js');

function Model(schema) {

  console.log(this.constructor.name);

  if(!dataStore.store.hasOwnProperty(this.constructor.name)) {

    dataStore.store[this.constructor.name] = [];
  }

  this.store = dataStore.store[this.constructor.name];
  this.schema = schema;
  this.id = null;

  for(var i in schema) {

    if(schema.hasOwnProperty(i)) {

      this[i] = schema[i];
    }
  }
};

Model.prototype.save = function() {

  if(this.id === null) {

    this.id = this.constructor.getNextId();
  }

  if(this.constructor.find(this.id) === null) {

    this.store.push(this);
  }

};

Model.prototype.destroy = function(id) {

  var item = this.constructor.find(id);

  if(item === null) {

    item = this;
  }

  if(item !== null) {

    var index = this.store.indexOf(item);

    if(index > -1) {

      this.store.splice(index,1);
      item.id = null;
    }
  }
};

Model.getNextId = function() {

  if(dataStore.store[this.name] === undefined) {

    return "[this.name].getNextId cannot access DataStore.store.[this.name]";
  }

  var high = 0;

  for(var i = 0;i<dataStore.store[this.name].length;i++) {

    if(dataStore.store[this.name][i].id > high) {

      high = dataStore.store[this.name][i].id;
    }
  }

  high+=1;

  return high;
};

Model.find = function(id) {

  if(dataStore.store[this.name] === undefined) {

    return "Model.find cannot access DataStore.store." + klass;
  }

  for(var i = 0;i<dataStore.store[this.name].length;i++) {

    if(dataStore.store[this.name][i].id === id) {

      return dataStore.store[this.name][i];
    }
  }

  return null;
};

Model.extend = function(klass) {

  for (var k in this) {

    if (this.hasOwnProperty(k)) {

      klass[k] = this[k];
    }
  }

  for (var k in this.prototype) {

    if(this.prototype.hasOwnProperty(k)) {

      klass.prototype[k] = this.prototype[k];
    }
  }

  return klass;
};