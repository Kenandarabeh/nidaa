const sectionListFormat = (slots) => {
    return slots.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = { title: date, data: [] };
      }
      acc[date].data.push(...item.slot);
      return acc;
    }, {});
  };
  
  export default sectionListFormat;
  