const counter = (startDate, repoArray, userName) => {
  let commitCount = 0;
  repoArray.forEach(repo => {
    repo.forEach(element => {
      if(element.commit.author.name === userName && element.commit.author.date > startDate) {
        commitCount++;
      }
    })
  });
  console.log(commitCount);
  return commitCount;
};


export { counter };