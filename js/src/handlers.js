
async function spotFixConfirmUserEmail(emailConfirmationToken, params) {
    const result = await spotFixUserConfirmEmailDoboard(emailConfirmationToken);
    // Save session data to LS
    localStorage.setItem('spotfix_email', result.email);
    localStorage.setItem('spotfix_session_id', result.sessionId);
    localStorage.setItem('spotfix_user_id', result.userId);
    await spotfixIndexedDB.init();

    // Get pending task from LS
    const pendingTaskRaw = localStorage.getItem('spotfix_pending_task');
    if (!pendingTaskRaw) throw new Error('No pending task data');

    let pendingTask;
    try {
        pendingTask = JSON.parse(pendingTaskRaw);
    } catch (error) {
        throw new Error('Invalid pending task data');
    }

    // Form taskDetails for task creation
    const taskDetails = {
        taskTitle: pendingTask.selectedText || 'New Task',
        taskDescription: pendingTask.description || '',
        selectedData: pendingTask,
        projectToken: params.projectToken,
        projectId: params.projectId,
        accountId: params.accountId,
        taskMeta: JSON.stringify(pendingTask),
    };

    // Create task
    const createdTask = await handleCreateTask(result.sessionId, taskDetails);
    // Clear pending task
    localStorage.removeItem('spotfix_pending_task');

    // Return created task
    return createdTask;
}

async function getTasksFullDetails(params, tasks, currentActiveTaskId, nonRequesting = false) {
    if (tasks.length > 0) {
        const sessionId = localStorage.getItem('spotfix_session_id');
        if (!nonRequesting) {
            await getTasksCommentsDoboard(sessionId, params.accountId, params.projectToken);
        }
        const comments = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_COMMENTS);
        if (!nonRequesting) {
            await getUserDoboard(sessionId, params.projectToken, params.accountId);
        }
        const users = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_USERS);
        const foundTask = tasks.find((item) => +item.taskId === +currentActiveTaskId);

        return {
            comments: comments,
            users: users,
            taskStatus: foundTask?.taskStatus,
            taskName: foundTask?.taskTitle,
        };
    }
}

async function getUserDetails(params, nonRequesting = false) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const currentUserId = localStorage.getItem('spotfix_user_id');
    if (currentUserId) {
        if (!nonRequesting) {
            await getUserDoboard(sessionId, params.projectToken, params.accountId, currentUserId);
        }
        const users = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_USERS);
        return users.find((user) => +user.user_id === +currentUserId) || {};
    }
}

async function handleCreateTask(sessionId, taskDetails) {
    try {
        const result = await createTaskDoboard(sessionId, taskDetails);
        if (result && result.taskId && taskDetails.taskDescription) {
            const sign = `<br><br><br><em>The spot has been posted at the following URL <a href="${window.location.href}"><span class="task-link task-link--done">${window.location.href}</span></a></em>`;
            localStorage.setItem('spotfix-description', '');
            await addTaskComment({
                projectToken: taskDetails.projectToken,
                accountId: taskDetails.accountId,
            }, result.taskId, taskDetails.taskDescription+sign);
        }
        return result;
    } catch (err) {
        throw err;
    }
}

async function addTaskComment(params, taskId, commentText) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    if (!sessionId) throw new Error('No session');
    if (!params.projectToken || !params.accountId) throw new Error('Missing params');
    return await createTaskCommentDoboard(params.accountId, sessionId, taskId, commentText, params.projectToken);
}

async function getAllTasks(params, nonRequesting = false) {

    const projectToken = params.projectToken;
    const sessionId = localStorage.getItem('spotfix_session_id') || '';
    if (!nonRequesting) {
        await getTasksDoboard(projectToken, sessionId, params.accountId, params.projectId);
    }
    const tasksData = await spotfixIndexedDB.getAll(SPOTFIX_TABLE_TASKS);
    storageSaveTasksCount(tasksData);
    // Get only tasks with metadata
    const filteredTaskData = tasksData.filter((task) => {
        return task.taskMeta;
    });

    return filteredTaskData;
}

function formatDate(dateStr) {
	 const months = [
	 	'January', 'February', 'March', 'April', 'May', 'June',
	 	'July', 'August', 'September', 'October', 'November', 'December',
	 ];
	 // dateStr expected format: 'YYYY-MM-DD HH:mm:ss' or 'YYYY-MM-DDTHH:mm:ssZ'
	 if (!dateStr) return {date: '', time: ''};
	 let dateObj;
	 if (dateStr.includes('T')) {
	  dateObj = new Date(dateStr);
	 } else if (dateStr.includes(' ')) {
	  dateObj = new Date(dateStr.replace(' ', 'T'));
	 } else {
	  dateObj = new Date(dateStr);
	 }
	 if (isNaN(dateObj.getTime())) return {date: '', time: ''};

	 // Adjust to local timezone
	 const offsetMinutes = dateObj.getTimezoneOffset();
	 let localDateObj = new Date(dateObj.getTime() - offsetMinutes * 60000);

	 const month = months[localDateObj.getMonth()];
	 const day = localDateObj.getDate();
	 const date = `${month} ${day}`;
	 const hours = localDateObj.getHours().toString().padStart(2, '0');
	 const minutes = localDateObj.getMinutes().toString().padStart(2, '0');
	 const time = `${hours}:${minutes}`;
	 return {date, time};
}

function getTaskAuthorDetails(params, taskId) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const mockUsersData =
		[
		    {
		        'taskId': '1',
		        'taskAuthorAvatarImgSrc': 'https://s3.eu-central-1.amazonaws.com/cleantalk-ctask-atts/accounts/1/avatars/081a1b65d20fe318/m.jpg',
		        'taskAuthorName': 'Test All Issues Single Author Name',
		    },
		];

    const defaultData =
		{
		    'taskId': null,
		    'taskAuthorAvatarImgSrc': null,
		    'taskAuthorName': 'Task Author',
		};

    const data = mockUsersData.find((element) => element.taskId === taskId);
    return data === undefined ? defaultData : data;
}

function getIssuesCounterString(onPageSpotsCount, totalSpotsCount) {
    return ` (${onPageSpotsCount}/${totalSpotsCount})`;
}

// Get the author's avatar
function getAvatarSrc(author) {
    if (author && author.avatar) {
        if (typeof author.avatar === 'object' && author.avatar.m) {
            return author.avatar.m;
        } else if (typeof author.avatar === 'string') {
            return author.avatar;
        }
    }
    return null;
}

// Get the author's name
function getAuthorName(author) {
    if (author) {
        if (author.name && author.name.trim().length > 0) {
            return author.name;
        } else if (author.email && author.email.trim().length > 0) {
            return author.email;
        }
    }
    return 'Unknown Author';
}

function registerUser(taskDetails) {
    const userEmail = taskDetails.userEmail;
    const userName = taskDetails.userName;
    const projectToken = taskDetails.projectToken;
    const accountId = taskDetails.accountId;
    const pageURL = taskDetails.selectedData.pageURL ? taskDetails.selectedData.pageURL : window.location.href;

    const resultRegisterUser = (showMessageCallback) => registerUserDoboard(projectToken, accountId, userEmail, userName, pageURL)
        .then((response) => {
            if (response.accountExists) {
                document.querySelector('.doboard_task_widget-accordion>.doboard_task_widget-input-container').innerText = ksesFilter('Account already exists. Please, login usin your password.');
                document.querySelector('.doboard_task_widget-accordion>.doboard_task_widget-input-container.hidden').classList.remove('hidden');
                document.getElementById('doboard_task_widget-user_password').focus();
            } else if (response.sessionId) {
                localStorage.setItem('spotfix_session_id', response.sessionId);
                localStorage.setItem('spotfix_user_id', response.userId);
                localStorage.setItem('spotfix_email', response.email);
                localStorage.setItem('spotfix_accounts', JSON.stringify(response.accounts));
                spotfixIndexedDB.init();
                userUpdate(projectToken, accountId);
            } else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
                if (response.operationMessage == 'Waiting for email confirmation') {
                    response.operationMessage = 'Waiting for an email confirmation. Please check your Inbox.';
                	if (document.getElementById('doboard_task_widget-error_message').innerText === 'Waiting for an email confirmation. Please check your Inbox.') {
						response.operationMessage = 'Incorrect email address. Please confirm your email to create the spot.';
					}
                }
                if (typeof showMessageCallback === 'function') {
                    showMessageCallback(response.operationMessage, 'notice');
                }
                    const submitButton = document.getElementById('doboard_task_widget-submit_button');
					submitButton.disabled = true;
					submitButton.innerText = ksesFilter('Create spot');
            } else {
                throw new Error('Session ID not found in response');
            }
        })
        .catch((error) => {
            throw error;
        });

    return resultRegisterUser;
}

function loginUser(taskDetails) {
    const userEmail = taskDetails.userEmail;
    const userPassword = taskDetails.userPassword;

    return (showMessageCallback) => loginUserDoboard(userEmail, userPassword)
        .then((response) => {
            if (response.sessionId) {
                localStorage.setItem('spotfix_session_id', response.sessionId);
                localStorage.setItem('spotfix_user_id', response.userId);
                localStorage.setItem('spotfix_email', userEmail);
				localStorage.setItem('spotfix_accounts', JSON.stringify(response.accounts));
				checkLogInOutButtonsVisible();
                spotfixIndexedDB.init();
            } else if (response.operationStatus === 'SUCCESS' && response.operationMessage && response.operationMessage.length > 0) {
                if (typeof showMessageCallback === 'function') {
                    showMessageCallback(response.operationMessage, 'notice');
                }
            } else {
                throw new Error('Session ID not found in response');
            }
        })
        .catch((error) => {
            throw error;
        });
}

function forgotPassword(userEmail) {
		return (showMessageCallback) => forgotPasswordDoboard(userEmail)
		.then(response => {
			console.log('response ', response)
			if (response?.operation_status === 'SUCCESS') {
				showMessageCallback('New password sent to email', 'notice');
				const forgotPasswordForm = document.getElementById('doboard_task_widget-container-login-forgot-password-form');
				const loginContainer = document.getElementById('doboard_task_widget-input-container-login');
				const submitButton = document.getElementById('doboard_task_widget-submit_button');
				if (forgotPasswordForm) {
					forgotPasswordForm.classList.add('doboard_task_widget-hidden');
				}
				if (loginContainer) {
					loginContainer.classList.remove('doboard_task_widget-hidden');
					if (submitButton) {
						submitButton.closest('.doboard_task_widget-field').classList.add('doboard_task_widget-hidden');
					}
				}
			} else {
				throw new Error('Response error');
			}
		})
		.catch(error => {
			throw error;
		});
}

function userUpdate(projectToken, accountId) {
    const sessionId = localStorage.getItem('spotfix_session_id');
    const userId = localStorage.getItem('spotfix_user_id');
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return userUpdateDoboard(projectToken, accountId, sessionId, userId, timezone);
}

function spotFixSplitUrl(url) {
    try {
        if (!url || url.trim() === '') {
            return '';
        }
        const u = new URL(url);
        const domain = u.host;

        const segments = u.pathname.split('/').filter(Boolean);

        if (segments.length === 0) {
            return domain;
        }

        const reversed = segments.reverse();
        reversed.push(domain);
        return reversed.join(' / ');
    } catch (error) {
        return '';
    }
}

function setToggleStatus(rootElement) {
    const clickHandler = () => {
        const timer = setTimeout(() => {
            localStorage.setItem('spotfix_widget_is_closed', '1');
            wsSpotfix.close();
            rootElement.hide();
            clearTimeout(timer);
        }, 300);
    };
    const toggle = document.getElementById('widget_visibility');
    if (toggle) {
        toggle.checked = true;
        toggle.addEventListener('click', clickHandler);
    }
}

function checkLogInOutButtonsVisible (){
	if(!localStorage.getItem('spotfix_session_id')) {
		const el = document.getElementById('doboard_task_widget-user_menu-logout_button')?.closest('.doboard_task_widget-user_menu-item');
		if(el) el.style.display = 'none';

		const loginContainer = document.getElementById('doboard_task_widget-input-container-login')
		if(loginContainer) {
			loginContainer.classList.remove('doboard_task_widget-hidden');
		}
		clearUserMenuData();
	} else {
		const el = document.getElementById('doboard_task_widget-user_menu-logout_button')?.closest('.doboard_task_widget-user_menu-item');
		if(el) el.style.display = 'block';
		const loginContainer = document.getElementById('doboard_task_widget-input-container-login')
		if(loginContainer) {
			loginContainer.classList.add('doboard_task_widget-hidden');
		}
	}
}

/**
 * Clear user menu data in menu
 */
async function clearUserMenuData() {
	const userNameElement = document.querySelector('.doboard_task_widget-user_menu-header-user-name');
	const emailElement = document.querySelector('.doboard_task_widget-user_menu-header-email');
	const avatarElement = document.querySelector('.doboard_task_widget-user_menu-header-avatar');

	if (userNameElement) {
		userNameElement.innerText = 'Guest';
	}
	if (emailElement) {
		emailElement.innerText = '';
	}
	if (avatarElement) {
		avatarElement.src = SpotFixSVGLoader.getAsDataURI('iconAvatar');
	}
}

function changeSize(container) {
    if (container && +localStorage.getItem('maximize')) {
        container.classList.add('doboard_task_widget-container-maximize');
    } else if (container) {
        container.classList.remove('doboard_task_widget-container-maximize');
    }
}
function addIconPack() {

	if (SpotFixTinyMCE?.IconManager) {
		SpotFixTinyMCE.IconManager.add("icon_pack_SpotFix", {
			icons: {
				'paperclip': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M14.4648 0.522461C15.6367 0.522493 16.7612 0.987773 17.5898 1.81641C18.4185 2.64507 18.8838 3.76952 18.8838 4.94141C18.8837 6.11309 18.4183 7.23685 17.5898 8.06543L9.15625 16.4902C8.6717 16.9747 8.01428 17.247 7.3291 17.2471C6.64372 17.2471 5.98563 16.9749 5.50098 16.4902C5.01634 16.0056 4.74414 15.3475 4.74414 14.6621C4.74422 13.9769 5.01652 13.3195 5.50098 12.835L13.2842 5.06152C13.5771 4.76897 14.052 4.7688 14.3447 5.06152C14.6374 5.35457 14.6377 5.83034 14.3447 6.12305L6.5625 13.8955C6.35922 14.0988 6.24422 14.3746 6.24414 14.6621C6.24414 14.9497 6.35916 15.2254 6.5625 15.4287C6.76585 15.632 7.04154 15.7471 7.3291 15.7471C7.61656 15.747 7.89243 15.632 8.0957 15.4287L16.5293 7.00488L16.7227 6.79102C17.1482 6.27169 17.3837 5.61868 17.3838 4.94141C17.3838 4.16735 17.0766 3.42431 16.5293 2.87695C15.982 2.32963 15.2389 2.02249 14.4648 2.02246C13.691 2.02253 12.9486 2.32984 12.4014 2.87695L3.97754 11.3018C3.08624 12.1931 2.58504 13.4016 2.58496 14.6621C2.58496 15.9227 3.08617 17.1321 3.97754 18.0234C4.86885 18.9146 6.0775 19.415 7.33789 19.415C8.59844 19.415 9.80788 18.9148 10.6992 18.0234L19.123 9.59961C19.4159 9.30678 19.8907 9.30674 20.1836 9.59961C20.4763 9.8925 20.4764 10.3673 20.1836 10.6602L11.7598 19.084C10.5871 20.2566 8.99626 20.915 7.33789 20.915C5.67955 20.915 4.08866 20.2566 2.91602 19.084C1.74348 17.9113 1.08496 16.3204 1.08496 14.6621C1.08504 13.004 1.74366 11.4138 2.91602 10.2412L11.3408 1.81641C12.1694 0.987987 13.2932 0.52253 14.4648 0.522461Z" fill="#707A83"/>\n' +
					'</svg>',
				'ordered-list': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M3.20117 15.0879C3.36239 15.0879 3.50533 15.1152 3.62891 15.1699C3.75311 15.2246 3.84938 15.3007 3.91895 15.3965C3.98914 15.4915 4.02406 15.6 4.02344 15.7227C4.02486 15.8447 3.98351 15.9453 3.89844 16.0234C3.81392 16.1016 3.70614 16.1479 3.57617 16.1621V16.1787C3.75221 16.1979 3.88486 16.2521 3.97363 16.3408C4.06241 16.4289 4.10591 16.5403 4.10449 16.6738C4.10511 16.8015 4.06658 16.9151 3.98926 17.0137C3.91259 17.1121 3.80577 17.1891 3.66895 17.2451C3.53262 17.3012 3.37547 17.3301 3.19727 17.3301C3.02548 17.3301 2.87273 17.3001 2.73926 17.2412C2.60645 17.1816 2.50178 17.0995 2.42578 16.9951C2.34979 16.8907 2.31126 16.7704 2.31055 16.6348H2.90723C2.90794 16.6766 2.92051 16.7147 2.94531 16.748C2.9708 16.7806 3.00596 16.8058 3.0498 16.8242C3.09379 16.8427 3.14444 16.8525 3.20117 16.8525C3.25586 16.8525 3.30478 16.8424 3.34668 16.8232C3.38835 16.8034 3.42099 16.7759 3.44434 16.7412C3.46765 16.7065 3.47922 16.6667 3.47852 16.6221C3.47919 16.5781 3.46516 16.5389 3.4375 16.5049C3.41056 16.471 3.373 16.4439 3.32422 16.4248C3.27521 16.4056 3.21822 16.3965 3.1543 16.3965H2.93262V15.9873H3.1543C3.213 15.9873 3.26495 15.978 3.30957 15.959C3.35485 15.9399 3.3902 15.9128 3.41504 15.8789C3.44055 15.8449 3.45378 15.8056 3.45312 15.7617C3.45384 15.7191 3.44318 15.6811 3.42188 15.6484C3.40057 15.6158 3.37036 15.5907 3.33203 15.5723C3.29442 15.5538 3.25083 15.5439 3.20117 15.5439C3.14728 15.544 3.0992 15.5541 3.05664 15.5732C3.01479 15.5924 2.98117 15.6183 2.95703 15.6523C2.93296 15.6863 2.92071 15.7257 2.91992 15.7695H2.35352C2.3543 15.6362 2.39053 15.5182 2.46289 15.416C2.53604 15.3138 2.63657 15.234 2.76367 15.1758C2.89074 15.1176 3.03649 15.0879 3.20117 15.0879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 15.75C19.6641 15.7502 20 16.0859 20 16.5C20 16.9141 19.6641 17.2498 19.25 17.25H7.33301C6.91896 17.2498 6.58301 16.9141 6.58301 16.5C6.58301 16.0859 6.91896 15.7502 7.33301 15.75H19.25Z" fill="#707A83"/>\n' +
					'<path d="M3.13965 9.58789C3.31434 9.5879 3.46593 9.61577 3.59375 9.67188C3.72211 9.72721 3.82106 9.80558 3.89062 9.90625C3.96094 10.0071 3.99609 10.1261 3.99609 10.2617C3.99606 10.3454 3.97904 10.4288 3.94434 10.5117C3.90959 10.594 3.84681 10.6852 3.75684 10.7852C3.66666 10.8853 3.53819 11.0051 3.37207 11.1436L3.16699 11.3145V11.3271H4.01953V11.7998H2.34473V11.374L3.15918 10.7002C3.21301 10.6556 3.2586 10.6132 3.29688 10.5742C3.33592 10.5345 3.36613 10.494 3.38672 10.4521C3.40803 10.4102 3.41895 10.3636 3.41895 10.3125C3.41893 10.2566 3.40684 10.2086 3.38281 10.1689C3.35938 10.1292 3.32608 10.0985 3.28418 10.0771C3.24235 10.0552 3.19421 10.044 3.13965 10.0439C3.0851 10.0439 3.03694 10.0552 2.99512 10.0771C2.95394 10.0992 2.92116 10.1312 2.89844 10.1738C2.87571 10.2164 2.86426 10.269 2.86426 10.3301H2.30176C2.30176 10.1768 2.33651 10.0443 2.40527 9.93359C2.47413 9.82286 2.57165 9.73739 2.69727 9.67773C2.82298 9.61808 2.97061 9.58789 3.13965 9.58789Z" fill="#707A83"/>\n' +
					'<path d="M19.25 10.25C19.6641 10.2502 20 10.5859 20 11C20 11.4141 19.6641 11.7498 19.25 11.75H7.33301C6.91896 11.7498 6.58301 11.4141 6.58301 11C6.58301 10.5859 6.91896 10.2502 7.33301 10.25H19.25Z" fill="#707A83"/>\n' +
					'<path d="M3.41406 6.2998H2.82227V4.66309H2.80957L2.33203 4.94922V4.44629L2.86914 4.11816H3.41406V6.2998Z" fill="#707A83"/>\n' +
					'<path d="M19.25 4.75C19.6641 4.75018 20 5.0859 20 5.5C20 5.9141 19.6641 6.24982 19.25 6.25H7.33301C6.91896 6.2498 6.58301 5.91409 6.58301 5.5C6.58301 5.08591 6.91896 4.7502 7.33301 4.75H19.25Z" fill="#707A83"/>\n' +
					'</svg>',
				'screenshot': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M14.667 13C15.352 13.0001 16.0088 13.2724 16.4932 13.7568C16.9776 14.2412 17.2499 14.898 17.25 15.583C17.25 16.2682 16.9776 16.9257 16.4932 17.4102C16.0088 17.8944 15.3519 18.1669 14.667 18.167C13.9818 18.167 13.3243 17.8946 12.8398 17.4102C12.3554 16.9257 12.083 16.2682 12.083 15.583C12.0831 14.8981 12.3556 14.2412 12.8398 13.7568C13.3243 13.2724 13.9818 13 14.667 13ZM14.667 14.5C14.3797 14.5 14.1036 14.6142 13.9004 14.8174C13.6974 15.0205 13.5831 15.2959 13.583 15.583C13.583 15.8703 13.6972 16.1464 13.9004 16.3496C14.1036 16.5528 14.3797 16.667 14.667 16.667C14.9541 16.6669 15.2295 16.5526 15.4326 16.3496C15.6358 16.1464 15.75 15.8703 15.75 15.583C15.7499 15.2958 15.6357 15.0205 15.4326 14.8174C15.2295 14.6143 14.9542 14.5001 14.667 14.5Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4551 9.34277C16.562 9.35633 16.6673 9.38342 16.7676 9.42285L16.915 9.49219L17.0518 9.57812C17.1393 9.6412 17.2188 9.71518 17.2881 9.79785L17.3848 9.92871L18.6504 11.8945H19.6172C19.745 11.8946 19.8722 11.9132 19.9941 11.9502L20.1143 11.9932L20.2295 12.0479C20.3045 12.088 20.3756 12.1355 20.4414 12.1895L20.5361 12.2754L20.6221 12.3691C20.676 12.4349 20.7236 12.506 20.7637 12.5811L20.8184 12.6963L20.8613 12.8174C20.8982 12.9393 20.917 13.0665 20.917 13.1943V19.6162C20.917 19.7869 20.8837 19.9566 20.8184 20.1143C20.7531 20.2717 20.6566 20.4146 20.5361 20.5352C20.4155 20.6558 20.2719 20.7521 20.1143 20.8174C19.9568 20.8826 19.7876 20.9159 19.6172 20.916H9.7168C9.54633 20.916 9.37725 20.8826 9.21973 20.8174C9.06208 20.7521 8.91853 20.6558 8.79785 20.5352C8.67731 20.4146 8.58092 20.2718 8.51562 20.1143C8.45029 19.9565 8.41699 19.7869 8.41699 19.6162V13.1943C8.41699 12.8496 8.55416 12.5192 8.79785 12.2754L8.89355 12.1885C9.12475 11.9993 9.41542 11.8946 9.7168 11.8945H10.6836L11.9492 9.92871L12.0459 9.79785C12.1498 9.67401 12.2763 9.57012 12.4189 9.49219C12.6096 9.38824 12.8239 9.33318 13.041 9.33301H16.293L16.4551 9.34277ZM11.8848 12.7988C11.7672 12.9812 11.6054 13.1313 11.415 13.2354C11.2245 13.3393 11.0101 13.3943 10.793 13.3945H9.91699V19.416H19.417V13.3945H18.541C18.3239 13.3944 18.1096 13.3393 17.9189 13.2354C17.7285 13.1314 17.5668 12.9812 17.4492 12.7988L16.1836 10.833H13.1504L11.8848 12.7988Z" fill="#707A83"/>\n' +
					'<path d="M2.75 15.75C3.16421 15.75 3.5 16.0858 3.5 16.5V18.5H5.04199C5.45606 18.5002 5.79199 18.8359 5.79199 19.25C5.79199 19.6641 5.45606 19.9998 5.04199 20H2.75C2.33579 20 2 19.6642 2 19.25V16.5C2 16.0858 2.33579 15.75 2.75 15.75Z" fill="#707A83"/>\n' +
					'<path d="M2.75 7.95801C3.1641 7.95801 3.49982 8.29394 3.5 8.70801V13.292C3.49982 13.7061 3.16411 14.042 2.75 14.042C2.33589 14.042 2.00018 13.7061 2 13.292V8.70801C2.00018 8.29394 2.3359 7.95801 2.75 7.95801Z" fill="#707A83"/>\n' +
					'<path d="M19.25 7.04199C19.6642 7.04199 20 7.37778 20 7.79199V9.16699C19.9998 9.58106 19.6641 9.91699 19.25 9.91699C18.8359 9.91699 18.5002 9.58106 18.5 9.16699V7.79199C18.5 7.37778 18.8358 7.04199 19.25 7.04199Z" fill="#707A83"/>\n' +
					'<path d="M5.5 2C5.91421 2 6.25 2.33579 6.25 2.75C6.25 3.16421 5.91421 3.5 5.5 3.5H3.5V5.5C3.5 5.91421 3.16421 6.25 2.75 6.25C2.33579 6.25 2 5.91421 2 5.5V2.75C2 2.33579 2.33579 2 2.75 2H5.5Z" fill="#707A83"/>\n' +
					'<path d="M19.25 2C19.6642 2 20 2.33579 20 2.75V5.04199C19.9998 5.45606 19.6641 5.79199 19.25 5.79199C18.8359 5.79199 18.5002 5.45606 18.5 5.04199V3.5H16.5C16.0858 3.5 15.75 3.16421 15.75 2.75C15.75 2.33579 16.0858 2 16.5 2H19.25Z" fill="#707A83"/>\n' +
					'<path d="M13.292 2C13.7061 2.00018 14.042 2.33589 14.042 2.75C14.042 3.16411 13.7061 3.49982 13.292 3.5H8.70801C8.29394 3.49982 7.95801 3.1641 7.95801 2.75C7.95801 2.3359 8.29394 2.00018 8.70801 2H13.292Z" fill="#707A83"/>\n' +
					'</svg>\n',
				'unordered-list': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M2.75879 15.75C3.17279 15.7502 3.50879 16.0859 3.50879 16.5C3.50879 16.9141 3.17279 17.2498 2.75879 17.25H2.75C2.33579 17.25 2 16.9142 2 16.5C2 16.0858 2.33579 15.75 2.75 15.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 15.75C19.6641 15.7502 20 16.0859 20 16.5C20 16.9141 19.6641 17.2498 19.25 17.25H7.33301C6.91896 17.2498 6.58301 16.9141 6.58301 16.5C6.58301 16.0859 6.91896 15.7502 7.33301 15.75H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 10.25C3.17279 10.2502 3.50879 10.5859 3.50879 11C3.50879 11.4141 3.17279 11.7498 2.75879 11.75H2.75C2.33579 11.75 2 11.4142 2 11C2 10.5858 2.33579 10.25 2.75 10.25H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 10.25C19.6641 10.2502 20 10.5859 20 11C20 11.4141 19.6641 11.7498 19.25 11.75H7.33301C6.91896 11.7498 6.58301 11.4141 6.58301 11C6.58301 10.5859 6.91896 10.2502 7.33301 10.25H19.25Z" fill="#707A83"/>\n' +
					'<path d="M2.75879 4.75C3.17279 4.75025 3.50879 5.08594 3.50879 5.5C3.50879 5.91406 3.17279 6.24975 2.75879 6.25H2.75C2.33579 6.25 2 5.91421 2 5.5C2 5.08579 2.33579 4.75 2.75 4.75H2.75879Z" fill="#707A83"/>\n' +
					'<path d="M19.25 4.75C19.6641 4.75018 20 5.0859 20 5.5C20 5.9141 19.6641 6.24982 19.25 6.25H7.33301C6.91896 6.2498 6.58301 5.91409 6.58301 5.5C6.58301 5.08591 6.91896 4.7502 7.33301 4.75H19.25Z" fill="#707A83"/>\n' +
					'</svg>',
				'bold': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none"\n' +
					'xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd"\n' +
					'd="M12.833 2.91699C14.0044 2.91699 15.1278 3.38265 15.9561 4.21094C16.7843 5.03922 17.25 6.16261 17.25 7.33398C17.2499 8.50524 16.7843 9.62882 15.9561 10.457C15.8706 10.5424 15.7809 10.6226 15.6895 10.7002C16.1237 10.9126 16.5248 11.1957 16.873 11.5439C17.7012 12.3722 18.167 13.4957 18.167 14.667C18.1669 15.8382 17.7013 16.9618 16.873 17.79C16.0448 18.6182 14.9213 19.083 13.75 19.083H5.5C5.08579 19.083 4.75 18.7472 4.75 18.333V3.66699C4.75 3.25278 5.08579 2.91699 5.5 2.91699H12.833ZM6.25 17.583H13.75C14.5235 17.583 15.2655 17.2764 15.8125 16.7295C16.3594 16.1826 16.6669 15.4404 16.667 14.667C16.667 13.8935 16.3594 13.1515 15.8125 12.6045C15.2655 12.0575 14.5235 11.75 13.75 11.75H6.25V17.583ZM6.25 10.25H12.833C13.6064 10.25 14.3486 9.94326 14.8955 9.39648C15.4424 8.84958 15.7499 8.10741 15.75 7.33398C15.75 6.56044 15.4425 5.81847 14.8955 5.27148C14.3485 4.7245 13.6066 4.41699 12.833 4.41699H6.25V10.25Z"\n' +
					'fill="#707A83"/></svg>',
				'italic': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.417 2.91699C17.831 2.91719 18.167 3.2529 18.167 3.66699C18.167 4.08108 17.831 4.41679 17.417 4.41699H14.2695L9.33203 17.583H12.833C13.2472 17.583 13.583 17.9188 13.583 18.333C13.583 18.7472 13.2472 19.083 12.833 19.083H4.58301C4.16896 19.0828 3.83301 18.7471 3.83301 18.333C3.83301 17.9189 4.16896 17.5832 4.58301 17.583H7.73047L12.668 4.41699H9.16699C8.75278 4.41699 8.41699 4.08121 8.41699 3.66699C8.41699 3.25278 8.75278 2.91699 9.16699 2.91699H17.417Z" fill="#707A83"/>\n' +
					'</svg>',
				'strike-through': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M17.875 10.25C18.2892 10.25 18.625 10.5858 18.625 11C18.625 11.4142 18.2892 11.75 17.875 11.75H15.3926C16.1188 12.5542 16.5625 13.6179 16.5625 14.7812C16.5625 17.2751 14.5251 19.3124 12.0312 19.3125H9.96875C7.61343 19.3124 5.66563 17.4955 5.45605 15.1934C5.41856 14.781 5.72253 14.4157 6.13477 14.3779C6.54713 14.3404 6.91247 14.6443 6.9502 15.0566C7.09006 16.5946 8.39732 17.8124 9.96875 17.8125H12.0312C13.6966 17.8124 15.0625 16.4467 15.0625 14.7812C15.0625 13.1158 13.6966 11.7501 12.0312 11.75H4.125C3.71079 11.75 3.375 11.4142 3.375 11C3.375 10.5858 3.71079 10.25 4.125 10.25H17.875Z" fill="#707A83"/>\n' +
					'<path d="M12.0312 2.6875C14.3869 2.6875 16.3337 4.50478 16.5439 6.80664C16.5816 7.21903 16.2776 7.58424 15.8652 7.62207C15.4528 7.65973 15.0875 7.35577 15.0498 6.94336C14.9093 5.40491 13.6025 4.1875 12.0312 4.1875H9.96875C8.30328 4.1875 6.9375 5.55328 6.9375 7.21875C6.9375 7.71424 7.05778 8.18093 7.27051 8.59375C7.46023 8.96192 7.3154 9.41472 6.94727 9.60449C6.57909 9.79422 6.12628 9.6494 5.93652 9.28125C5.61713 8.66145 5.4375 7.95939 5.4375 7.21875C5.4375 4.72485 7.47485 2.6875 9.96875 2.6875H12.0312Z" fill="#707A83"/>\n' +
					'</svg>',
				'underline': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path d="M18.334 18.5C18.7479 18.5004 19.084 18.836 19.084 19.25C19.084 19.664 18.7479 19.9996 18.334 20H3.66699C3.25278 20 2.91699 19.6642 2.91699 19.25C2.91699 18.8358 3.25278 18.5 3.66699 18.5H18.334Z" fill="#707A83"/>\n' +
					'<path d="M16.5 2C16.9142 2 17.25 2.33579 17.25 2.75V9.16699C17.2499 10.8245 16.591 12.4139 15.4189 13.5859C14.2469 14.7579 12.6575 15.417 11 15.417C9.34247 15.417 7.75314 14.7579 6.58105 13.5859C5.40903 12.4139 4.75009 10.8245 4.75 9.16699V2.75C4.75 2.33579 5.08579 2 5.5 2C5.91421 2 6.25 2.33579 6.25 2.75V9.16699C6.25009 10.4267 6.75088 11.6347 7.6416 12.5254C8.53238 13.4161 9.7403 13.917 11 13.917C12.2597 13.917 13.4676 13.4161 14.3584 12.5254C15.2491 11.6347 15.7499 10.4267 15.75 9.16699V2.75C15.75 2.33579 16.0858 2 16.5 2Z" fill="#707A83"/>\n' +
					'</svg>',
				'quote': '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.7002 3.65039C8.21285 3.65046 8.69041 3.87329 9.03125 4.24512C9.36994 4.61478 9.5498 5.1036 9.5498 5.60059V11C9.5498 12.5956 9.25596 13.9528 8.46484 15.1611C7.68229 16.3563 6.4632 17.3296 4.75977 18.2588C4.39633 18.457 3.94071 18.3231 3.74219 17.96C3.54388 17.5964 3.67753 17.1408 4.04102 16.9424C5.63696 16.0718 6.61759 15.2444 7.20996 14.3398C7.68479 13.6146 7.93975 12.7885 8.01953 11.75H3.2998C2.78726 11.7499 2.31053 11.527 1.96973 11.1553C1.631 10.7857 1.45029 10.2977 1.4502 9.80078V5.60059C1.4502 5.10346 1.63083 4.61482 1.96973 4.24512C2.31052 3.87345 2.7873 3.6505 3.2998 3.65039H7.7002ZM3.2998 5.15039C3.2292 5.1505 3.14672 5.18082 3.0752 5.25879C3.00155 5.33918 2.9502 5.46125 2.9502 5.60059V9.80078C2.95029 9.94001 3.00158 10.0623 3.0752 10.1426C3.14668 10.2204 3.22927 10.2499 3.2998 10.25H8.0498V5.60059C8.0498 5.46127 7.99843 5.33918 7.9248 5.25879C7.85322 5.18075 7.77084 5.15046 7.7002 5.15039H3.2998Z" fill="#707A83"/>\n' +
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M18.7002 3.65039C19.2129 3.65046 19.6904 3.87329 20.0312 4.24512C20.3699 4.61478 20.5498 5.10361 20.5498 5.60059V11C20.5498 12.5956 20.256 13.9528 19.4648 15.1611C18.6823 16.3563 17.4632 17.3296 15.7598 18.2588C15.3963 18.457 14.9407 18.3231 14.7422 17.96C14.5439 17.5964 14.6775 17.1408 15.041 16.9424C16.637 16.0718 17.6176 15.2444 18.21 14.3398C18.6848 13.6146 18.9398 12.7885 19.0195 11.75H14.2998C13.7873 11.7499 13.3105 11.527 12.9697 11.1553C12.631 10.7857 12.4503 10.2977 12.4502 9.80078V5.60059C12.4502 5.10346 12.6308 4.61482 12.9697 4.24512C13.3105 3.87345 13.7873 3.6505 14.2998 3.65039H18.7002ZM14.2998 5.15039C14.2292 5.1505 14.1467 5.18082 14.0752 5.25879C14.0016 5.33918 13.9502 5.46125 13.9502 5.60059V9.80078C13.9503 9.94001 14.0016 10.0623 14.0752 10.1426C14.1467 10.2204 14.2293 10.2499 14.2998 10.25H19.0498V5.60059C19.0498 5.46127 18.9984 5.33918 18.9248 5.25879C18.8532 5.18075 18.7708 5.15046 18.7002 5.15039H14.2998Z" fill="#707A83"/>\n' +
					'</svg>',

			}
		})
	}
}