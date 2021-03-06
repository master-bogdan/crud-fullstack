import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardEditButton, CardDeleteButton } from '../Ui/Buttons';
import {
  Card,
  CardImg,
  CardDescr,
  CardTitle,
  Form,
  ImageFormField,
  TitleFormField,
  DescrFormField,
} from './styles';
import { UpdateCharacter, DeleteCharacter } from 'store/crud/crudActions';
// Types
import { UpdateFormData } from 'store/crud/crudTypes';

interface Props {
  id: string
  img: string
  title: string
  description: string
}

const Character: React.FC<Props> = ({
  id, img, title, description,
}) => {
  const [isEdit, setIsEdit] = useState <boolean>(false);
  const [values, setValue] = useState <UpdateFormData>({
    img,
    title,
    description,
  });

  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsEdit(!isEdit);
    dispatch(UpdateCharacter(id, values));
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const deleteChar = () => {
    dispatch(DeleteCharacter(id));
  };

  return (
    <>
      { isEdit
        ? (
          <Form onSubmit={onSubmit}>
            <CardImg src={img} />
            <ImageFormField
              name="image"
              value={values.img}
              onChange={handleChange}
            />
            <TitleFormField
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <DescrFormField
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            <CardEditButton
              type="submit"
            >
              Update
            </CardEditButton>
            <CardDeleteButton
              type="button"
              onClick={deleteChar}
            >
              Delete
            </CardDeleteButton>
          </Form>
        )
        : (
          <Card>
            <CardImg src={img} />
            <CardTitle>{title}</CardTitle>
            <CardDescr>{description}</CardDescr>
            <CardEditButton
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </CardEditButton>
          </Card>
        )}
    </>
  );
};

export default Character;
