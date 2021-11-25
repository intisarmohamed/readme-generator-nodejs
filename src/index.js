const inquirer = require("inquirer");
const util = require("./util");
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the name of your project?",
  },
  {
    type: "input",
    name: "description",
    message: "Include a brief description of your project",
  },
  {
    type: "input",
    name: "contributing",
    message: "How can others contribute to your project?",
  },
  {
    type: "confirm",
    name: "hasInstallation",
    message: "Does your project require installation steps",
    default: "false",
  },
  {
    type: "confirm",
    name: "hasUsage",
    message: "Do you want to include usage examples?",
    default: "false",
  },
  {
    type: "confirm",
    name: "hasTest",
    message: "Does your application require test?",
    default: "false",
  },
  {
    type: "list",
    name: "hasLicense",
    message: "select your license",
    choices: ["MIT", "Apache", "Academic", "GNU", "ISC", "Mozilla", "Open"],
  },
];
const installationQuestions = [
  {
    type: "input",
    name: "installation",
    message: "What are the steps to install your project?",
  },
];
const usageQuestions = [
  {
    type: "input",
    name: "usage",
    message: "Include examples of usage",
  },
];
const testQuestions = [
  {
    type: "input",
    name: "test",
    message: "Which tests do you need to run for your project?",
  },
];
const generateReadMe = (
  readMeAnswers,
  usageAnswers,
  installationAnswers,
  testAnswers
) => {
  const test = testAnswers
    ? `## Test\n To test the application run the following script:\`\`\`${testAnswers.test}\`\`\``
    : "";
  const usage = usageAnswers
    ? `## Usage:\n
  To use the application run the following script: \`\`\`${usageAnswers.usage}\`\`\``
    : "";
  const installation = installationAnswers
    ? `## Installation:\n Run the following script to install the packages required for the application:\n \`\`\` ${installationAnswers.installation}\`\`\` `
    : "";

  return `
# ${readMeAnswers.title} [${readMeAnswers.hasLicense}](https://img.shields.io/static/v1?label=&message=License&color=green)
## Description:\n ${readMeAnswers.description}
## Contributing:\n ${readMeAnswers.contributing}
${test}
${usage}
${installation}
 `;
};

const start = async () => {
  const readMeAnswers = await inquirer.prompt(questions);
  let installationAnswers;
  if (readMeAnswers.hasInstallation) {
    installationAnswers = await inquirer.prompt(installationQuestions);
  }
  let usageAnswers;
  if (readMeAnswers.hasUsage) {
    usageAnswers = await inquirer.prompt(usageQuestions);
  }
  let testAnswers;
  if (readMeAnswers.hasTest) {
    testAnswers = await inquirer.prompt(testQuestions);
  }
  console.log("usage", usageAnswers);
  console.log("installation", installationAnswers);
  console.log("test", testAnswers);

  const dataToWrite = generateReadMe(
    readMeAnswers,
    usageAnswers,
    installationAnswers,
    testAnswers
  );

  // write to file with data and path
  util.writeToFile("Readme.md", dataToWrite);
};
start();
