import express from 'express';
import cors from 'cors'; // Import the cors middleware
const app = express();
import Course from './models/course.model.js';
import Quiz from './models/quiz.model.js';
import Post from './models/post.model.js';
import userCollection from './models/user.model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const saltRound = 10;
const JWTkey = process.env.SECRET_KEY;
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL||"http://localhost:5173",
        credentials: true
    })
);

app.get('/',(req,res)=>{
        res.send("hello world");
});




app.get('/api/authentication', async (req, res) => {
    if (req.cookies.token) {
        try {
            const verificationStatus = jwt.verify(req.cookies.token, JWTkey);
            if (verificationStatus) {
                const userAuthTe = await userCollection.findOne({ _id: verificationStatus._id })
                if (userAuthTe) {
                    console.log(verificationStatus);
                    res.status(200).json({ verificationStatus: verificationStatus, userInfo: userAuthTe });
                } else {
                    res.status(403);
                }

            }
        } catch (error) {
            return res.status(403).json({ message: "Authentication failed" });
        }
    } else {
        return res.status(403).json({ message: "Login or Register First" });
    }
});



app.post("/api/register/:userEmail/:userPassword/:userName", async (req, res) => {
    const userEmail = req.params.userEmail;
    const userPassword = req.params.userPassword;
    const userName = req.params.userName;
    
    bcrypt.hash(userPassword, saltRound, async (err, hash) => {
        if (err) {
            console.error(err);
        } else {
            const userToAdd = userCollection({
                name: userName,
                email: userEmail,
                password: hash,
                childern: [],
            });
            const userCheck = await userCollection.findOne({ rmail: userEmail })
            if (userCheck) {
                res.status(400).json({ message: 'User already exists' });
            } else {
                try {
                    await userToAdd.save();

                    const userPayload = {
                        _id: userToAdd._id,
                        userName: userToAdd.name,
                        userEmail: userToAdd.email,
                    }

                    const tokenJwtSigned = jwt.sign(userPayload, JWTkey);

                    res.cookie('LoggedIn', tokenJwtSigned, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
                    res.status(200).json({ message: tokenJwtSigned });
                } catch (error) {
                    console.error(error);
                    res.status(400).json({ message: 'User already exists' });
                }
            }

        }
    });
});


app.post("/api/login/:userEmail/:userPassword", async (req, res) => {
    const userEmail = req.params.userEmail;
    const userPassword = req.params.userPassword;

    const userFind = await userCollection.findOne({ email: userEmail });
    if (userFind) {
        bcrypt.compare(userPassword, userFind.password, async (err, result) => {

            if (result === true) {
                const userPayload = {
                    _id: userFind._id,
                    name: userFind.userName,
                    email: userFind.userEmail,
                }
                const tokenJwtSigned = jwt.sign(userPayload, JWTkey);

                res.set('set-cookie', `loggedIn=${tokenJwtSigned}; HttpOnly`);
                res.status(200).json({ message: tokenJwtSigned });
            } else {
                console.log("Incorrect Password");

            }
        });


    } else {
        console.log("User Not Found");
        res.redirect("/login");
    }
});



app.post('/api/addcourses', async (req, res) => {
    const {heading,description,owner,story} = req.body;

    try {
        const savedCourse = new Course({heading,description,owner,story});
        await savedCourse.save();
        res.status(201).send(savedCourse);
    } catch (error) {
        res.status(400).send(error);
    }
});
 
app.post('/api/addquizzes', async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const newQuiz = new Quiz({ title, description, questions });
        await newQuiz.save();
        res.status(201).send(newQuiz);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/api/addpost', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});



export { app };