import { useParams } from "react-router-dom";
import "./projectDetailsPage.css";
import { getProject } from "../../features/projectApi/projectApi";
import { useQuery, useMutation } from "react-query";

export const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const { isLoading, data } = useQuery(["project"], () =>
    getProject(projectId)
  );

  console.log(data && data);

  return (
    <div className="ProjectDetailsPage">
      <div className="ProjectDetailsPage-top">
        <div className="ProjectDetailsPage-top__header">
          <h2>{data?.title}</h2>
          <div className="ProjectDetailsPage-top__header-action">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
      <div className="ProjectDetailsPage-bottom">
        <div className="ProjectDetailsPage-bottom-upperSection">
          <div className="upperSection-left">
            <div className="left">
      
            </div>
            <div className="right">CDE</div>
          </div>
          <div className="upperSection-right">
            <div>
            <table>
                <tbody>
                  <tr>
                    <td>Status:</td>
                    <td>Ongoing...</td>
                  </tr>
                  <tr>
                    <td>Started:</td>
                    <td>{data?.createdAt}</td>
                  </tr>
                  <tr>
                    <td>Deadline:</td>
                    <td>02/02/2025</td>
                  </tr>
               
                  <tr>
                    <td>Leader:</td>
                    <td>{data?.projectLeader?.name}</td>
                    <td>{data?.projectLeader?.surname}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="ProjectDetailsPage-bottom-lowerSection">
          <div className="lowerSection-left"></div>
          <div className="lowerSection-right">
            {data &&
              data?.contributors.map((contributor) => {
                return (
                  <div className="projectDetails-contributor-tile">
                    <div className="contributor-tile__img">
                      <img src={contributor.userAvatar.url} alt="" />
                    </div>
                    <div className="projectDetails-contributor-tile__details">
                      <span>{contributor.name}</span>
                      <span>{contributor.surname}</span>
                    </div>
                    <div className="projectDetails-contributor-tile__role">
                      <span>{contributor.role}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
