const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


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

module.exports = {userCreate};