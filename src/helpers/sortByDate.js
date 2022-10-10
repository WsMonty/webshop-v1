const sortByDate = (entry) => {
  return entry.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));
};

export default sortByDate;
