export default (mongoose) => {
  const schema = mongoose.Schema({
    name: {
      type: String,
      require: true,
    },

    subject: {
      type: String,
      require: true,
    },

    type: {
      type: String,
      require: true,
    },
    value: {
      type: Number,
      require: true,
      //valida se a nota inserida e menor que zero
      min: 0,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;

    return object;
  });

  const studentModel = mongoose.model('grades', schema);

  return studentModel;
};
