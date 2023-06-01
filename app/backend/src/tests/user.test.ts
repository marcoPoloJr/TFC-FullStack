import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import {Response} from 'superagent';
import UserService from '../services/User.services';
import { app } from '../app';
import * as jwt from '../utils/Auth';

chai.use(chaiHttp);

const {expect}= chai;

describe('Teste na rota /login', () => {

    let chaiHttpResponse: Response;

    afterEach(() => {
        Sinon.restore();
});
describe('POST user',()=>{
    it('Deve retornar um token',async () => {
        Sinon.stub(UserService, 'login').resolves('token');
        chaiHttpResponse = await chai.request(app).post('/login').send(({
            email:'user@user.com',
            password:'secret_user',
        }));
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal({token:'token'})
    })
})
    it('O retorno deve ser 400 quando sem parametros', async ()=>{
        chaiHttpResponse = await  chai.request(app).post('/login').send({
            email:'test@test.com',
    })
    expect(chaiHttpResponse.status).to.be.equal(400);
    })
    it('O retorno deve ser 401 quando parametros estão errados', async ()=>{
        chaiHttpResponse = await  chai.request(app).post('/login').send({
            email:'testtest.com',
            password:'123456',
    })
    expect(chaiHttpResponse.status).to.be.equal(401);
    })
    it('GET /login/role deve retornar um token', async () => {
        Sinon.stub(jwt, 'validateToken').returns({id: 1});

        Sinon.stub(UserService, 'getByRole').resolves('admin');

        chaiHttpResponse = await chai.request(app)
        .get('/login/role')
        .set('Authorization', 'token');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal({role: 'admin'});
      })

})