import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_ONE_PROJECT } from '../queries/projectQueries';
import { EDIT_PROJECT } from '../mutations/projectMutations';


const EditProject = ({project}) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState('');

  const [updateProject] = useMutation(EDIT_PROJECT, { 
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_ONE_PROJECT, variables: { id: project.id} }],
  });

  const handleSubmit = e => {
    e.preventDefault();
    if(!name || !description|| !status) {
      return alert('Please fill in all fields');
    }
    updateProject(name, description, status);
    setName('');
    setDescription('');
    setStatus('');
  }

  return (
    <div className="mt-5">
      <h3 className="mt">Update Project Details</h3>
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
        <button type="submit" className="btn btn-primary" style={{float: 'right'}} >
          Submit
        </button>
      </form>
    </div>
  )
}

export default EditProject