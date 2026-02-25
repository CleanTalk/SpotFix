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
            <span title="Number of spots on the page and total">All spots </span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="addNewTaskButton">
                <img src="{{iconPlus}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container" style="margin-top: 0px">
        </div>
        <div class="doboard_task_widget_tasks_list">
            <span>doBoard / SpotFix</span>
        </div>
    </div>
</div>`;
    }

    static concrete_issue() {
        return `
<div id="doboard_task_widget_concrete-container" class="{{contenerClasess}}">
    <div class="doboard_task_widget-header" style="height: 42px; padding-top: 10px; align-items: flex-start">
        <div class="doboard_task_widget_return_to_all doboard_task_widget_cursor-pointer">
            <img src="{{chevronBack}}" alt="" title="Return to all spots list">
            <span title="Return to all spots list"> All {{issuesCounter}}</span>
        </div>
        <div class="doboard_task_widget-issue-title">
            <span style="text-align: center">{{issueTitle}}</span>
            <span>{{amountOfComments}}</span>
        </div>
        <div class="doboard_task_widget-header-icons">
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-concrete_issue">
        <div id="spotfix_doboard_task_widget_url" class="spotfix_doboard_task_widget_url">
                <a rel="nofollow" style="word-break: break-all" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
        </div>
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-concrete_issues-container">
        </div>
        <div class="doboard_task_widget-send_message doboard_task_widget-spotfix-editor">
             <textarea name="doboard_task_widget_message" id="doboard_task_widget-send_message_input_SpotFix" class="doboard_task_widget-send_message_input" placeholder="Write a message..."></textarea>
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
            <span id="maximizeWidgetContainer">
                <img src="{{iconMaximize}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <span id="openUserMenuButton">
                 <img src="{{iconEllipsesMore}}"  alt="" class="doboard_task_widget_cursor-pointer">
            </span>
            <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
        </div>
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-create_issue" style="display: flex; flex-direction: column">

        <div class="doboard_task_widget-element-container">
            <span>
                Tell us about any issue you’re experiencing on <span style="text-decoration: underline">{{currentDomain}}</span>. 
                You’re also welcome to review spelling, grammar, or ask a question related to this page.
            </span>
        </div>

        <div class="doboard_task_widget-input-container">
            <input id="doboard_task_widget-title" class="doboard_task_widget-field" name="title" value="{{selectedText}}" required>
            <label class="spotfix_placeholder_title" for="doboard_task_widget-title">Report about</label>
        </div>

        <div id="doboard_task_widget-description-container" class="doboard_task_widget-input-container doboard_task_widget-input-container-textarea" style="flex-grow: 1; min-height: 200px">
            <textarea id="doboard_task_widget-description" class="doboard_task_widget-field" name="description" placeholder=" " required></textarea>
            <label for="doboard_task_widget-description" class="doboard_task_widget-field-textarea-label" >Description</label>
        </div>

        <div id="doboard_task_widget-require_full_registration" class="doboard_task_widget-require_full_registration doboard_task_widget-hidden">
            <span class="doboard_task_widget-require_full_registration-title">Require full registration</span>
        </div>

        <div class="doboard_task_widget-login">

            <span  class="doboard_task_widget-login-icon" >Sign up here to receive notifications.</span>

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
        
                        <button id="doboard_task_widget-register_only_button" class="doboard_task_widget-submit_button doboard_task_widget-hidden" style="margin-top: 8px; width: 100%;">Sign up</button>
        
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
                            <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Login or password is invalid </span></i>
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

        <div class="doboard_task_widget-field" style="margin-top: 8px">
            <div class="doboard_task_widget-visibility-toggle">
              <div style="display: flex; align-items: center">
                  <img src="{{iconPublic}}" alt="">
                  <span style="color: #252A2F; margin-left: 6px;">Public
                  <span style="color: #707A83; font-size: 12px; margin-left: 6px;">(your message will be public to all visitors)</span>
                  </span>
              </div>      
              <label class="toggle" style="margin-left: 8px; top: 4px">
                  <input id="spotfix-widget-create-task-visibility" type="checkbox">
                  <span class="slider"></span>
              </label>
            </div>
            <button id="doboard_task_widget-submit_button" style="min-width: 270px" class="doboard_task_widget-submit_button">Send report</button>
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
    <div class="doboard_task_widget-description_container" style="cursor: default">
        <div class="doboard_task_widget-task_title" style="cursor: pointer">
            <div class="doboard_task_widget-task_title-details">
                    <span class="doboard_task_widget-task_title-text">{{taskTitle}}</span>
                    <img src="{{iconOfVisibility}}" alt="">
                <div class="doboard_task_widget-task_title_public_status_img">
                    <img src="{{taskPublicStatusImgSrc}}" alt="" title="{{taskPublicStatusHint}}">
                </div>
                <span class="doboard_task_widget-task_title-unread_block {{classUnread}}"></span>
            </div>
            <div class="doboard_task_widget-task_title-last_update_time">{{taskLastUpdate}}</div>
        </div>
        <div class="doboard_task_widget-bottom">
            <div class="doboard_task_widget-task_page_url">
                <img src="{{iconLinkChain}}" />
                   <a class="spotfix_widget_task_url" title="The spot is located on this {{taskPageUrlFull}}">{{taskPageUrl}}</a>
                   <a class="spotfix_widget_task_url-short" style="display: none" title="The spot is located on this {{taskPageUrlFull}}">{{taskFormattedPageUrl}}</a>
                   <a class="spotfix_widget_task_url-full" style="display: none" title="The spot is located on this {{taskPageUrlFull}}">{{taskPageUrlFull}}</a>
             </div>
                {{statusFixedHtml}}
                {{amountOfComments}}
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
             <span id="spotfix_user-menu_name" style="font-size: 16px; font-weight: 700">{{userName}}</span>
             <span id="spotfix_user-menu_email" style="font-size: 12px;">{{email}}</span>
             <span id="doboard_task_widget-user_menu-signlog_button" style="display: none">
                 <a style="cursor: pointer" rel="nofollow" target="_blank">Sign up or Log in</a>
             </span>
        </div>
    </div>
    <div class="doboard_task_widget-content" style="min-height:200px ">
        <div style="height: 392px">
        <div style="position: sticky; top: 0; margin-top: 8px">
            <div class="doboard_task_widget-user_menu-item">
                <img src="{{iconEye}}" alt="" style="margin-right: 12px">
                <div style="display: flex; justify-content: space-between; flex-grow: 1; align-items: center">
                    <span style="display: inline-flex; flex-direction: column">
                        <span style="font-weight: 500; font-size: 14px; color: #252A2F; margin-bottom: 4px">
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
            <div class="doboard_task_widget-user_menu-item" style="display: none">
                <span id="doboard_task_widget-user_menu-logout_button">
                    <img src="{{iconDoor}}" alt="" style="margin-right: 12px; cursor: pointer">
                    <span class="logout_button">Log out</span>
                </span>
            </div>
            
            <div id="doboard_task_widget-input-container-login" style="display: none"
            class="doboard_task_widget-input-container-login doboard_task_widget-input-container-login-menu ">
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
                    <i><span id="doboard_task_widget-login-is-invalid" class="doboard_task_widget-login-is-invalid doboard_task_widget-hidden">Login or password is invalid </span></i>
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
        <div style="padding: 16px; font-size: 13px; position: sticky; bottom: 0; margin-top: 12px">
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
        return `<p style="margin: 0"><span class="doboard_task_widget-bottom-is-fixed">Finished</span></p>`;
    }
    static fixedTaskHtml() {
        return `<p class="doboard_task_widget-bottom-is-fixed-task-block"><span class="doboard_task_widget-bottom-is-fixed-task">This issue already fixed</span></p>`;
    }

}
