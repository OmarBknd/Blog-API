const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const userGetAll = async () => {
    const users = await prisma.user.findMany();
    console.log(users);
    
    return users;
}


const userCreate = async (firstName, lastName, email, password) => {

    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }
    });
   return user;
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



module.exports = {userCreate, userFindByEmail, userFindById, userGetAll};