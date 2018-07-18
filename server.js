const express = require('express');
const app = express();
const port = process.env.PORT || 3200;
const morgan = require('morgan')
const bodyParser = require('body-parser');
const rss = require('./routes/rss');
const cors = require('cors');
const path = require('path')
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
//cors configuration

app.use(cors({origin:'http://localhost:4200'}))



// Use Routes
app.use('/api/rss', rss);
app.use(express.static(__dirname + '/dist'))

// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // app.use(express.static('client/build'));

    app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname + '/dist/index.html'))
    })

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    // });
// }

//server
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})