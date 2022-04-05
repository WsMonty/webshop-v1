const sortByDate = (entry) => {
  const sorted = [];
  entry.forEach((entry, i) => {
    const curDate = new Date(entry.node.date);
    if (sorted.some((el) => new Date(el.node.date) > curDate))
      sorted.push(entry);
    else sorted.unshift(entry);
  });

  return sorted;
};

export default sortByDate;
