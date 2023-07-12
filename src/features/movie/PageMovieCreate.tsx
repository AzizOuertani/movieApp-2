import React from 'react';

import { Button } from '@chakra-ui/react';
import { Formiz, useForm } from '@formiz/core';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  PageBottomBar,
  PageContent,
  PageTopBar,
} from '@/components/Page';
import { useToastSuccess } from '@/components/Toast';

import MovieForm from './MovieForm';
import { useMovieCreate } from './service';

const PageMovieCreate = () => {
  const navigate = useNavigate();
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
      console.log(values);
      createMovie.mutate(values);
    },
  });
  return (
    <Page containerSize="md" isFocusMode>
      <Formiz connect={form}>
        <form noValidate onSubmit={form.submit}>
          <PageTopBar showBack onBack={() => navigate('../')}>
            Create a new movie
          </PageTopBar>
          <PageContent>
            <MovieForm />
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
