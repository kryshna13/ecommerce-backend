const request = require('supertest');
const usersRouter = require('../routes/users')

describe('users api testing',()=>{
    it('should create new customer with incorrect role',async ()=>{
        const res= await request(usersRouter).post('/register').send({
            "name": "string",
            "email": "string",
            "role": "admin",
            "password": "string"
          })
        expect(res.statusCode).toBe(400)
    })

    it('should create new customer',async ()=>{
        const res= await request(usersRouter).post('/register').send({
            "name": "string",
            "email": "string",
            "role": "Admin",
            "password": "string"
          })
        expect(res.statusCode).toBe(200)
    })

    it('should login customer',async ()=>{
        const res= await request(usersRouter).post('/login').send({
            "email": "string",
            "role": "Admin",
            "password": "string"
          })
        expect(res.statusCode).toBe(200)
    })

    it('should get data of login customer',async ()=>{
        const res= await request(usersRouter).get('/me').send({
            "email": "string",
            "role": "Admin",
            "password": "string"
          })
        expect(res.statusCode).toBe(200)
    })

    it('should logout customer',async ()=>{
        const res= await request(usersRouter).post('/logout').send({
            "email": "string",
            "role": "Admin",
            "password": "string"
          })
        expect(res.statusCode).toBe(200)
    })


})