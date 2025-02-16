const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const findPostById = async (postId) => {
    const post = await prisma.post.findUnique({
        where:{id:postId}
    })
    return post
}

const postGetAll = async () => {
    const posts = await prisma.post.findMany({
        include: {
            
            author: { select: { firstName: true, lastName: true, id:true },},
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
            authorId
        },
        include: {
            
            author: { select: { firstName: true, lastName: true, id:true },},
            comments: { 
                include: { 
                  author: { select: { firstName: true, lastName: true, id:true, } } 
                } 
              }
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
             id:postId
        },
        data: {
            title,
            content
        }
    })
    return post;
}

const postDelete = async (id) =>{
    const post = await prisma.post.delete({
        where:{id:id}
    })
    return post
}

module.exports = {findPostById, postGetAll, postCreate, postUpdate, postDelete, postGetByUserId};
