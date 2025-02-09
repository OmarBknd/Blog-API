const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();



const commentCreate = async (content,authorId, postId) => {
    const comment = await prisma.comment.create({
        data: {
            content: content,
            authorId: authorId,
            postId: postId
        }
    });
    return comment;
}

const commentDelete = async (id) => {
    const comment = await prisma.comment.delete({
        where: {
            id: id
        }
    });
    return comment;
}

module.exports = {commentCreate, commentDelete};