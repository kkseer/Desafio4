import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Student = db.student;

// ok
const create = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

//ok
const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const grade = await Student.find(condition);
    res.send(grade);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

//ok
const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const one = await Student.findById(id);
    if (one.length < 1) {
      res.status(404).send({ message: `Grade do id ${id} nao encontrado` });
    } else {
      res.send(data);
    }

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

//ok
const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const one = await Student.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (one.length < 1) {
      res
        .status(404)
        .send({ message: `Grade do id ${id} nao encontrado para atualizar` });
    } else {
      res.send({ message: 'Grade atualizado com sucesso' });
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

//ok
const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const removeone = await Student.findByIdAndRemove(id);
    if (!removeone) {
      res.status(404).send('Documento nao encontrado na colecao');
    } else {
      res.send(200).send();
    }
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};
//ok
const removeAll = async (req, res) => {
  try {
    const all = Student.deleteMany({});
    logger.info(`DELETE /grade`);
    if (data.length < 1) {
      res.status(404).send({ message: `Nao existe grade para exclusao` });
    } else {
      res.send({
        message: `Grades excluidos`,
      });
    }
    res.status(200);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
