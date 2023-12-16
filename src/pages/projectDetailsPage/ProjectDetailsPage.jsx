import { useParams } from "react-router-dom";
import "./projectDetailsPage.css";
import { getProject } from "../../features/projectApi/projectApi";
import PublicIcon from "@mui/icons-material/Public";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarsIcon from "@mui/icons-material/Stars";
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
            <div className="upperSection-left__header">
              <h2>Project Overiew</h2>
            </div>
            <div className="upperSection-left__content">
              {data?.description}
            </div>
          </div>
          <div className="upperSection-right">
            <div>
              <h3>Project Details</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="status-container">
                        <BrowseGalleryIcon className="icon" />
                        Ongoing
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="visibility-container">
                        <PublicIcon className="icon" />
                        Public
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="contributors-container">
                        <PeopleAltIcon className="icon" />
                        Contributors:{data?.contributors.length}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="started-container">
                        <CalendarMonthIcon className="icon" />
                        Started: {data?.createdAt}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <div className="leader-container">
                        <StarsIcon className="icon" />
                        Leader: {data?.projectLeader?.name}{" "}
                        {data?.projectLeader?.surname}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="ProjectDetailsPage-bottom-lowerSection">
          <div className="lowerSection-left"></div>
          <div className="lowerSection-right">
            <div className="header">
              <h3>Contributors</h3>
            </div>
            <div className="content">
              {data &&
                data?.contributors.map((contributor) => {
                  return (
                    <div className="projectDetails-contributor-tile">
                      <img src={contributor.userAvatar.url} alt="" />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
