const request = require('supertest');
const categoryRouter = require('../routes/category')

describe('category api testing',()=>{
    it('should get all categories data',async ()=>{
        const res= await request(categoryRouter).get('/')
        expect(res.statusCode).toBe(200)
    })
    it('category of given id should be returned',async ()=>{
        const res= await request(categoryRouter).get('/1')
        expect(res.statusCode).toBe(200)
    })
    it('should create a new category',async ()=>{
        const res= await request(categoryRouter).post('/').send({
            "name": "Books",
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should create a new category',async ()=>{
        const res= await request(categoryRouter).put('/1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should update for id',async ()=>{
        const res= await request(categoryRouter).put('/1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(200)
    })
    it('should delete data in id',async ()=>{
        const res= await request(categoryRouter).delete('/1')
        expect(res.statusCode).toBe(200)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(categoryRouter).put('/-1').send({
            "description": "All kinds of books"
          })
        expect(res.statusCode).toBe(404)
    })
    it('should throw error for incorrect id',async ()=>{
        const res= await request(categoryRouter).delete('/-1')
        expect(res.statusCode).toBe(404)
    })
})
