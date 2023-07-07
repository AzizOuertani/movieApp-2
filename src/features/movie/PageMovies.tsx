import React from 'react';

import {
  Badge,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Page, PageContent } from '@/components/Page';
import { Loader } from '@/layout/Loader';

import { useMovieList } from './service';

const PageMovies = () => {
  const { movies, isLoadingPage } = useMovieList();

  return (
    <Page containerSize="xl">
      <PageContent>
        {isLoadingPage && <Loader />}
        <Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={4}>
            {!isLoadingPage &&
              movies?.map((item) => (
                <Stack key={item.id}>
                  <Image
                    src={
                      'https://catimage.net/images/2023/07/07/The-Out-Laws-2023-Hindi-Dubbed-HDRip-Full-Movie-HDHub4u.jpg'
                    }
                    alt={item.name}
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
