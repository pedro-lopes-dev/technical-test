const UserProperty = (props) => (
  <>
    <strong>{`${props.name}: `}</strong>
    {props.value}
  </>
);

export default UserProperty;
