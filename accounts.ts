const express = require('express');
const cors = require('cors');
const { Pool } = require('pg')
const pool = new Pool()

const app = express();

// const pool = require('./db');

//Middleware
app.use(cors());
app.use(express.json());


// DB for accounts => accountid, comments user made, posts user made
// DB for posts => has post id, comments, likes on post etc


// gets accounts feed
app.get("/feed/:accountID/", async (req, res) => {
  // honestly not sure how to do right now, need some sort of algorthim that gets posts
});


// gets account ID
app.get("/:accountId", async (req: any, res, next) => {
  const accountId = req.params.accountId;

  try {
    console.log("GET Response / Account Summary / For Id: ", accountId);
    res.send({ accountId: accountId });
  } catch (err) {
    console.log("GET Error / Account Summary / For Id: ", accountId, err);
    // TO-DO Handle errors from Trading API
    res.send({ error: "Get Account Route Error" });
  }
});

// account information
app.get('/accounts/:account_id', async (req, res) => {
  try {
      const account_id = req.params;
      const account = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');
      
      // res.json(account.rows);        

      res.json({
          "username": account['username'],
          "account_id": account['account_id'],
          "name": account['name']
      })
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

//GET account friends
app.get('/accounts/:account_id/friends', async (req, res) => {
  try {
      const account_id  = req.params;
      const account = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');
      const friends = []

      // friends of account are all IDs
      for (let i = 0; i < account["friends"].length; i++) {
        const friend_account_id  = account["friends"][i];
        const friend = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');
        friends.push(friend);
      }
      res.json({
          "account_id": 1234,
          "friends": friends
          }
      );
  } catch (err) {
      res.json({
          status: err.status,
          message: err.message
      })
      console.error(err);
  }
});

//GET account posts
app.get('/media/:account_id', async (req, res) => {
  try {
      const account_id = req.params;
      const account = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');
      const posts = []

      for (let i = 0; i < account["posts"].length; i++) {
        posts.push(account['posts'][i]);
      }
      res.json({
          "account_id": account_id,
          "media": posts
          }
      );
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

//GET post's views
app.get('/media/:media_id/likes', async (req, res) => {
  try { 
      //db SELECT query
      const media_id = req.params;
      const media = await pool.query('SELECT * FROM [db of media] WHERE [mediaID == media_id]');
      const views = media["views"];

      res.json({  
          "media_id": 2049,
          "views": views
          }
      );
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

//GET post's likes
app.get('/media/:media_id/likes', async (req, res) => {
  try { 
      //db SELECT query
      const media_id = req.params;
      const media = await pool.query('SELECT * FROM [db of media] WHERE [mediaID == media_id]');
      const likes = media["likes"];

      res.json({  
          "media_id": 2049,
          "likes": likes
          }
      );
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

//GET post's comments
app.get('/media/:media_id/comments', async (req, res) => {
  try { 
      //db SELECT query
      const media_id = req.params;
      const media = await pool.query('SELECT * FROM [db of media] WHERE [mediaID == media_id]');
      const comments =[]

      for (let i = 0; i < media["comments"].length; i++) {
        comments.push(media["comments"][i]);
      }

      res.json({  
          "media_id": 2049,
          "comments": comments
          }
      );
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

// Post media (post)
app.post('/media', async (req, res) => {
  try { 
      const accountID = 
      {
          "account_id": 1234 
      }
      const mediaID =
      {
        "media_id": 1234
      }
      const mediaType = 
      {
        "media_type": "picture"
      }
      const mediaCaption = 
      {
        "media_caption": "first post"
      }
      const mediaComments = [];
      const mediaLikes = 0;

      const media = await pool.query(
          'INSERT INTO ___ (accountID, mediaID, mediaType, mediaCaption, mediaComments, mediaLikes) VALUES(1234, 1234, "picture", "first post", [], 0) RETURNING *'
      );

      res.json({
          status: 200
      })
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});


// Add comment to a post
app.post('/media/comments', async (req, res) => {
  try {
      //db INSERT query
      const account_id = req.params.account_id;
      const account = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');

      const media_id = req.params.media_id;
      const media = await pool.query('SELECT * FROM [db of media] WHERE [mediaID == media_id]');

      const comment = {
          "commentId9031" : {
              "user_handle" : account['username'],
              "comment_text" : req.paramts.text,
              "posted_on" : req.params.time
            }
      }

      const commentList = media['list'];
      commentList.push(comment);
      media['list'] = commentList;


      // assuming if you insert an existing ID it replaces that entry with whatevers inserted?
      const commentPost = await pool.query(
        'INSERT INTO ___ (media) VALUES( {media} ) RETURNING *'
    );
    res.json({
      "status": 200
  })

      
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

// POST login -- skipping, assuming it'll be done through Firebase w/ tokens?
app.post('/login', async (req, res) => {
  // checks credientals probably need a hasing system
});

// POST create account -- same thing^ assuming done w authorization service instead of in app
app.post('/accounts', async (req, res) => {
  // skipped
});

// Add friends
app.post('/accounts/:account_id/friends', async (req, res) => {

  const account_id = req.params.account_id;
  const account = await pool.query('SELECT * FROM [db table] WHERE [accountID == account_id]');

  const friends = account['friends'];

  // assumption that req.params inputs the needed info for a friend
  friends.push(req.params)
  account['friends'] = friends;
  try {
      //db INSERT query
      const commentPost = await pool.query(
        'INSERT INTO ___ (account) VALUES( {account} ) RETURNING *'
    );
    res.json({
      "status": 200
  }) 

  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});



// Like or remove like from post
app.patch('/media', async (req, res) => {
  try {
      //db INSERT or UPDATE query?
      const request = 
      {
          "media_id": 6734,
          "account_id": 1234,
          "didLike": true //Not entirely sure about this one
      }
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
});

// Delete an account
app.delete('/accounts/:account_id', async (req, res) => {
  try {
      //db DELETE query
      res.json({
          "status": 200,
      });
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
})

// Delete a post
app.delete('/accounts/:account_id/:media_id', async (req, res) => {
  try {
      //db DELETE query
      res.json({
          "status": 200,
      });
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
})

// Delete a comment
app.delete('/media/:media_id/comments/:commentId', async (req, res) => {
  try {
      //db DELETE query
      res.json({
          "status": 200,
      });
  } catch (err) {
      res.json({
          "status": err.status,
          "message": err.message
      })
      console.error(err);
  }
})



app.listen(8080, () => {
  console.log("Server started on port 8080");
});


export default app;

// GET /accounts/:accountID return that particular account's information

// GET /accounts/:accountID/friends >>>>>>

// GET /feed/:accountID return that particularr account's feed

// POST /media upload file to the server
