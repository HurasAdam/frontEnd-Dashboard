const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');
const {database}=require('../config/config');
mongoose.plugin(toJson);
mongoose.connect(database,{});




