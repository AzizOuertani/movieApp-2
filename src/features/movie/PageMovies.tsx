import React, { useState } from 'react';

import {
  Badge,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Page, PageContent } from '@/components/Page';
import { SearchInput } from '@/components/SearchInput';
import { Loader } from '@/layout/Loader';

import { useMovieList } from './service';

const PageMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams('');

  const { movies, isLoadingPage } = useMovieList({
    search: searchParams.get('search') ?? '',
  });
  const navigate = useNavigate();
  return (
    <Page containerSize="xl">
      <SearchInput
        onChange={(searchValue) => {
          setSearchParams({ search: searchValue ?? '' });
        }}
        value={searchParams.get('search') ?? ''}
      />
      <PageContent>
        {isLoadingPage && <Loader />}
        <Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={4}>
            {!isLoadingPage &&
              movies?.map((item) => (
                <Stack
                  key={item.id}
                  onClick={() => {
                    navigate(`${item.id}`);
                  }}
                >
                  <Image
                    src={
                      'https://catimage.net/images/2023/07/07/The-Out-Laws-2023-Hindi-Dubbed-HDRip-Full-Movie-HDHub4u.jpg'
                    }
                    alt={'item.name'}
                    borderRadius={'8px'}
                  />
                  <Text
                    fontSize="20px"
                    color="gray.900"
                    as="b"
                    textAlign={'center'}
                  >
                    {item.name}
                  </Text>
                  {/** je peut pas encore récupérer la liste de categorie probléme de back */}
                  <HStack justifyContent={'center'}>
                    <Badge colorScheme="blue">Science fiction</Badge>
                    <Badge colorScheme="blue">Thriller</Badge>
                  </HStack>
                </Stack>
              ))}
          </SimpleGrid>
        </Stack>
      </PageContent>
    </Page>
  );
};

export default PageMovies;
