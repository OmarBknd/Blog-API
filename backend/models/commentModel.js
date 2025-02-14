const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const findCommentById = async (id)=>{
    const comment = await prisma.comment.findUnique({
        where:{
            id:id
        }
    })
    return comment
}

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

module.exports = {findCommentById,commentCreate, commentDelete};