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

postSchema.pre("validate", async function () {
  if (!this.isModified("title")) {
    return;
  }

  const baseSlug = this.title.toLowerCase().trim().replace(/\s+/g, "-");

  let slug = baseSlug;
  let counter = 1;

  while (await mongoose.models.Post.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Post", postSchema);
