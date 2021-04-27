/*
*graphQLClient
*Declaración del cliente de apollo con headers.
*/
import { useQuery } from 'react-query';
import { GraphQLClient, request } from 'graphql-request';

export const GQLQuery = (key, query, variables, config = {}) => {
  const endpoint = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
  const headers = {
    headers: {
      authorization: `Bearer token goes here`
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query, variables);
  
  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};
