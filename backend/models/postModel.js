const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const postGetAll = async () => {
    const posts = await prisma.post.findMany({
        include: {
            
            author: { select: { firstName: true, lastName: true },},
            comments: { 
                include: { 
                  author: { select: { firstName: true, lastName: true, id:true, } } 
                } 
              }
        }
    });
    return posts;
}
const postGetByUserId = async(authorId) =>{
    const post = await prisma.post.findMany({
        where:{
            authorId:authorId
        },
        include:{
            comments:true,
            author:true,
        },
        orderBy:{
            createdAt: 'desc',
        }
    })
    return post
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

module.exports = {postGetAll, postCreate, postUpdate, postGetByUserId};
