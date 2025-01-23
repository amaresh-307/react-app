import MDSnackbar from "components/MDSnackbar";
// eslint-disable-next-line react/prop-types
function Notification({ color, icon, title, content, open, onClose }) {
  return (
    <MDSnackbar
      color={color}
      icon={icon}
      title={title}
      content={content}
      dateTime=""
      open={open}
      onClose={() => onClose()}
      close={() => onClose()}
    />
  );
}
export default Notification;
