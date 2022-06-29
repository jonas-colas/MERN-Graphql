import Header from './components/Header';
import Clients from './components/Clients';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import AddClient from './components/AddClient';

const cache = new InMemoryCache({
  typePolicies: {
    Query: { 
      fields: {
        clients:{
          merge(existing, incoming){
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming){
            return incoming;
          }
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_URI,
  // cache: cache //new InMemoryCache(),
  cache
});

function App() {


  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="container">
        <AddClient />
        <Clients />
      </div>
    </ApolloProvider>
  );
}

export default App;
