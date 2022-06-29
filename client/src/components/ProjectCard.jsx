import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

const ProjectCard = ({project}) => {
  const [deleteProject] = useMutation(DELETE_CLIENT, {
    variables: { id: project.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteProject}}) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({ 
        query: GET_CLIENTS, 
        data: { 
          clients: clients.filter(project => project.id !== deleteProject.id)
        }
      });
    }
  });
  
  return (
    <div className="col-md-4"> 
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between aligned-items-center">
            <h5>{project.name}</h5>
            <Link className="btn btn-light" to={`/project/${project.id}`}>View</Link>
          </div>
          <p className="small">Status: {project.status}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard