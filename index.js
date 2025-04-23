import {Command} from 'commander';


const Events = {
  PushEvent :'PushEvent',
  CreateEvent : 'CreateEvent',
  DeleteEvent :'DeleteEvent',
  IssuesEvent : 'IssuesEvent',
  ForkEvent : 'ForkEvent',
  PullRequestReviewCommentEvent :'PullRequestReviewCommentEvent'

}
const program = new Command();


program.name('github-activity')
  .description('A simple command line interface (CLI) to fetch the recent activity of a GitHub user and display it in the terminal.')
  .version('0.0.1')
  .command('github-activity <string>')
  .description('Provide the GitHub username as an argument')
  .action((usename)=>{
    getUserActivity(usename)
  })

  program.parse();


async function getUserActivity(username) {

  const data = await fetch(`https://api.github.com/users/${username}/events`);
  const userData = await data.json();

  userData.forEach((activity)=>{

    switch(activity.type){
      case Events.PushEvent:
        console.log(`- Pushed ${activity.payload.commits.length} to ${activity.repo.name}`);
        break;
      case Events.DeleteEvent:
        console.log(`- Deleted a ${activity.payload.ref_type} from ${activity.repo.name}`);
        break;
      case Events.IssuesEvent:
        console.log(`- Opened a new issue on ${activity.repo.name}`);
        break;
    }
  })
  
}