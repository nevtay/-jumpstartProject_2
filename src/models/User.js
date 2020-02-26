const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const thoughtSchema = new Schema(
  {
    id: {
      type: String
    },
    content: {
      type: String,
      maxlength: 140
    }
  },
  {
    timestamps: {
      createdAt: 'thoughtOn'
    }
  }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      max: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    aboutUser: {
      type: String,
      max: 500
    },
    thoughtsArray: [thoughtSchema]
  },
  {
    timestamps: {
      createdAt: 'joinedOn',
      updatedAt: 'updatedOn'
    }
  }
);

// check if the password has been hashed
userSchema.pre('save', async function(next) {
  if(this.isModified("password")){
    const rounds = 10;

    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
