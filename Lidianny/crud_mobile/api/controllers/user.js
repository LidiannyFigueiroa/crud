import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM roupas";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO roupas(`tipo`, `marca`, `tamanho`, `valor`) VALUES(?)";

  const values = [
    req.body.tipo,
    req.body.marca,
    req.body.tamanho,
    req.body.valor,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Peça de roupa cadastrada com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE roupas SET `tipo` = ?, `marca` = ?, `tamanho` = ?, `valor` = ? WHERE `id` = ?";

  const values = [
    req.body.tipo,
    req.body.marca,
    req.body.tamanho,
    req.body.valor,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Peça de roupa atualizada com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM roupas WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Peça de roupa deletada com sucesso.");
  });
};