import React from 'react';

import { Badge, HStack, Image, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { LuTimer } from 'react-icons/lu';
import { useParams } from 'react-router-dom';

import { Page, PageContent, PageTopBar } from '@/components/Page';

import { useMovie } from './service';

const PageMoviesDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useMovie(id);
  console.log(data);
  return (
    <Page>
      <PageTopBar showBack onBack={() => alert('Back')}>
        <HStack>
          <Text fontSize="20px" color="gray.900" as="b" textAlign={'center'}>
            {data.name}
          </Text>
          <HStack justifyContent={'center'}>
            <Badge colorScheme="blue">Science fiction</Badge>
            <Badge colorScheme="blue">Thriller</Badge>
          </HStack>
        </HStack>
      </PageTopBar>
      <PageContent>
        <Stack>
          <HStack>
            <Image
              src={
                'https://catimage.net/images/2023/07/07/The-Out-Laws-2023-Hindi-Dubbed-HDRip-Full-Movie-HDHub4u.jpg'
              }
              alt={data.name}
              borderRadius={'8px'}
            />
            <Stack>
              <HStack>
                <LuTimer />
                <Text fontSize="18px" color="gray.900">
                  5h:30
                </Text>
              </HStack>
              <Text fontSize="14px" color="gray.600">
                Directot
              </Text>
              <Text fontSize="18px" color="gray.900">
                Denis Villeneuve
              </Text>
              <Text fontSize="14px" color="gray.600">
                Authors
              </Text>
              <Text fontSize="18px" color="gray.900">
                Philip K. Dick, Hampton Fancher
              </Text>
              <Text fontSize="14px" color="gray.600">
                Actors
              </Text>
              <Text fontSize="18px" color="gray.900">
                Ryan Gosling, Harrison Ford, Ana de Armas
              </Text>
              <Text fontSize="14px" color="gray.600">
                Synopies
              </Text>
              <Text fontSize="18px" color="gray.900">
                {data.description}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </PageContent>
    </Page>
  );
};

export default PageMoviesDetails;
