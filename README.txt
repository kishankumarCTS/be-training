#Task 4a – PostgreSQL Blog Schema
    Created users, posts, and comments tables in PostgreSQL.
    Added SQL queries to insert users and posts.
    Used JOIN and GROUP BY to get posts with author names and comment counts.
    Added a query to update a post title.
#Task 4b – MongoDB with Mongoose
    Created a Post schema using Mongoose.
    Added validation to the schema.
    Implemented functions to create, find, update, and delete posts.
    Connected the application to MongoDB.
#Task 4c – PostgreSQL JOIN and GROUP BY
    Created users and posts tables with a foreign key.
    Used JOIN to get all posts with their author's name.
    Used GROUP BY and HAVING to find users with more than 2 posts.
#Task 4d – PostgreSQL Transaction
    Created a transaction to insert a new user and post.
    Deliberately caused an error using a duplicate email.
    Used ROLLBACK to undo all changes.
    Verified that neither the user nor the post was inserted.
#Task 4e – PostgreSQL Using pg Package
    Used the pg package without an ORM.
    Created a getUserWithPosts(userId) function.
    Used JOIN to fetch a user with their posts.
    Used parameterized $1 queries to prevent SQL injection.
    Tested the function with malicious input.
#Task 4f – Prisma
    Used Prisma ORM to fetch all posts.
    Used include to fetch the author.
    Used _count to get the comment count.
    Retrieved all data using a single Prisma query without raw SQL.
#Task 4g – Mongoose Pre-save Hook
    Added a slug field to the Post schema.
    Created a pre('save') hook to generate slugs from post titles.
    Converted titles to lowercase and replaced spaces with hyphens.
    Verified that the hook runs when creating a post.
    Verified that it does not run with findByIdAndUpdate.