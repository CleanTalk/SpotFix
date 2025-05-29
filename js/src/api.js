const createTaskDoboard = async (taskDetails) => {
    const response = await fetch('https://api.yourtaskboard.com/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDetails),
    });

    if (!response.ok) {
        throw new Error('Failed to create task');
    }

    return await response.json();
};

const getTasksDoboard = async () => {
    const response = await fetch('https://api.yourtaskboard.com/tasks');

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    return await response.json();
};

const createTaskLS = async (taskDetails) => {
    let keyTask = 'doboard_task-' + Date.now();    
    localStorage.setItem(keyTask,  JSON.stringify(taskDetails));
};

function getTasksLS() {    
    let tasks = [];
    let i = 0;
    for (let key in localStorage){
        if (key.indexOf("doboard_task-") == 0) {
           tasks[i] = JSON.parse(localStorage[key]);
            i++;
        }
    };

     return tasks;
};

/*const authorizeUser = async (email, password) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch(`https://api.doboard.com/user_authorize`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Authorization failed');
    }

    return await response.json();
};*/
