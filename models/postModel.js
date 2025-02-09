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

const postUpdate = async (postId, title, content) => {
    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            title: title,
            content: content
        }
    })
    return post;
}

module.exports = {postGetAll, postCreate, postUpdate};
