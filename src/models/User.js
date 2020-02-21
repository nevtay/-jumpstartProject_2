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
      createdAt: 'Thought conceived on'
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
      createdAt: 'Joined On',
      updatedAt: 'Updated On'
    }
  }
);

userSchema.pre('save', async function(next) {
  const rounds = 10;
  this.password = await bcrypt.hash(this.password, rounds);
  next();
});

module.exports = mongoose.model('User', userSchema);
