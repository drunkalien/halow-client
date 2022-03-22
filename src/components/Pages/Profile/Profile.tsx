import cn from "classnames";

import classes from "./profile.module.scss";
import Form from "./_form";

const Profile = () => {
  return (
    <div className={cn(classes.container)}>
      <h1 className={cn(classes.heading)}>Profile</h1>
      <Form />
    </div>
  );
};

export default Profile;

