const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


const firstUserIsAdmin = async() => {
    const user  = await prisma.user.findFirst({
        where:{role:'ADMIN'}
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



module.exports = {firstUserIsAdmin, userCreate, userFindByEmail, userFindById, userGetAll, userUpdatePassword};