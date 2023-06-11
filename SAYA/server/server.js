const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "138.128.247.85",
    password: "Saya2023team13",
    database: "sys"
})

app.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
        console.log(err);
    })
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT id, email, password FROM test_users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
        if(err){
            res.send({err: err})
        }
        //if login credentials match, sends the result and logs in user
        if (result.length > 0) {
            res.send(result)
        } else{
            res.send({message: "Wrong email/password"})
        }
    })
});

app.post("/settings", (req, res) => {
    const { userId, code, phone, account_name, invoice, first_name, last, password } = req.body;

    db.query(
    "UPDATE test_users SET country_code = ?, phone_number = ?, account_name = ?, invoice_name_prefix = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?",
    [code, phone, account_name, invoice, first_name, last, password, userId],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "An error occurred while updating the user." });
      } else {
        res.status(200).send({ message: "User updated successfully." });
      }
    }
  );
});

const getUserDataFromDatabase = (userId) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM test_users WHERE id = ?", [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };

  app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const userData = await getUserDataFromDatabase(userId);
  
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: "An error occurred while fetching user data." });
    }
  });

  app.get("/notifications", (req, res) => {
    const myQuery = "select * from notifications";
  
    db.query(myQuery, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json(
            result,
          );
      }
    });
  });
  app.get("/hardware", (req, res) => {
    const myQuery = "SELECT t.tenant, t.meter_number, t.meter_type tenant_meter_type, l.id, landlord_id, l.owner_name landlord_name, l.meter_type landlord_meter_type " +
      "FROM tenants t RIGHT JOIN landlords l ON t.landlord_id = l.id";
  
    db.query(myQuery, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json(result);
      }
    });
  });

app.post('/create',(req,res) =>{
  const tenant = req.body.tenant
  const unit = req.body.unit
  const meter_number = req.body.meter_number
  const email = req.body.email

  db.query('INSERT INTO tenants (tenant, unit, meter_number, email) VALUES(?,?,?,?)',
  [tenant,unit,meter_number,email], 
  (err,result) =>{
      if (err){
          console.log(err)
      }else{
          res.send("Values inserted correctly")
      }
  });

});

app.get('/tenants', (req, res) =>{
  db.query("SELECT * FROM tenants", (err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      };
  });
})

app.get("/billing", (req, res) => {
  // Editable Query
  const myQuery = "SELECT * FROM charges WHERE id = 1";
  const id = req.body.id;

  db.query(myQuery, [id], (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result);
    }
  });
});

app.post('/createNoti', (req, res) => {
  const notificationType = req.body.notification_type;
  const unitNumber = req.body.unit_number;
  const meterNumber = req.body.meter_number;
  const message = req.body.message;
  const time = req.body.notification_local_time;

  const query = `
    INSERT INTO notifications (notification_type, unit_number, meter_number, message, notification_local_time)
    VALUES (?, ?, ?, ?, ?);
  `;

  db.query(query, [notificationType, unitNumber, meterNumber, message, time], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ message: 'Error creating notification.' });
    } else {
      res.send({ message: 'Notification created successfully.' });
    }
  });
});
  
  


app.listen(3001, () => {console.log("Server started on port 3001")})
