import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

const AddClient = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('new');
  const [clientId, setClientId] = useState('');

  const [addProject] = useMutation(ADD_PROJECT, { 
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }){
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({ 
        query: GET_PROJECTS, 
        // data: { projects: projects.concat([addProject]) },
        data: { projects: [...projects, addProject]},
      });
    }
  });

  //Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const handleSubmit = e => {
    e.preventDefault();
    if(name === '' || description === '' || status === '' || clientId === '') {
      return alert('Please fill in all fields');
    }
    addProject(name, description, status, clientId);
    setName('');
    setDescription('');
    setStatus('new');
    setClientId('');
  }

  if(loading) return <Spinner />;
  if(error) return `Something went wrong`;

  return (
    <>
      {!loading && !error && 
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProject"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProject"
            aria-labelledby="addProjectLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectLabel">
                    Add Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control"
                        value={name} onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <input type="text" className="form-control"
                        value={description} onChange={e => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" value={status}
                        onChange={e => setStatus(e.target.value)} >
                        <option value={"new"}>Not Started</option>
                        <option value={"progress"}>In Progress</option>
                        <option value={"completed"}>Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select className="form-select" 
                        value={clientId} onChange={e => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {data.clients?.map(client => (
                          <option key={client.id} value={client.id}>{client.name}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{float: 'right'}} 
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      }
     
    </>
  );
};

export default AddClient;
