const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Helper to fetch from GitHub API using the commit author's email
function fetchGithubUser(email) {
  return new Promise((resolve) => {
    if (!email || !email.includes('@')) {
      resolve(null);
      return;
    }
    const options = {
      hostname: 'api.github.com',
      path: `/search/commits?q=author-email:${encodeURIComponent(email)}`,
      headers: { 'User-Agent': 'node.js', 'Accept': 'application/vnd.github.v3+json' },
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            if (parsed.items && parsed.items.length > 0 && parsed.items[0].author) {
              const author = parsed.items[0].author;
              console.log(`Successfully mapped ${email} to GitHub user ${author.login}`);
              resolve(author);
              return;
            }
          } catch (e) {
             // JSON parse error
          }
        }
        console.log(`Could not find GitHub user for email ${email}`);
        resolve(null);
      });
    });
    req.on('error', (err) => {
      console.log(`Error searching for email ${email}: ${err.message}`);
      resolve(null);
    });
    req.end();
  });
}

async function main() {
  console.log("Fetching latest online data for all branches...");
  try {
    execSync('git fetch --all');
  } catch (err) {
    console.warn("Could not fetch remote branches, falling back to local history.", err.message);
  }

  console.log("Extracting git log...");
  let output = '';
  try {
    output = execSync('git log --all --format="%aN|%aE"').toString();
  } catch (err) {
    console.error("Failed to run git log", err);
    return;
  }

  // Aggregate by email
  // email -> { names: { [name]: count }, totalCommits: N }
  const authorsByEmail = {};

  output.split('\n').forEach(line => {
    if (!line.trim()) return;
    const parts = line.split('|');
    const name = parts[0].trim();
    const email = (parts[1] || '').trim().toLowerCase();

    if (!authorsByEmail[email]) {
      authorsByEmail[email] = { names: {}, totalCommits: 0 };
    }
    authorsByEmail[email].names[name] = (authorsByEmail[email].names[name] || 0) + 1;
    authorsByEmail[email].totalCommits += 1;
  });

  const finalStats = [];

  for (const email of Object.keys(authorsByEmail)) {
    const data = authorsByEmail[email];
    
    // Sort names by frequency
    const sortedNames = Object.keys(data.names).sort((a, b) => data.names[b] - data.names[a]);
    
    let githubProfile = null;
    
    // Try to find a valid GitHub user from the email used in the commits
    githubProfile = await fetchGithubUser(email);

    const primaryName = sortedNames[0];

    if (githubProfile) {
      finalStats.push({
        name: githubProfile.name || githubProfile.login,
        username: githubProfile.login,
        avatar_url: githubProfile.avatar_url,
        profile_url: githubProfile.html_url,
        commits: data.totalCommits
      });
    } else {
      // Fallback
      finalStats.push({
        name: primaryName,
        username: primaryName,
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(primaryName)}&background=random`,
        profile_url: '#',
        commits: data.totalCommits
      });
    }
  }

  // Sort by commits descending
  finalStats.sort((a, b) => b.commits - a.commits);

  const outPath = path.resolve('public', 'stats.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(finalStats, null, 2));
  console.log('Successfully generated stats.json with ' + finalStats.length + ' contributors.');
}

main().catch(console.error);
