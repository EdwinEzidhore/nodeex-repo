const express = require('express');
const app = express();
const { users } = require("./user");
const details = require('./auth')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/users">Users</a>')
    
});

app.post('/login', (req, res,next) => {// a sample post method with a sample data .
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success:false,msg:"Please provide a name"
        })      
    }
    else {
        res.status(201).send(`success,Welcome ${name}`)
    }

   
})
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const {name}=req.body
    const userss=[...users]
    const filteredperson = userss.find((person) => {
       return person.id === Number(id)
       
    })
    if (!filteredperson) 
    {
      return  res.status(404).json({ success: false, msg:`users with id ${id} not found`})
    }
    filteredperson.name = name;
   
    
    res.status(201).json({success:true,msg:userss})
 
    
  
})

app.get("/api/users", (req, res) => {
  
    const newuser = users.map((user) => {
        const { id, name } = user
        return {
            id,name
        }
    })
    res.json(newuser)
})

app.get("/api/users/:UserId", (req, res) => {
    const {UserId}=req.params
    const singleuser = users.find((user) => user.id === Number(UserId))
    res.json(singleuser)
   
})
app.get("/query", (req, res) => {

    const { name ,limit} = req.query
    let Alldata = [...users]
    if (name) {
        Alldata = Alldata.filter((user) => {
            return user.name.startsWith(name.toLocaleUpperCase())
        })
    }
    if (limit) {
        Alldata=Alldata.slice(0,Number(limit))
    }

    res.status(200).json(Alldata)
})


app.all("*", (req, res) => {
    res.status(404).send('page not found')
})

try {
    app.listen(8000, () => {
        console.log("Server is running on port number 8000");
    });
}
catch (err) {
    console.log(err);
} 