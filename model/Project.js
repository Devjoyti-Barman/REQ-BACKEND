const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    organizationName:{
        type:String,
        require:true
    },
    projectName:{
        type:String,
        required:true
    },
    userId: {
        type: String,
        required: true
    },
    usersAssociated: {
        type: Array,
        required: true
    }
});

module.exports=mongoose.model('Project',projectSchema);