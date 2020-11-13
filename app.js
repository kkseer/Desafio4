import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/index.js';
import { gradeRouter } from './routes/gradeRouter.js';
import { logger } from './config/logger.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Conectado ao banco de dados');
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);

    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'https://desafio4front.herokuapp.com',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.use(gradeRouter);

app.listen(process.env.PORT || 8081, () => {
  console.log(`SERVER RUNNING at ${process.env.PORT}`);
});
