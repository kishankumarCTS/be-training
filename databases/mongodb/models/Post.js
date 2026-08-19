const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// pre middleware for task 4g
postSchema.pre("save", function (next) {
  this.slug = this.title.toLowerCase().replace(/\s+/g, "-");
  next();
});

module.exports = mongoose.model("Post", postSchema);
