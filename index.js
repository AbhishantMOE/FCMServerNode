import express from "express";
import admin from 'firebase-admin';
import bodyParser from "body-parser";


admin.initializeApp({
    credential: admin.credential.cert("./serviceAccountKey.json"),
  });


const app = express();
app.use(bodyParser.json());

// const firebaseConfig = {
//     apiKey: "AIzaSyA1tZ1dLTkFalJkft3MqOKDKiUr3puoNkk",
//     authDomain: "fcm-practice-53369.firebaseapp.com",
//     projectId: "fcm-practice-53369",
//     storageBucket: "fcm-practice-53369.appspot.com",
//     messagingSenderId: "265624996468",
//     appId: "1:265624996468:web:a62c048a7de44886735f21",
//     measurementId: "G-GFHF9EE6CB"
//   };

app.post("/send-notification", (req, res) => {
    const { token, title, body } = req.body;
    console.log("=====>",req.body);
    console.log(token,title,body);
    
    
  
    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: {
        extraInfo: "This is some extra data",
    }
    };
  
    
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        res.status(200).send("Notification sent successfully");
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        res.status(500).send("Error sending notification");
      });
  });


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('This is my server using the ES6 syntax')
});