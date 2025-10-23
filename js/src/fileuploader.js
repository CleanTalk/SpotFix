/**
 * File uploader handler for managing file attachments with validation and upload capabilities
 */
class FileUploader {
    /**
     * Create a new FileUploader instance
     * @param {function} escapeHtmlHandler - Function to escape HTML strings for security
     */
    constructor(escapeHtmlHandler) {
        /** @type {Array<{id: string, file: File}>} */
        this.files = [];

        /** @type {number} Maximum allowed file size in bytes */
        this.maxFileSize = 10 * 1024 * 1024; // 10MB

        /** @type {number} Maximum total size for all files in bytes */
        this.maxTotalSize = 50 * 1024 * 1024; // 50MB

        /** @type {string[]} Allowed MIME types for files */
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain', 'application/msword'];

        /** @type {function} HTML escaping function for XSS protection */
        this.escapeHtmlHandler = escapeHtmlHandler;

        /** @type {string[]} File size units for display */
        this.SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'];
    }

    /**
     * Initialize elements and bindings. Should be called only for comments.
     * @returns {void}
     */
    init() {
        this.initializeElements();
        this.bindFilesInputChange();
    }

    /**
     * Define widget elements to work with uploader.
     * @returns {void}
     */
    initializeElements() {
        /** @type {HTMLInputElement|null} */
        this.fileInput = document.getElementById('doboard_task_widget__file-upload__file-input-button');

        /** @type {HTMLElement|null} */
        this.fileList = document.getElementById('doboard_task_widget__file-upload__file-list');

        this.uploaderWrapper = document.getElementById('doboard_task_widget__file-upload__wrapper');

        /** @type {HTMLElement|null} */
        this.errorMessage = document.getElementById('doboard_task_widget__file-upload__error');

        if (!this.fileInput || !this.fileList || !this.errorMessage || this.uploaderWrapper) {
            console.warn('File uploader elements not found');
        }
    }

    /**
     * Define hidden file input change to run uploader logic.
     * @returns {void}
     */
    bindFilesInputChange() {
        if (this.fileInput) {
            this.fileInput.addEventListener('change', (e) => this.handleFileInputChange(e));
        }
    }

    /**
     * Bind action to paperclip button.
     * @param {HTMLElement} element - The paperclip button element
     * @returns {void}
     */
    bindPaperClipAction(element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.fileInput) {
                this.fileInput.click();
            }
        });
    }

    /**
     * Handle file input change event
     * @param {Event} event - File input change event
     * @returns {void}
     */
    handleFileInputChange(event) {
        this.clearError();

        const selectedFiles = Array.from(event.target.files);
        const validFiles = selectedFiles.filter(file => this.validateFile(file));

        validFiles.forEach(file => this.addFile(file));

        // Reset input to allow selecting same files again
        event.target.value = '';

        // show wrapper
        this.uploaderWrapper.style.display = 'block';
    }

    /**
     * Validate a file against upload constraints
     * @param {File} file - File to validate
     * @returns {boolean} True if file is valid, false otherwise
     */
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            this.showError(`File "${file.name}" is too large. Maximum size: ${this.formatFileSize(this.maxFileSize)}`);
            return false;
        }

        // Check total size
        const totalSize = this.getTotalSize() + file.size;
        if (totalSize > this.maxTotalSize) {
            this.showError(`Total files size exceeded. Maximum: ${this.formatFileSize(this.maxTotalSize)}`);
            return false;
        }

        // Check file type
        if (this.allowedTypes.length > 0 && !this.allowedTypes.includes(file.type)) {
            this.showError(`File type "${file.type}" for "${file.name}" is not supported.`);
            return false;
        }

        return true;
    }

    /**
     * Calculate total size of all files
     * @returns {number} Total size in bytes
     */
    getTotalSize() {
        return this.files.reduce((sum, fileData) => sum + fileData.file.size, 0);
    }

    /**
     * Add a file to the upload queue
     * @param {File} file - File to add
     * @returns {void}
     */
    addFile(file) {
        const fileWithId = {
            id: this.generateFileId(),
            file: file
        };

        this.files.push(fileWithId);
        this.renderFileList();
    }

    /**
     * Generate a unique file ID
     * @returns {string} Unique file identifier
     * @private
     */
    generateFileId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Remove a file from the upload queue
     * @param {string} fileId - ID of the file to remove
     * @returns {void}
     */
    removeFile(fileId) {
        this.files = this.files.filter(f => f.id !== fileId);
        this.renderFileList();
        this.clearError();
    }

    /**
     * Render the file list in the UI
     * @returns {void}
     */
    renderFileList() {
        if (!this.fileList) return;

        if (this.files.length === 0) {
            this.fileList.innerHTML = ksesFilter('<div style="text-align: center; color: #444c529e;">No files attached</div>');
            return;
        }

        const fileItems = this.files.map(fileData => this.createFileItem(fileData));
        this.fileList.innerHTML = ksesFilter('');
        fileItems.forEach(item => this.fileList.appendChild(item));
    }

    /**
     * Create file item element for display
     * @param {object} fileData - File data object
     * @param {string} fileData.id - File identifier
     * @param {File} fileData.file - File object
     * @returns {HTMLDivElement} File item DOM element
     */
    createFileItem(fileData) {
        const { file, id } = fileData;
        const fileItem = document.createElement('div');
        fileItem.className = 'doboard_task_widget__file-upload__file-item';

        fileItem.innerHTML = ksesFilter(`
            <div class="doboard_task_widget__file-upload__file-item-content">
                <div class="doboard_task_widget__file-upload__file_info">
                    <div class="doboard_task_widget__file-upload__file-name">${this.escapeHtmlHandler(String(file.name))}</div>
                    <div class="doboard_task_widget__file-upload__file_size">${this.formatFileSize(file.size)}</div>
                </div>
            </div>
            <button type="button" class="doboard_task_widget__file-upload__remove-btn" data-file-id="${id}" aria-label="Remove file">×</button>
        `);

        const removeBtn = fileItem.querySelector('.doboard_task_widget__file-upload__remove-btn');
        removeBtn.addEventListener('click', () => this.removeFile(id));

        return fileItem;
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size string
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + this.SIZE_UNITS[i];
    }

    /**
     * Show uploader error message
     * @param {string} message - Error message to display
     * @returns {void}
     */
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
    }

    /**
     * Clear uploader error message
     * @returns {void}
     */
    clearError() {
        if (this.errorMessage) {
            this.errorMessage.textContent = '';
            this.errorMessage.style.display = 'none';
        }
    }

    /**
     * Check if there are files to send
     * @returns {boolean} True if files are present, false otherwise
     */
    hasFiles() {
        return this.files.length > 0;
    }

    /**
     * Clear all files from upload queue
     * @returns {void}
     */
    clearFiles() {
        this.files = [];
        this.renderFileList();
    }

    /**
     * Validate file data structure before upload
     * @param {object} fileData - File data object to validate
     * @param {string} fileData.sessionId - Session identifier
     * @param {object} fileData.params - Additional parameters
     * @param {string} fileData.params.accountId - Account identifier
     * @param {string} fileData.params.projectToken - Project token
     * @param {string} fileData.commentId - Comment identifier
     * @param {string} fileData.fileName - File name
     * @param {File} fileData.fileBinary - File binary data
     * @returns {object} Validated file data
     * @throws {Error} When file data validation fails
     */
    validateFileData(fileData) {
        const validations = [
            { field: 'sessionId', type: 'string', message: 'No valid session found.' },
            { field: 'params.accountId', type: 'string', message: 'No valid account ID found.' },
            { field: 'params.projectToken', type: 'string', message: 'No valid project token found.' },
            { field: 'commentId', type: 'string', message: 'No valid commentId found.' },
            { field: 'fileName', type: 'string', message: 'No valid filename found.' }
        ];

        for (const validation of validations) {
            const value = this.getNestedValue(fileData, validation.field);
            if (!value || typeof value !== validation.type) {
                throw new Error(validation.message);
            }
        }

        if (!fileData.fileBinary || !(fileData.fileBinary instanceof File)) {
            throw new Error('No valid file object found.');
        }

        return fileData;
    }

    /**
     * Helper to get nested object values
     * @param {object} obj - Object to traverse
     * @param {string} path - Dot notation path to value
     * @returns {*} Value at the specified path
     * @private
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * Send single file attachment
     * @param {object} fileData - File data for upload
     * @returns {Promise<object>} Upload response
     */
    async sendSingleAttachment(fileData) {
        const validatedFileData = await this.validateFileData(fileData);
        return await attachmentAddDoboard(validatedFileData);
    }

    /**
     * Send all attachments for a comment
     * @param {object} params - Upload parameters
     * @param {string} sessionId - Session identifier
     * @param {string} commentId - Comment identifier
     * @returns {Promise<object>} Upload results
     */
    async sendAttachmentsForComment(params, sessionId, commentId) {
        /** @type {object} */
        const results = {
            preparedFilesCount: this.files.length,
            sentFilesCount: 0,
            fileResults: [],
            success: true
        };

        for (let i = 0; i < this.files.length; i++) {
            const fileData = this.files[i];
            /** @type {object} */
            const result = {
                success: false,
                response: null,
                error: null
            };

            try {
                const attachmentData = {
                    params,
                    sessionId,
                    commentId,
                    fileName: fileData.file.name,
                    fileBinary: fileData.file,
                    attachmentOrder: i
                };

                const response = await this.sendSingleAttachment(attachmentData);
                result.response = response;
                result.success = response.status === 200;

                if (result.success) {
                    results.sentFilesCount++;
                }
            } catch (error) {
                result.error = error.message;
            }

            results.fileResults.push(result);
        }

        results.success = results.preparedFilesCount === results.sentFilesCount;
        this.clearFiles();

        return results;
    }
}
