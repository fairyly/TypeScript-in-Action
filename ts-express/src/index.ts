import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser'

const app = express();
const router = express.Router();

createConnection().then(async connection => {

    /*console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);*/
    const userRepository = connection.getRepository(User);

    console.log("Here you can setup and run express/koa/any other framework.");

    // app.get('/', (req,res)=>{
    //   res.json({});
    // })

    // 获取用户信息
    router.get('', async(req,res,next) =>{
      try{
        const users = await connection.manager.find(User);
        res.json({users});
      }catch(err) {
        next(err)
      }
    })
    // 添加用户信息
    router.post('', async(req,res,next) =>{
      try{
        const user = new User();
        user.firstName = "Timber"; // req.body.firstName
        user.lastName = "Saw"; // req.body.lastName
        user.age = 25; // // req.body.age
        const current = await connection.manager.save(user);
        res.json({current});
      }catch(err) {
        next(err)
      }
    })

    // 更新
    router.put('/:id', async(req,res,next) =>{
      try{
        const user = new User();
        user.firstName = "Timberqqq"; // req.body.firstName
        user.lastName = "Saw"; // req.body.lastName
        user.age = 25; // // req.body.age
        console.log(req.params.id)
        // await connection.manager.update(req.params.id, user, user);
        const nowUser = await userRepository.findOne(req.params.id);
        await userRepository.merge(nowUser, user);//req.body
        const results = await userRepository.save(nowUser);
        res.json({});
      }catch(err) {
        next(err)
      }
    })

    // 删除
    router.delete('/:id', async(req,res,next) =>{
      try{
        const user = await userRepository.findOne(req.params.id);
        // const user = await connection.manager.findOne(User, {id: req.params.id});//这种查不到
        await connection.manager.remove(user);
        res.json({});
      }catch(err) {
        next(err)
      }
    })

    app.use('/test', router);
    app.use(bodyParser.json());

    const server = http.createServer(app);
    app.listen(8003);

}).catch(error => console.log(error));
