const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const firstUserIsAdmin = async() => {
    const user  = await prisma.user.findFirst({
        where:{role:'ADMIN'}
    })
    return user
}
const superAdmin = async() => {
    const user = await prisma.user.findFirst({
        where:{role:'ADMIN'},
        orderBy:{createdAt:'asc'}
    })
    return user
}
const userPromoteToAdmin = async(userId) => {
    const user = await prisma.user.update({
        where:{id:userId},
        data:{role:'ADMIN'}
    })
    return user
}

const userDemoteFromAdmin = async(userId) => {
    const user = await prisma.user.update({
        where:{id:userId},
        data:{role:'USER'}
    })
    return user
}
const userGetAll = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
    
    return users;
}


const userCreate = async (firstName, lastName, email, password, existingAdmin) => {

    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: existingAdmin ? "USER" : "ADMIN"
        }
    });
   return user;
}

const userUpdatePassword = async(id, password) => {
    const user = await prisma.user.update({
        where:{
            id:id
        },
        data:{
            password:password
        }
    })
    return user
}

const userFindByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

const userFindById = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user;
}



module.exports = {firstUserIsAdmin, superAdmin, userPromoteToAdmin, userDemoteFromAdmin, userCreate, userFindByEmail, userFindById, userGetAll, userUpdatePassword};