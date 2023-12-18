import { useParams } from "react-router-dom";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import "./projectDetailsPage.css";
import DownloadIcon from "@mui/icons-material/Download";
import { getProject } from "../../features/projectApi/projectApi";
import PublicIcon from "@mui/icons-material/Public";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarsIcon from "@mui/icons-material/Stars";
import { useQuery, useMutation } from "react-query";
import { Donut } from "../../components/donutChart/Donut";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { formatTimestampWithTime } from "../../utils/formatTimestamp";

export const ProjectDetailsPage = () => {
  const [page, setPage] = useState(1);
  const { projectId } = useParams();
  const { isLoading, data } = useQuery(["project"], () =>
    getProject({ projectId, page })
  );

  // const handleConcatTicketArrays = (data) => {
  //   if (data) {
  //     const concatenatedArray = [].concat(...Object.values(data));
  //     return concatenatedArray;
  //   }
  // };

  const { theme, dispatch } = useContext(ThemeContext);

  const handleChartDataTransform = (data) => {
    if (data) {
      const objectKeys = Object.keys(data).map((key) => {
        return { name: key, value: data[key] };
      });
      return objectKeys;
    }
  };

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
              <div className="content-section">{data?.description}</div>
              <div className="chart-section">
                <Donut
                  theme={theme}
                  data={handleChartDataTransform(data?.chartData)}
                />
              </div>
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
          <div className="lowerSection-left">
            <div className="lowerSection-left__header">
              <h4>Current Tickets</h4>
            </div>
            <div className="tickets-container">
              {data?.tickets?.map((ticket) => {
                return (
                  <div className="ticket-item">
                    <div className="ticket-item__title">
                      <span>{ticket.title}</span>
                    </div>
                    <div className="ticket-item__icons-wrapper">
                      <div className="ticket-item__type">
                        <span className={ticket.type}>{ticket.type}</span>
                      </div>

                      <div className="ticket-item__priority">
                        <span className={ticket.priority}>
                          {ticket.priority}
                        </span>
                      </div>
                      <div className="ticket-item__time">
                        <span>{formatTimestampWithTime(ticket.createdAt)}</span>
                      </div>
                      <div className="ticket-item__files-counter">
                        <AttachFileIcon />
                      </div>
                      <div className="ticket-item__post-counter">
                        <ChatBubbleIcon className="icon" />
                        <span> {ticket?.posts?.length}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="files-container">
              <div className="files-container__header">
                <h4>Attached Files</h4>
              </div>
              <table>
                {data?.files.map((file) => {
                  return (
                    <tr>
                      <td>
                        <div className="file-item">
                          <FolderZipIcon />
                        </div>
                      </td>
                      <td>
                        <div className="file-item">{file.original_name}</div>
                      </td>
                      <td>
                        <div className="file-item">{file.file_size}</div>
                      </td>

                      <td>
                        <div className="file-item">
                          <DownloadIcon className="download-icon" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
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
