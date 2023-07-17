import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useForm } from '@formiz/core';
import { isMaxLength, isMinLength, isNumber } from '@formiz/validations';

import { FieldDayPicker } from '@/components/FieldDayPicker';
import { FieldInput } from '@/components/FieldInput';
import { FieldSelect } from '@/components/FieldSelect';
import { FieldTextarea } from '@/components/FieldTextarea';

const AVAILABLE_LANGUAGES = [
  {
    key: 'Francais',
  },
  {
    key: 'Anglais',
  },

  {
    key: 'Arabe',
  },
];
const MovieForm = () => {
  const form = useForm();
  return (
    <Stack spacing={4}>
      <FieldInput
        name="name"
        label={'name'}
        required={'le nom est obligatoire '}
        validations={[
          {
            handler: isMinLength(2),
            message: 'la longeur minimale de nom doit etre 2',
          },
          {
            handler: isMaxLength(50),
            message: 'la longeur minimale de nom doit etre 50',
          },
        ]}
      />
      <FieldTextarea
        name="description"
        label={'description'}
        required={'la description est obligatoire '}
      />
      <FieldSelect
        name="language"
        label={'language'}
        options={AVAILABLE_LANGUAGES.map(({ key }) => ({
          label: key,
          value: key,
        }))}
        defaultValue={'Francais'}
      />

      <FieldInput
        name="imageUrl"
        label={'imageUrl'}
        helper={'inserer url de image'}
      />
      <FieldInput
        name="duration"
        label={'duration'}
        helper={'la durée en seconde '}
        validations={[
          {
            handler: isNumber(),
            message: 'la durée doit etre un nombre ',
          },
        ]}
      />
      <FieldDayPicker
        name="publishDate"
        label="publishDate"
        placeholder="Select a date..."
        required="Date is required"
      />
    </Stack>
  );
};

export default MovieForm;
