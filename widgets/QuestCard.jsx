const ownerId = "nearhorizon.near";
const accountId = props.accountId;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
  margin-bottom: 0.25em;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5em;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Requests = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5em;
`;

const body = (
  <Details>
    <Container>
      <a
        href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
      >
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: props.accountId, size: "64px" }}
        />
      </a>
      <Details>
        <a
          href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
        >
          <h1>Hello {props.accountId}</h1>
        </a>
      </Details>
    </Container>
  </Details>
);

const Footer = styled.a`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  gap: 0.5em;
  width: 100%;
  height: 2.5em;
  background: #fafafa;
  border: 1px solid #eceef0;
  border-radius: 50px;
  flex: none;
  order: 0;
  flex-grow: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 0.9em;
  line-height: 1em;
  text-align: center;
  color: #101828;
`;

const footer = (
  <Footer
    href={`/${ownerId}/widget/Index?tab=project&accountId=${accountId}`}
    onClick={() =>
      props.update({
        tab: "project",
        content: "",
        search: "",
        accountId,
      })
    }
  >
    View details
  </Footer>
);

if (large) {
  return <Widget src={`${ownerId}/widget/Card`} props={{ body, footer }} />;
}

return <Widget src={`${ownerId}/widget/Card`} props={{ body }} />;
