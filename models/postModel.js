const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const postGetAll = async () => {
    const posts = await prisma.post.findMany({});
    return posts;
}

const postCreate = async (title, content, authorId) => {
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            authorId: authorId
        }
    })
    return post;
}

module.exports = {postGetAll, postCreate};
