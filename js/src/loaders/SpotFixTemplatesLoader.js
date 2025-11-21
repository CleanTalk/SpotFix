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
            <img src="{{logoDoBoardWhite}}"  alt="">
            <span>All spots </span>
        </div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-all_issues">
        <div class="doboard_task_widget-spinner_wrapper_for_containers">
            <div class="doboard_task_widget-spinner_for_containers"></div>
        </div>
        <div class="doboard_task_widget-all_issues-container">
        </div>
        <div class="doboard_task_widget_tasks_list">
            <a target="_blank" href="https://doboard.com/spotfix">
            The Site Improver by SpotFix
            </a>
        </div>
    </div>
</div>`;
    }

    static concrete_issue() {
        return `
<div class="doboard_task_widget-container">
    <div class="doboard_task_widget-header">
        <div class="doboard_task_widget_return_to_all doboard_task_widget_cursor-pointer">
            <img src="{{chevronBack}}" alt="" title="Return to all spots list">
            <span title="Return to all spots list"> All {{issuesCounter}}</span>
        </div>
        <div class="doboard_task_widget-issue-title">{{issueTitle}}</div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-concrete_issue">
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
            <img src="{{logoDoBoardWhite}}"  alt="">
            <span>Report an issue</span>
        </div>
        <img src="{{buttonCloseScreen}}"  alt="" class="doboard_task_widget-close_btn doboard_task_widget_cursor-pointer">
    </div>
    <div class="doboard_task_widget-content doboard_task_widget-create_issue">

        <div class="doboard_task_widget-element-container">
            <span>
                If you found issue with <span style="color: #000000;">{{currentDomain}}</span> page, you are in right place. Please use this form to tell us about the issue you’re experiencing.
                <a href="https://doboard.com" target="_blank">doboard.com</a>
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

            <span>If you want to receive notifications by email write here you email contacts.</span>

            <div class="doboard_task_widget-accordion">

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
<div class="doboard_task_widget-task_row issue-item" data-node-path='[{{nodePath}}]' data-task-id='{{taskId}}'>
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
        <div class="doboard_task_widget-task_page_url">
            <img src="{{iconLinkChain}}" />
            <a title="The spot is located on this URL" href="{{taskPageUrl}}">{{taskFormattedPageUrl}}</a>
         </div>
    </div>
</div>
`;
    }

    static wrap() {
        return `
<div class="doboard_task_widget-wrap">
<img src="{{iconSpotWidgetWrapPencil}}" />
<!--    <img src="{{logoDoBoardWrap}}" alt="Doboard logo">-->
    <div id="doboard_task_widget-task_count" class="hidden"></div>
</div>`;
    }

    static wrap_review() {
        return `
<button id="doboard_task_widget_button" class="doboard_task_widget-wrap wrap_review">
<img src="{{iconSpotWidgetWrapPencil}}" />
<span id="review_content_button_text">Review content</span>
</button>`;
    }
}
