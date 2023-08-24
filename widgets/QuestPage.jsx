const listPage = () => {
    const ownerId = "nearhorizon.near";
    const entity = props.entity ?? "projects";
    const renderItem = props.renderItem ?? ((item) => JSON.stringify(item));
    const title = props.title ?? "Projects";
  };
  
  return (
    <Widget
      src={`darunrs.near/widget/QuestListPage`}
      props={{
        descriptor: "projects",
        title: "Quests",
        urlProps: props.urlProps,
        entity: "projects",
        filters: [
          "vertical",
          "readiness",
          "size",
          "integration",
          "dev",
          "stage",
          "distribution",
        ],
        renderItem: (accountId) => (
          <Widget
            src={`darunrs.near/widget/QuestCard`}
            props={{
              accountId,
              large: true,
            }}
          />
        ),
      }}
    />
  );
  