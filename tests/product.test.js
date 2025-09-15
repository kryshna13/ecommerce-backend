const request = require('supertest');
const productRouter = require('../routes/product')

describe('product api testing',()=>{
    it('should get all categories data',async ()=>{
        const res= await request(productRouter).get('/')
        expect(res.statusCode).toBe(200)
    })
    it('should create a new product',async ()=>{
        const res= await request(productRouter).post('/').send({
            "name": "string",
            "price": 0,
            "category": "string",
            "description": "string",
            "stock": "string",
            "images": "string",
            "ratings": "string",
            "reviews": "string",
            "createdat": "string"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should create a new product',async ()=>{
        const res= await request(productRouter).put('/1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should update for id',async ()=>{
        const res= await request(productRouter).put('/1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should delete data in id',async ()=>{
        const res= await request(productRouter).delete('/1')
        expect(res.statusCode).toBe(200)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(productRouter).put('/-1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(404)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(productRouter).delete('/-1')
        expect(res.statusCode).toBe(404)
    })
})


