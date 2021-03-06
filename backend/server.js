const  express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

const employeesRoute = require('./routes/employeesRouter')
const departmentRoute = require('./routes/departmentRouter')

// Connect to DB
mongoose.connect(`mongodb://localhost/schneider-task`)
 .then(() => console.log(`MongoDB connected…`))
 .catch(err => console.log(err))

const app = express()

app.use(cors())
app.use(express.json())
app.use('/employees', employeesRoute)
app.use('/departments', departmentRoute)

const port = 5000

app.listen(port, ()=> console.log(`server is listning on port: ${port}`))