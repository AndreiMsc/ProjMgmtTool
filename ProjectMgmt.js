var numberOfUsers = 0;
var user1 = new User("Andrei");
var user2 = new User("Andreea");
var users = [user1, user2];

var numberOfIssues = 0;
var issues = [];

var numberOfComms = 0;
var comm1 = new Comment("This is comm 1");
var comm2 = new Comment("This is comm 2");
var comments = [comm1, comm2];

var numberOfStates = 0;
var state1 = new Comment("New");
var state2 = new Comment("In progress");
var state3 = new Comment("Feedback");
var state4 = new Comment("Rework");
var state5 = new Comment("Resolved");
var state6 = new Comment("Ready for Testing");
states = [state1, state2, state3, state4, state5, state6];

var numberOfSprints = 0;
var sprint1 = new Sprint("Sprint1");
var sprints = [sprint1];

var currentUsername;
var currentUserID;

function States(name) {
    this.id = numberOfStates + 1;
    numberOfStates = numberOfStates + 1;
    this.name = name;
}

function User(name) {
    this.id = numberOfUsers + 1;
    numberOfUsers = numberOfUsers + 1;
    this.name = name;
}

// the new issue automaticly takes the next available ID, the ID of the current user and the status ID 1 (New)
function Issue(type, name, sprint, assignee, description, tasks, comments) {
    this.id = numberOfIssues + 1;
    numberOfIssues = numberOfIssues + 1;
    this.type = type;
    this.name = name;
    this.sprint = sprint;
    this.createdBy = getUserID();
    this.assignee = assignee;
    this.description = description;
    this.status = 1;
    this.tasks = tasks;
    this.comments = comments;
    var dateTime = new Date();
    this.updatedAt = dateTime.getFullYear+'-'+(dateTime.getMonth()+1)+'-'+(dateTime.getDate())+', '+dateTime.getHours()+'-'+dateTime.getMinutes();
    this.createdAt = dateTime.getFullYear+'-'+(dateTime.getMonth()+1)+'-'+(dateTime.getDate())+', '+dateTime.getHours()+'-'+dateTime.getMinutes();
}

function Project(id, sprints) {
    this.id = id;
    this.sprints = sprints;
}

function Sprint(name) {
    this.id = numberOfSprints + 1;
    numberOfSprints = numberOfSprints + 1;
    this.name = name;
}

function Comment(name) {
    this.id = numberOfComms + 1;
    numberOfComms = numberOfComms + 1;
    this.name = name;
}

// gets the ID of the current username
function getUserID() {
    var index = 0;
    while (index < numberOfUsers) {
        if ((users[index]).name === currentUsername) {
            return (users[index]).id;
        }
        index = index + 1;
    }
}

// sets the current username
function setUsername() {
    currentUsername = document.getElementById("username").value;
    currentUserID = getUserID();
    document.getElementById("usernameDisplay").innerHTML = currentUsername;
    document.getElementById("idDisplay").innerHTML = currentUserID;
}

// creates a comment
function createComment() {
    var commName = document.getElementById("commName").value;
    var comment = new Comment(commName);
    comments.push(comment);
}

function createSprint() {
    var sprintName = document.getElementById("sprintName").value;
    var comment = new Comment(sprintName);
    comments.push(comment);
}

function createIssue() {
    var _type = document.getElementById("type").value;
    var _name = document.getElementById("name").value;
    var _sprintID = document.getElementById("sprintID").value;
    var _assigneeID = document.getElementById("assigneeID").value;
    var _description = document.getElementById("description").value;
    var _taskIDs = document.getElementById("taskIDs").value;
    var _commentIDs = document.getElementById("commentIDs").value;
    var newIssue;
    if (_type === "task")
        newIssue = new Issue(_type, _name, _sprintID, _assigneeID, _description, 'Not applicable', _commentIDs);
    else
        newIssue = new Issue(_type, _name, _sprintID, _assigneeID, _description, _taskIDs, _commentIDs);
    issues.push(newIssue);
}

function updateIssue() {
    var _theID = document.getElementById("theID").value;
    console.log(_theID);
    var _type = document.getElementById("type").value;
    var _name = document.getElementById("name").value;
    console.log(_name);
    var _sprintID = document.getElementById("sprintID").value;
    var _assigneeID = document.getElementById("assigneeID").value;
    var _description = document.getElementById("description").value;
    var _taskIDs = document.getElementById("taskIDs").value;
    var _commentIDs = document.getElementById("commentIDs").value;
    issues[_theID-1].type = _type;
    issues[_theID-1].name = _name;
    issues[_theID-1].sprint = _sprintID;
    issues[_theID-1].assignee = _assigneeID;
    issues[_theID-1].description = _description;
    issues[_theID-1].tasks = _taskIDs;
    issues[_theID-1].comments = _commentIDs;
    issues[_theID-1].updatedAt = dateTime.getFullYear+'-'+(dateTime.getMonth()+1)+'-'+(dateTime.getDate())+', '+dateTime.getHours()+'-'+dateTime.getMinutes();
}

function filterStatus() {
    var index = 0;
    var filteredIssues = [];
    var statusSelected = document.getElementById("statusSelected").value;
    while (index < numberOfIssues) {
        if ((states[(issues[index].status)-1]) === statusSelected) {
            filteredIssues.push(issues[index]);
        }
        index = index + 1;
    }
    document.getElementById('statusResults').innerHTML = filteredIssues.join(' ');
}