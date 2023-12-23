import { useParams } from "react-router-dom";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import EmailIcon from "@mui/icons-material/Email";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReportIcon from "@mui/icons-material/Report";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import "./projectDetailsPage.css";
import FlagIcon from "@mui/icons-material/Flag";
import DownloadIcon from "@mui/icons-material/Download";
import { getProject } from "../../features/projectApi/projectApi";
import PublicIcon from "@mui/icons-material/Public";
import BrowseGalleryIcon from "@mui/icons-material/BrowseGallery";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Tooltip } from "react-tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StarsIcon from "@mui/icons-material/Stars";
import { useQuery, useMutation } from "react-query";
import { Donut } from "../../components/donutChart/Donut";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { formatTimestampWithTime } from "../../utils/formatTimestamp";
import { formatUnitSize } from "../../utils/formatUnitSize";
import { PaginationNavbar } from "../../components/PaginationNavBar/PaginationNavbar";
import { chartConfig } from "../../utils/chartConfig";
import { HeatMapChart } from "../../components/heatMapChart/HeatMapChart";

export const ProjectDetailsPage = () => {
  const { theme, dispatch } = useContext(ThemeContext);
  const donutChartConfig = chartConfig("donut-dashboard", theme);
  const [queryString, setQueryString] = useState({
    page: null,
    priority: "",
    type: "",
  });
  const [selectedContributor, setSelectedContributor] = useState("");

  const { projectId } = useParams();
  const { isLoading, data, refetch } = useQuery(
    ["project"],
    () => getProject({ projectId, query: buildQueryString(queryString) }),
    {
      refetchOnWindowFocus: false,
    }
  );

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

  const handleChartDataTransform = (data) => {
    if (data) {
      const objectKeys = Object.keys(data).map((key) => {
        return { name: key, value: data[key] };
      });
      return objectKeys;
    }
  };
  console.log(selectedContributor);
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
            <div className="upperSection-left__content">
              <div className="content-section">
                <div className="content-section__top">
                  <div className="top-section__item">
                    <BrowseGalleryIcon className="icon" />

                    <span className="value">Ongoing</span>
                    <span className="label">Status</span>
                  </div>
                  <div className="top-section__item">
                    {" "}
                    <PublicIcon className="icon" />
                    <span className="value">Public</span>
                    <span className="label">Access</span>
                  </div>
                  <div className="top-section__item">
                    <CalendarMonthIcon className="icon" />

                    <span className="value">
                      {data?.createdAt.slice(0, 10)}:
                    </span>
                    <span className="label">Started</span>
                  </div>
                  <div className="top-section__item">
                    <PeopleAltIcon className="icon" />
                    <span className="value">{data?.contributors.length}</span>
                    <span className="label">Contributors</span>
                  </div>{" "}
                  <div className="top-section__item">
                    <FlagCircleIcon className="icon" />

                    <span className="value">{data?.totalTickets}</span>
                    <span className="label">Tickets</span>
                  </div>
                </div>
                <div className="content-section__bottom">
                  <div className="chart-section">
                    <div className="contirbutor-section">
                      <select
                        onChange={(e) => setSelectedContributor(e.target.value)}
                        name=""
                        id=""
                      >
                        {data?.contributors.map((contributor) => {
                          return (
                            <option
                              key={contributor.id}
                              value={contributor.id}
                            >{`${contributor.name} ${contributor.surname}`}</option>
                          );
                        })}
                      </select>
                      <div className="selectedContributor">
                      {data?.contributors
    .filter((contributor) => contributor.id === selectedContributor)
    .map((selectedContributor) => (
      <img
        key={selectedContributor.id}
        src={selectedContributor.userAvatar.url}
        alt={`${selectedContributor.name} ${selectedContributor.surname}`}
      />
    ))}
                      </div>
                    </div>
                    <div className="heatmap">
                      <HeatMapChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="upperSection-right">
            <div className="leader-section">
              <div className="upperSection-right__header">
                <h3>Project Leader</h3>
              </div>
              <div className="upperSection-right__content">
                <div className="content-top">
                  <div className="leader-avatar">
                    <img
                      src={`${data?.projectLeader?.userAvatar?.url}`}
                      alt=""
                    />
                  </div>
                  <div className="leader-name">
                    <span>{data?.projectLeader?.name}</span>
                    <span>{data?.projectLeader?.surname}</span>
                  </div>
                </div>
                <div className="content-bottom">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className="status-container">
                            <HelpOutlineIcon className="icon" />
                            Status:Online
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="visibility-container">
                            <EmailIcon className="icon" />
                            Email:
                            {data?.projectLeader?.email}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="contributors-container">
                            <SensorOccupiedIcon className="icon" />
                            Role:{data?.projectLeader?.role}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="contributors-section">
              <div className="header">Contributors</div>
              <div className="content">
                {data &&
                  data?.contributors.map((contributor) => {
                    return (
                      <div
                        id="contributor"
                        className="projectDetails-contributor-tile"
                      >
                        <img
                          className="contributor-avatar"
                          src={contributor.userAvatar.url}
                          alt=""
                          data-tooltip-html={data?.contributors
                            .map((member) => `${member.name} ${member.surname}`)
                            .join("<br/>")}
                          data-tooltip-variant="info"
                          data-tooltip-place="right"
                          place={"bottom-end"}
                          opacity={1}
                          data-tooltip-float={true}
                        />
                      </div>
                    );
                  })}
                <Tooltip
                  anchorSelect="contributor-avatar"
                  place="bottom"
                  type="dark"
                  effect="solid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ProjectDetailsPage-bottom-lowerSection">
          <div className="lowerSection-left">
            <div className="description__content">
              <h4>Project overview</h4>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                consequat, odio at consequat hendrerit, felis neque tincidunt
                arcu, a efficitur turpis justo id nulla. Proin id laoreet nisi,
                in volutpat libero. Vivamus vulputate, tortor in dignissim
                luctus, ipsum ligula faucibus ligula, eu egestas risus lectus id
                ligula. Suspendisse potenti. Suspendisse potenti. Fusce commodo
                libero eu purus scelerisque, ut aliquam nunc volutpat. Ut ut leo
                vel orci convallis bibendum. Integer malesuada, ex vel varius
                fermentum, sem mi commodo ex, vel blandit elit arcu vel tellus.
                Proin nec sollicitudin neque. Integer aliquam imperdiet turpis,
                non pellentesque est. Integer quis imperdiet ex. Integer non
                rhoncus quam. Aenean vel felis sed risus rhoncus feugiat. Fusce
                eget metus ut urna malesuada congue.
              </span>
            </div>
            <div className="lowerSection-left__header">
              <h4>Current Tickets</h4>
              <div className="ticket-type-switches">
                <ul>
                  <li
                    className={`${queryString?.type === "" ? "active" : ""}`}
                    onClick={() =>
                      setQueryString((prev) => {
                        return { ...prev, type: "" };
                      })
                    }
                  >
                    <FlagIcon />
                    ALL
                  </li>
                  <li
                    onClick={() =>
                      setQueryString((prev) => {
                        return { ...prev, type: "Bug", page: 1 };
                      })
                    }
                    className={`${queryString?.type === "Bug" ? "active" : ""}`}
                  >
                    <ReportIcon />
                    BUGS
                  </li>
                  <li
                    className={`${
                      queryString?.type === "Enhancement" ? "active" : ""
                    }`}
                    onClick={() =>
                      setQueryString((prev) => {
                        return { ...prev, type: "Enhancement", page: 1 };
                      })
                    }
                  >
                    <AutoFixNormalIcon />
                    EHANCEMENTS
                  </li>
                  <li
                    className={`${
                      queryString?.type === "Question" ? "active" : ""
                    }`}
                    onClick={() =>
                      setQueryString((prev) => {
                        return { ...prev, type: "Question", page: 1 };
                      })
                    }
                  >
                    {" "}
                    <HelpCenterIcon />
                    QUESTIONS
                  </li>
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
            <div className="chart-section__bottom">
              <div className="header">
                <span>{`${
                  queryString?.type === "" ? "Total" : queryString?.type
                }`}</span>
              </div>

              <Donut
                        theme={theme}
                        data={handleChartDataTransform(data?.chartData)}
                      />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
