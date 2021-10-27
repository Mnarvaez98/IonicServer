const { Schema, model } = require("mongoose");

const VocesSchema = Schema(
  {
    Name: {
      type: Number,
      required: [true, "El valor es obligatorio"],
    },
  },
  { timestamps: true }
);

VocesSchema.methods.toJSON = function () {
  const { __v, _id, ...voces } = this.toObject();
  voces.UUID = _id;
  return voces;
};

//collection name and schema
module.exports = model("datos", VocesSchema);
