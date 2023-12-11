import "./memberList.css";

export const MemberList = ({ users,title,handleAsignMember,values }) => {

const {contributors}=values

const avalibleMembers = users && users.filter((user) => {
    const isAssigned = contributors.some((member) => member._id === user._id);
    return !isAssigned;
  });
  

  return (
    <div className="member-list">
        <div className="member-list__title">
        <span >{title}</span>
        </div>
 
      {users &&
        avalibleMembers.map((user) => {
          return (
            <div className="member-item">
              <div className="member-item__avatar">
                <img src={user?.userAvatar.url} alt="" />
              </div>
              <div className="member-item__details">
                <span>{`${user?.name} ${user?.surname}`}</span>
                <span>{user?.role}</span>
              </div>
              <div className="member-item-action">
                <button onClick={(e)=>handleAsignMember(user)}>Asign</button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
