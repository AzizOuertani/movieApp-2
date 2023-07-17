import React, { useState } from 'react';

import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useNavigate } from 'react-router-dom';

import { FieldInput } from '@/components/FieldInput';
import { FieldMultiSelect } from '@/components/FieldMultiSelect';
import { FieldSelect } from '@/components/FieldSelect';
import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { useToastSuccess } from '@/components/Toast';
import { useRepeater } from '@/hooks/useRepeater';

import { useCategorieList } from '../categories/service';
import { useStaffList } from '../staffMembres/service';
import MovieForm from './MovieForm';
import { useMovieCreate } from './service';

const INITIAL_VALUES = {
  newCategorie: [{}, {}],
  newStafFMembre: [{}, {}],
};
const AVAILABLE_LANGUAGES = [
  {
    key: 'Director',
  },
  {
    key: 'Author',
  },

  {
    key: 'Actor',
  },
];
const PageMovieCreate = () => {
  const navigate = useNavigate();
  const [newCategories, setnewCategories] = useState(false);
  const [newStaff, setnewStaff] = useState(false);
  const { Staff } = useStaffList();
  const { Categories } = useCategorieList();

  const toastSuccess = useToastSuccess();
  const createMovie = useMovieCreate({
    onSuccess: () => {
      toastSuccess({
        title: 'movies created successfully',
      });
      navigate('../');
    },
  });

  const form = useForm({
    onValidSubmit: (values) => {
      values.categories = [
        ...values.existingCategories,
        ...values.newCategories,
      ];

      values.membreStaffs = [...values.membreStaffs, ...values.existingStaff];

      createMovie.mutate(values);
    },
  });
  const categories = useRepeater({
    name: 'newCategories',
    form,
    initialValues: !newCategories ? INITIAL_VALUES.newCategorie : [],
  });
  const staffMembres = useRepeater({
    name: 'membreStaffs',
    form,
    initialValues: !newStaff ? INITIAL_VALUES.newStafFMembre : [],
  });
  return (
    <Page containerSize="md" isFocusMode>
      <Formiz connect={form}>
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => navigate('../')}>
            Create a new movie
          </PageTopBar>
          <PageContent>
            <Card>
              <CardBody>
                <MovieForm />
                <Box>
                  <FieldMultiSelect
                    name="existingCategories"
                    label="Categorie"
                    options={Categories}
                  />
                  <HStack paddingTop={'3'} justifyContent={'space-between'}>
                    <Text> New Categrie</Text>
                    <Box>
                      <IconButton
                        aria-label="Add"
                        icon={<AddIcon />}
                        size="sm"
                        onClick={() => setnewCategories(!newCategories)}
                      />
                    </Box>
                  </HStack>
                  {newCategories && (
                    <>
                      {categories.keys.map((key, index) => (
                        <Stack
                          key={key}
                          direction="row"
                          spacing="4"
                          mb="6"
                          data-test={`repeater-item[${index}]`}
                        >
                          <Box transform="translateY(4rem)">
                            <IconButton
                              aria-label="Add"
                              icon={<AddIcon />}
                              size="sm"
                              onClick={() => categories.insert(index + 1)}
                              variant="ghost"
                              isDisabled={categories.length > 20}
                              pointerEvents={
                                index + 1 >= categories.length
                                  ? 'none'
                                  : undefined
                              }
                              opacity={
                                index + 1 >= categories.length ? 0 : undefined
                              }
                            />
                          </Box>
                          <Box flex="1">
                            <FieldInput
                              name={`newCategories[${index}].name`}
                              label="categorie Name"
                              required="Required"
                              m="0"
                            />
                          </Box>
                          <Box flex="1">
                            <FieldInput
                              name={`newCategories[${index}].description`}
                              label="description"
                              m="0"
                            />
                          </Box>
                          <Box pt="1.75rem">
                            <IconButton
                              aria-label="Delete"
                              icon={<DeleteIcon />}
                              onClick={() => categories.remove(index)}
                              variant="ghost"
                            />
                          </Box>
                        </Stack>
                      ))}
                    </>
                  )}
                </Box>
                <Box>
                  <FieldMultiSelect
                    name="existingStaff"
                    label="Staff"
                    options={Staff}
                  />
                  <HStack paddingTop={'3'} justifyContent={'space-between'}>
                    <Text> New Staff</Text>
                    <Box>
                      <IconButton
                        aria-label="Add"
                        icon={<AddIcon />}
                        size="sm"
                        onClick={() => setnewStaff(!newStaff)}
                      />
                    </Box>
                  </HStack>
                  {staffMembres.keys.map((key, index) => (
                    <Stack
                      key={key}
                      direction="row"
                      spacing="4"
                      mb="6"
                      data-test={`repeater-item[${index}]`}
                    >
                      <Box transform="translateY(4rem)">
                        <IconButton
                          aria-label="Add"
                          icon={<AddIcon />}
                          size="sm"
                          onClick={() => staffMembres.insert(index + 1)}
                          variant="ghost"
                          isDisabled={staffMembres.length > 20}
                          pointerEvents={
                            index + 1 >= staffMembres.length
                              ? 'none'
                              : undefined
                          }
                          opacity={
                            index + 1 >= staffMembres.length ? 0 : undefined
                          }
                        />
                      </Box>
                      <Box flex="1">
                        <FieldInput
                          name={`membreStaffs[${index}].firstName`}
                          label="membreStaffs firstName"
                          required="Required"
                          m="0"
                        />
                        <FieldInput
                          name={`membreStaffs[${index}].lastName`}
                          label="membreStaffs lastName"
                          required="Required"
                          m="0"
                        />
                      </Box>
                      <Box flex="1">
                        <FieldSelect
                          name={`membreStaffs[${index}].role`}
                          label={'staff Membre'}
                          options={AVAILABLE_LANGUAGES.map(({ key }) => ({
                            label: key,
                            value: key,
                          }))}
                          defaultValue={'Director'}
                          m="0"
                        />
                      </Box>
                      <Box pt="1.75rem">
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          onClick={() => staffMembres.remove(index)}
                          variant="ghost"
                        />
                      </Box>
                    </Stack>
                  ))}
                </Box>
              </CardBody>
            </Card>
          </PageContent>
          <PageBottomBar justifyContent="space-between">
            <Button onClick={() => navigate('../')}>cancel</Button>
            <Button
              type="submit"
              variant="@primary"
              isLoading={createMovie.isLoading}
            >
              save
            </Button>
          </PageBottomBar>
        </form>
      </Formiz>
    </Page>
  );
};

export default PageMovieCreate;
