const createSearchCodes = (data) => {
  return Object.entries(data).forEach((work) => {
    work[1].node.searchCode =
      `${work[1].node.title}${work[1].node.composer}${work[1].node.descriptionTextShort}`.toLocaleLowerCase();
  });
};

export default createSearchCodes;
