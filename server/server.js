const app = require('./app');

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Server started successfully!!!',
  });
});

app.listen(PORT, () => {
  console.log(`Server Started started on PORT ${PORT}`);
});
