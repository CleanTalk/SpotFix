class SpotFixTemplatesLoader {
    static getTemplateCode(templateName) {
        const templateMethod = this[templateName];

        if (typeof templateMethod !== 'function') {
            throw new Error(`Template method '${templateName}' not found`);
        }

        let template = templateMethod.call(this).trim();

        return template;
    }

    static all_issues() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardGreen}}"  alt="">
            <span>All spots </span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="addNewTaskButton">
                <img src="{{iconPlus}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container">
        </div>
        <div class="doboard_task_widget_tasks_list">
            <a rel="nofollow" target="_blank" href="https://doboard.com/spotfix">
             doBoard / SpotFix
            </a>
        </div>
    </div>
</div>`;
    }

    static concrete_issue() {
        return `
<div class="{{contenerClasess}}">
    <div class="doboard_task_widget-header">
        <div class="doboard_task_widget_return_to_all doboard_task_widget_cursor-pointer">
            <img src="{{chevronBack}}" alt="" title="Return to all spots list">
            <span title="Return to all spots list"> All {{issuesCounter}}</span>
        </div>
        <div class="doboard_task_widget-issue-title">{{issueTitle}}</div>
        <div class="doboard_task_widget-header-icons">
            <span id="addNewTaskButton">
                <img src="{{iconPlus}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-concrete_issue">
        <div style="background-color: #D6DDE3; padding: 12px 16px">
                <a rel="nofollow" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
        </div>
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-concrete_issues-container">
        </div>
        <div class="doboard_task_widget-send_message">
            <div class="doboard_task_widget-send_message_elements_wrapper">
                <button type="button" class="doboard_task_widget-send_message_paperclip">
                    <img src="{{buttonPaperClip}}" alt="Attach a file">
                    <div class="doboard_task_widget-paperclip-tooltip">
                        Upload up to 5 JPG, PNG, GIF, PDF, TXT or DOC files (5MB each, 25MB total).
                    </div>
                </button>
    
                <div class="doboard_task_widget-send_message_input_wrapper">
                    <textarea name="doboard_task_widget_message" class="doboard_task_widget-send_message_input" placeholder="Write a message..."></textarea>
                </div>
    
                <button type="button" class="doboard_task_widget-send_message_button">
                    <img src="{{buttonSendMessage}}" alt="Send message" title="Send message">
                </button>
            </div>
            <div class="doboard_task_widget__file-upload__wrapper" id="doboard_task_widget__file-upload__wrapper">
                <div class="doboard_task_widget__file-upload__list-header">Attached files</div>
                <div class="doboard_task_widget__file-upload__file-list" id="doboard_task_widget__file-upload__file-list"></div>
                <div class="doboard_task_widget__file-upload__error" id="doboard_task_widget__file-upload__error"></div>
                <input type="file" class="doboard_task_widget__file-upload__file-input-button" id="doboard_task_widget__file-upload__file-input-button" multiple accept="*/*">
            </div>
        </div>
    </div>
</div>
`;
    }

    static concrete_issue_day_content() {
        return `
<div class="doboard_task_widget-concrete_issue-day_content">
    <div class="doboard_task_widget-concrete_issue_day_content-month_day">{{dayContentMonthDay}}</div>
    <div class="doboard_task_widget-concrete_issue_day_content-messages_wrapper">{{dayContentMessages}}</div>
    {{statusFixedHtml}}
</div>
`;
    }

    static concrete_issue_messages() {
        return `
<div class="doboard_task_widget-comment_data_wrapper doboard_task_widget-comment_data_{{issueMessageClassOwner}}">
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-comment_text_container">
        <div class="doboard_task_widget-comment_body">{{commentBody}}</div>
        <div class="doboard_task_widget-comment_time">{{commentTime}}</div>
    </div>
</div>
`;
    }

    static create_issue() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div style="display: flex;align-items: center;gap: 8px;">
            <img src="{{logoDoBoardGreen}}"  alt="">
            <span>Report an issue</span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="openUserMenuButton">
                 <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-create_issue">

        <div class="doboard_task_widget-element-container">
            <span>
                Tell us about any issue you’re experiencing on <span style="color: #000000;">{{currentDomain}}</span>. 
                You’re also welcome to review spelling, grammar, or ask a question related to this page.
            </span>
        </div>

        <div class="doboard_task_widget-input-container">
            <input id="doboard_task_widget-title" class="doboard_task_widget-field" name="title" value="{{selectedText}}" required>
            <label for="doboard_task_widget-title">Report about</label>
        </div>

        <div class="doboard_task_widget-input-container">
            <textarea id="doboard_task_widget-description" class="doboard_task_widget-field" name="description" required></textarea>
            <label for="doboard_task_widget-description">Description</label>
        </div>

        <div class="doboard_task_widget-login">

            <span  class="doboard_task_widget-login-icon" >If you want to receive notifications by email write here you email contacts.</span>

            <div class="doboard_task_widget-accordion">
            
                   <div class="doboard_task_widget-input-container-phantom">
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-user_name" class="doboard_task_widget-field" type="text" name="user_name">
                            <label for="doboard_task_widget-user_name">Nickname</label>
                        </div>
        
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-user_email" class="doboard_task_widget-field" type="email" name="user_email">
                            <label for="doboard_task_widget-user_email">Email</label>
                        </div>
        
                        <div class="doboard_task_widget-input-container hidden">
                            <input id="doboard_task_widget-user_password" class="doboard_task_widget-field" type="password" name="user_password">
                            <label for="doboard_task_widget-user_password">Password</label>
                        </div>
        
                        <i>Note about DoBoard register and accepting email notifications about tasks have to be here.</i>
                        </br>
                        <i>If you are a doBoard user, use same Email and password as at <a href="https://doboard.com" target="_blank" rel="nofollow">doboard.com</a>
                            on the <span id="doboard_task_widget-show_login_form" class="doboard_task_widget-show_login_form">login page</span>
                         </i>
                 </div> 
                     
                 <div id="doboard_task_widget-input-container-login" class="doboard_task_widget-input-container-login doboard_task_widget-hidden">
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-login_email" class="doboard_task_widget-field" type="email" name="login_email">
                            <label for="doboard_task_widget-login_email">Email</label>
                        </div>
                        <div class="doboard_task_widget-input-container">
                            <input id="doboard_task_widget-login_password" class="doboard_task_widget-field" type="password" name="login_password">
                            <label for="doboard_task_widget-login_password">Password</label>
                            <span class="doboard_task_widget-bottom-eye-icon" id="doboard_task_widget-password-toggle"></span>
                        </div>
                        <div>  
                                <span id="doboard_task_widget-forgot_password" class="doboard_task_widget-forgot_password">Forgot Password?</span>
                        </div> 
                        <div class="doboard_task_widget-login-buttons-wrapper">
                            <button id="doboard_task_widget-on_phantom_login_page" class="doboard_task_widget-submit_button">Cancel</button>
                            <button id="doboard_task_widget-login_button" class="doboard_task_widget-submit_button">Log in</button>
                        </div>
                        <div>
                            <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Logon or password is invalid </span></i>
                        </div>
                 </div>
                 <div id="doboard_task_widget-container-login-forgot-password-form" class="doboard_task_widget-forgot_password_form doboard_task_widget-hidden">
                     <div class="doboard_task_widget-input-container">
                         <input id="doboard_task_widget-forgot_password_email" class="doboard_task_widget-field" type="email" name="forgot_password_email">
                         <label for="doboard_task_widget-forgot_password_email">Email</label>
                     </div>
                     <div class="doboard_task_widget-login-buttons-wrapper">
                         <button id="doboard_task_widget-forgot_password-black" class="doboard_task_widget-submit_button">Cancel</button>
                         <button id="doboard_task_widget-restore_password_button" class="doboard_task_widget-submit_button">Restore password</button>
                     </div>
                </div>
            </div>

        </div>

        <div class="doboard_task_widget-field">
            <button id="doboard_task_widget-submit_button" class="doboard_task_widget-submit_button">Submit</button>
        </div>

        <div class="doboard_task_widget-message-wrapper hidden">
            <span id="doboard_task_widget-error_message-header"></span>
            <div id="doboard_task_widget-error_message"></div>
        </div>
    </div>
</div>
`;
    }

    static list_issues() {
        return `
<div class="doboard_task_widget-task_row issue-item {{elementBgCSSClass}}" data-node-path='[{{nodePath}}]' data-task-id='{{taskId}}'>
    <div class="{{avatarCSSClass}}" style="{{avatarStyle}}">
        <span class="doboard_task_widget-avatar-initials {{initialsClass}}">{{taskAuthorInitials}}</span>
    </div>
    <div class="doboard_task_widget-description_container">
        <div class="doboard_task_widget-task_title">
            <div class="doboard_task_widget-task_title-details">
                <span class="doboard_task_widget-task_title-text">{{taskTitle}}</span>
                <div class="doboard_task_widget-task_title_public_status_img">
                    <img src="{{taskPublicStatusImgSrc}}" alt="" title="{{taskPublicStatusHint}}">
                </div>
                <span class="doboard_task_widget-task_title-unread_block {{classUnread}}"></span>
            </div>
<!--            <div class="doboard_task_widget-task_title-last_update_time">{{taskLastUpdate}}</div>-->
        </div>
        <div class="doboard_task_widget-bottom">
            <div class="doboard_task_widget-task_page_url">
                <img src="{{iconLinkChain}}" />
                <a title="The spot is located on this {{taskPageUrl}}" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
             </div>
                {{statusFixedHtml}}
        </div>
    </div>
</div>
`;
    }

    static user_menu() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-user_menu-header">
        <div class="doboard_task_widget-user_menu-header-top">
            <div id="spotfix_back_button" class="doboard_task_widget_cursor-pointer" 
            style="display: flex;align-items: center;gap: 8px;">
                <img src="{{chevronBackDark}}" alt="">
                <span> Back</span>
            </div>
            <div>
                <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
            </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
             <img class="doboard_task_widget-user_menu-header-avatar" src="{{avatar}}" alt="">
             <span class="doboard_task_widget-user_menu-header-user-name" style="font-size: 16px; font-weight: 700">{{userName}}</span>
             <span class="doboard_task_widget-user_menu-header-email" style="font-size: 12px;">{{email}}</span>
        </div>
    </div>
    <div class="doboard_task_widget-content" style="min-height:200px ">
        <div style="height: 392px">
        <div style="position: sticky; top: 0">
            <div class="doboard_task_widget-user_menu-item">
                <img src="{{iconEye}}" alt="" style="margin-right: 12px">
                <div style="display: flex; justify-content: space-between; flex-grow: 1; align-items: center">
                    <span style="display: inline-flex; flex-direction: column">
                        <span style="font-weight: 500; font-size: 14px; color: #252A2F">
                        Show widget on my screen</span>
                        <span style="font-size: 10px; color: #40484F">
                        The widget will be visible again if you select any text on the site</span>
                    </span>
                    <label class="toggle" style="margin-left: 8px">
                      <input id="widget_visibility" type="checkbox">
                      <span class="slider"></span>
                    </label>
                </div>
            </div>
            <div class="doboard_task_widget-user_menu-item">
                <span id="doboard_task_widget-user_menu-logout_button">
                    <img src="{{iconDoor}}" alt="" style="margin-right: 12px; cursor: pointer">
                    <span class="logout_button">Log out</span>
                </span>
            </div>
            
            <div id="doboard_task_widget-input-container-login" class="doboard_task_widget-input-container-login doboard_task_widget-input-container-login-menu ">
                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-login_email" class="doboard_task_widget-field" type="email" name="login_email">
                    <label for="doboard_task_widget-login_email">Email</label>
                </div>
                <div class="doboard_task_widget-input-container">
                    <input id="doboard_task_widget-login_password" class="doboard_task_widget-field" type="password" name="login_password">
                    <label for="doboard_task_widget-login_password">Password</label>
                    <span class="doboard_task_widget-bottom-eye-icon" id="doboard_task_widget-password-toggle"></span>
                </div>
                <div>
                        <span id="doboard_task_widget-forgot_password" class="doboard_task_widget-forgot_password">Forgot Password?</span>
                </div>
                <div class="doboard_task_widget-field">
                    <button id="doboard_task_widget-login_button" class="doboard_task_widget-submit_button">Log in</button>
                </div>
                <div>
                    <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Logon or password is invalid </span></i>
                </div>
             </div>
             <div id="doboard_task_widget-container-login-forgot-password-form" class="doboard_task_widget-forgot_password_form doboard_task_widget-forgot_password_form-menu doboard_task_widget-hidden">
                 <div class="doboard_task_widget-input-container">
                     <input id="doboard_task_widget-forgot_password_email" class="doboard_task_widget-field" type="email" name="forgot_password_email">
                     <label for="doboard_task_widget-forgot_password_email">Email</label>
                 </div>
                 <div class="doboard_task_widget-login-buttons-wrapper">
                     <button id="doboard_task_widget-forgot_password-black" class="doboard_task_widget-submit_button">Cancel</button>
                     <button id="doboard_task_widget-restore_password_button" class="doboard_task_widget-submit_button">Restore password</button>
                 </div>
            </div>
            
        </div>
        </div>
        <div style="padding: 16px; font-size: 13px; position: sticky; bottom: 0">
            <span>{{spotfixVersion}}</span>
            <span>Powered by
            <a rel="nofollow" target="_blank" href="https://doboard.com">
             doBoard
            </a></span>
        </div>
        <div class="doboard_task_widget-message-wrapper hidden">
            <span id="doboard_task_widget-error_message-header"></span>
        <div id="doboard_task_widget-error_message"></div>
    </div>
    </div>
</div>`;
    }

    static wrap() {
        return `
<div class="doboard_task_widget-wrap" style="bottom: {{position}}">
<img src="{{iconMarker}}" />
<!--    <img src="{{logoDoBoardWrap}}" alt="Doboard logo">-->
    <div id="doboard_task_widget-task_count" class="hidden"></div>
</div>`;
    }

    static wrap_review() {
        return `
<button id="doboard_task_widget_button" class="doboard_task_widget-wrap wrap_review" style="bottom: {{position}};">
<img src="{{iconMarker}}" />
<span id="review_content_button_text">Review content</span>
</button>`;
    }

    static fixedHtml() {
        return `<p><span class="doboard_task_widget-bottom-is-fixed">Finished</span></p>`;
    }
    static fixedTaskHtml() {
        return `<p class="doboard_task_widget-bottom-is-fixed-task-block"><span class="doboard_task_widget-bottom-is-fixed-task">This issue already fixed</span></p>`;
    }

}
