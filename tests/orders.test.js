const request = require('supertest');
const orderRouter = require('../routes/orders')

describe('order api testing',()=>{
    it('should get all categories data',async ()=>{
        const res= await request(orderRouter).get('/')
        expect(res.statusCode).toBe(200)
    })
    it('order of given id should be returned',async ()=>{
        const res= await request(orderRouter).get('/1')
        expect(res.statusCode).toBe(200)
    })
    it('should create a new order',async ()=>{
        const res= await request(orderRouter).post('/').send({
            "user": "string",
            "items": [
              {
                "productId": "string",
                "quantity": 0,
                "price": 0
              }
            ],
            "shippingAddress": {
              "fullName": "string",
              "address": "string",
              "city": "string",
              "postalCode": "string",
              "country": "string"
            },
            "paymentMethod": "string",
            "totalAmount": 0
          })
        expect(res.statusCode).toBe(200)
    })
    it('should update order',async ()=>{
        const res= await request(orderRouter).put('/1').send({
            "totalAmount": 4000
          })
        expect(res.statusCode).toBe(200)
    })
    it('should update for id',async ()=>{
        const res= await request(orderRouter).put('/1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should delete data in id',async ()=>{
        const res= await request(orderRouter).delete('/1')
        expect(res.statusCode).toBe(200)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(orderRouter).put('/-1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(404)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(orderRouter).delete('/-1')
        expect(res.statusCode).toBe(404)
    })
})

