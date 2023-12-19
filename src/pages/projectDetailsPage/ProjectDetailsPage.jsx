import { useParams } from "react-router-dom";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import ReportIcon from '@mui/icons-material/Report';
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import "./projectDetailsPage.css";
import FlagIcon from '@mui/icons-material/Flag';
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
import { formatUnitSize } from "../../utils/formatUnitSize";
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";

export const ProjectDetailsPage = () => {
  const [queryString, setQueryString] = useState({
    page: null,
    priority: "",
    type: "",
  });
  const { projectId } = useParams();
  const { isLoading, data, refetch } = useQuery(
    ["project"],
    () => getProject({ projectId, query: buildQueryString(queryString) }),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(isLoading);

  useEffect(() => {
    refetch();
  }, [queryString]);

  const buildQueryString = (queryObject) => {
    const queryParams = Object.entries(queryObject)
      .filter(([key, value]) => value !== "" && value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    return queryParams ? `${queryParams}` : "";
  };

  const generatePageNumbers = ({ totalTickets, ticketsPerPage }) => {
    const totalPages = Math.ceil(totalTickets / ticketsPerPage);

    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

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
              <div className="ticket-type-switches">
                <ul>
                  <li
                       className={`${queryString?.type===''?'active':''}`}
                       onClick={()=>setQueryString((prev)=>{
                        return ({...prev,type:''})
                      })}
                  ><FlagIcon/>ALL</li>
                  <li onClick={()=>setQueryString((prev)=>{
                    return ({...prev,type:'Bug'})
                  })}
                  className={`${queryString?.type==='Bug'?'active':''}`}
                  ><ReportIcon/>BUGS</li>
                  <li 
                    className={`${queryString?.type==='Enhancement'?'active':''}`}
                    onClick={()=>setQueryString((prev)=>{
                      return ({...prev,type:'Enhancement'})
                    })}
                  ><AutoFixNormalIcon/>EHANCEMENTS</li>
                  <li
                       className={`${queryString?.type==='Question'?'active':''}`}
                       onClick={()=>setQueryString((prev)=>{
                        return ({...prev,type:'Question'})
                      })}
                  > <HelpCenterIcon/>QUESTIONS</li>
                </ul>
              </div>
            </div>
            <div
              className={`tickets-container ${
                isLoading ? "fade-out" : "fade-in"
              }`}
            >
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
              <div className="pagination-navbar">
                {/* <button onClick={() => handlePageChange(-1)}>Prev</button>
                <button onClick={() => handlePageChange(1)}>Next</button> */}
                {generatePageNumbers({
                  totalTickets: data?.totalTickets,
                  ticketsPerPage: data?.ticketsPerPage,
                }).map((page, index) => {
                  return (
                    <button
                      className={
                        index + 1 === queryString?.page
                          ? "active"
                          : "" || (index === 0 && queryString?.page === null)
                          ? "disabled"
                          : ""
                      }
                      disabled={
                        (index + 1 === 1 && queryString?.page === null) ||
                        index + 1 === queryString?.page
                      }
                      onClick={() =>
                        setQueryString((prev) => ({ ...prev, page: index + 1 }))
                      }
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="files-container">
              <div className="files-container__header">
                <h4>Attached Files</h4>
              </div>
              <table>
                <tr className="header-row">
                  <td>
                    <div className="file-item">NAME</div>
                  </td>
                  <td>
                    <div className="file-item">
                      <span>SIZE</span>
                    </div>
                  </td>
                  <td>
                    <div className="file-item">
                      <span>DATE</span>
                    </div>
                  </td>
                  <td>
                    <div className="file-item">
                      <span>ACTION</span>
                    </div>
                  </td>
                </tr>

                {data?.files.map((file) => {
                  return (
                    <tr>
                      <td>
                        <div className="file-item">
                          <FolderZipIcon />
                          {file.original_name}
                        </div>
                      </td>

                      <td>
                        <div className="file-item">
                          {formatUnitSize(file.file_size)}
                        </div>
                      </td>
                      <td>
                        <div className="file-item">
                          <span>{formatTimestampWithTime(file.createdAt)}</span>
                        </div>
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
