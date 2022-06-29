import { gql } from '@apollo/client';

export const ADD_CLIENT = gql`
  mutation addClient($id: ID!, $name: String!, $email: String!, $phone: String!) {
    addClient(name, email, phone){
      id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id){
      id
      name
      email
      phone
    }
  }
`;