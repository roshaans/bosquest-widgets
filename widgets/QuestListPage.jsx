const ownerId = "nearhorizon.near";
const urlProps = props.urlProps ?? {};
const entity = props.entity ?? "projects";
const filters = props.filters ?? [];
const renderItem = props.renderItem ?? ((item) => JSON.stringify(item));
const title = props.title ?? "Projects";

const getFilters = () => {
  if (urlProps.sort) {
    Storage.set(`${entity}-sort`, urlProps.sort);
  }

  return filters.reduce(
    (acc, key) =>
      urlProps[key]
        ? Object.assign(acc, {
            [key]: new Set(urlProps[key].split(",")),
          })
        : acc,
    {}
  );
};

const selected = (options) => {
  const selectedKeys = Object.keys(options);
  return (
    selectedKeys.length > 0 && selectedKeys.some((key) => options[key].size > 0)
  );
};

const url = ({ filters, sort }) => {
  const urlString = "";

  const options =
    Object.keys(filters ?? {}).length > 0 ? filters : state.filters;

  if (selected(options)) {
    const selectedKeys = Object.keys(options);

    urlString += selectedKeys
      .map((key) => {
        const values = Array.from(options[key]);
        return `${key}=${values.join(",")}`;
      })
      .join("&");
  }

  if (state.search) {
    if (urlString.length > 0) {
      urlString += "&";
    }
    urlString += `q=${state.search}`;
  }

  const sortOption = state.sort ?? sort;

  if (sortOption) {
    urlString += `&sort=${sortOption}`;
  }

  return urlString;
};

State.init({
  filters: getFilters(),
  search: urlProps.q,
  sort: urlProps.sort,
  items: null,
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  asyncFetch(`https://api-op3o.onrender.com/data/${entity}?${url()}`).then(
    ({ body: items }) => State.update({ items, itemsIsFetched: true })
  );

  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  gap: 2em;

  & > h1 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    color: #101828;
  }
`;

const ContainerSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 1em;
  width: 100%;
`;

const HeadingSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 16px;

    & > h2 {
      font-family: "FK Grotesk";
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 36px;
      color: #11181c;
    }

    & > span {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 19px;
      line-height: 23px;
      color: #7e868c;

      & > b {
        font-weight: 600;
        color: #11181c;
      }
    }
  }

  & > a {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    gap: 8px;
    background: #fafafa;
    border: 1px solid #eceef0;
    border-radius: 50px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #101828;

    &:hover,
    &:focus {
      font-family: "Inter";
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      color: #101828;
    }
  }
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0px;
  flex-wrap: wrap;
  width: 100%;

  & > div {
    margin-bottom: 24px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    @media screen and (min-width: 768px) and (max-width: 1424px) {
      width: 49%;
    }

    @media screen and (min-width: 1424px) {
      width: 32%;
    }
  }
`;

const questListSec = (count, items, descriptor, renderItem) => {
  return (
    <ContainerSection>
      <HeadingSection>
        <div>
          <span>
            <b>{count}</b> Quests
          </span>
        </div>
      </HeadingSection>
      <ListSection>{items.map((item) => renderItem(item))}</ListSection>
    </ContainerSection>
  );
};

return (
  <Container>
    {questListSec(
      state.items.length,
      state.items,
      props.descriptor,
      renderItem
    )}
  </Container>
);
