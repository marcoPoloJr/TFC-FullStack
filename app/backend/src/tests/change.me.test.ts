import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Team.model';
import {getAllTeams, getOneTeam} from '../mock/teams.mock';

import { Response } from 'superagent';
import TeamService from '../services/Team.services';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste para rota /teams', () => {
  
  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
});

describe('GET teams', ()=>{
  it('Deve retornar todos os times',async () => {
    sinon.stub(TeamModel, 'findAll').resolves( getAllTeams as TeamModel[]);

    const {status, body}= await
    chai.request(app).get('/teams')
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getAllTeams);
  })
  it('Deve retornar um time',async () => {
    sinon.stub(TeamModel, 'findByPk').resolves( getOneTeam as TeamModel);

    const {status, body}= await
    chai.request(app).get('/teams/1')
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getOneTeam);
  });

  it('Deve retornar um erro se não encontrar um time',async () => {
    sinon.stub(TeamModel, 'findByPk').resolves();

    expect(TeamService.getById(1)).to.be.deep.equal('Não existe time com este id');
   
  });
})
  
});
