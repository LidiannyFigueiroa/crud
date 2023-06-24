import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.tipo.value = onEdit.tipo;
      user.marca.value = onEdit.marca;
      user.tamanho.value = onEdit.tamanho;
      user.valor.value = onEdit.valor;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.tipo.value ||
      !user.marca.value ||
      !user.tamanho.value ||
      !user.valor.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          tipo: user.tipo.value,
          marca: user.marca.value,
          tamanho: user.tamanho.value,
          valor: user.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          tipo: user.tipo.value,
          marca: user.marca.value,
          tamanho: user.tamanho.value,
          valor: user.valor.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.tipo.value = "";
    user.marca.value = "";
    user.tamanho.value = "";
    user.valor.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Tipo</Label>
        <Input name="tipo" />
      </InputArea>
      <InputArea>
        <Label>Marca</Label>
        <Input name="marca" type="text" />
      </InputArea>
      <InputArea>
        <Label>Tamanho</Label>
        <Input name="tamanho" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input name="valor" type="number" step="0.01" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
