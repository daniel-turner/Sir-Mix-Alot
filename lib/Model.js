module.exports = Model;

var DataStore = require('./DataStore.js');

function Model(schema) {

  this.store = DataStore;
  this.schema = schema;
  this.id = null;

  for(var i in schema) {

    if(schema.hasOwnProperty(i)) {

      this[i] = schema[i];
    }
  }

  if(!DataStore.store.hasOwnProperty("Model")) {

    DataStore.store.Model = [];
  }
};

Model.prototype.save = function() {

  if(this.id === null) {

    this.id = Model.getNextId();
    DataStore.store.Model.push(this);
  }

};

Model.prototype.destroy = function(id) {

  if(this.id === null) {

    return "Cannot destroy a Model with no id";
  }

  var index = DataStore.store.Model.indexOf(this);
  DataStore.store.Model.splice(index,1);
  this.id = null;
};

Model.getNextId = function() {

  if(DataStore.store.Model === undefined) {

    return "Model.getNextId cannot access DataStore.store.Model";
  }

  var high = 0;

  for(var i = 0;i<DataStore.store.Model;i++) {

    if(DataStore.store.Model[i].id > high) {

      high = DataStore.store.Model[i].id;
    }
  }

  high++;

  return high;
};

Model.find = function(id) {

  if(DataStore.store.Model === undefined) {

    return "Model.find cannot access DataStore.store.Model";
  }

  for(var i = 0;i<DataStore.store.Model.length;i++) {

    if(DataStore.store.Model[i].id === id) {

      return DataStore.store.Model[i];
    }
  }

  return null;
};

Model.extend = function(klass) {

};