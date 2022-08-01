export const processData = (data) => {
  return data.reduce((acc, d) => {
    if (!d.parent_objective_id) {
      // Parent
      if (!acc[d.id]) {
        acc[d.id] = d;
        acc[d.id].children = [];
      } else if (!acc[d.id].title) {
        // This parent was added due to
        // some child in API response
        // appearing ahead of parent
        acc[d.id] = {
          ...acc[d.id],
          ...d
        };
      }
    } else {
      // Child
      if (!acc[d.parent_objective_id]) {
        acc[d.parent_objective_id] = {
          id: d.parent_objective_id,
          children: []
        };
      }
      acc[d.parent_objective_id].children?.push(d);
    }
    return acc;
  }, {});
};
