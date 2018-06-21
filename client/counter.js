/* Grab sample data
for each repo go through all commits
  for each commit if name = username
  && date greater than startDate
  increment commit counter
*/

const counter = (startDate, repoData) => {
  console.log(startDate);
  // console.log(repoData);
  // assume you've already gotten the list of all users public repos
  // sampleRepos is an array of repos
    // each repo returned is an array of commits
      // for each commit, check date
      // if greater than startDate, increment counter
  console.log(repoData.sampleArrayOfRepos);    
  let commitCount = 0;
  repoData.sampleArrayOfRepos.forEach(repo => {
    repo.forEach(element => {
      if(element.commit.author.name === 'Corey' && element.commit.author.date > startDate) {
        commitCount++;
      }
    })
  });
  console.log(commitCount);
  return commitCount;
};


export { counter };