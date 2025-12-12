/**
 * SELECTION will be grouped into three types:
 * 1 - Simple text within a single tag
 * 2 - Image tags
 * 3 - Any tag containing nested content
 * Each type will be processed differently.
 */
const SPOTFIX_SELECTION_TYPE_TEXT = 'text';
const SPOTFIX_SELECTION_TYPE_IMG = 'image';
const SPOTFIX_SELECTION_TYPE_ELEMENT = 'element';

/**
 * Determines the type of selection
 * @param {Selection} selection - The DOM Selection object
 * @returns {string|null} Selection type
 */
function spotFixGetSelectionType(selection) {
    const range = selection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    // Case 1: Image selection
    if (spotFixGetSelectedImage(selection)) {
        return SPOTFIX_SELECTION_TYPE_IMG;
    }

    // Case 2: Element with nested content
    if (commonAncestor.nodeType === Node.ELEMENT_NODE &&
        commonAncestor.childNodes.length > 1 &&
        range.toString().trim() === '' &&
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE) {
        return SPOTFIX_SELECTION_TYPE_ELEMENT;
    }

    // Case 3: Simple text
    const hasTextContent = range.toString().trim().length > 0;
    const isTextNode = commonAncestor.nodeType === Node.TEXT_NODE;
    const isCollapsed = range.collapsed;

    if (hasTextContent && (isTextNode || !isCollapsed)) {
        return SPOTFIX_SELECTION_TYPE_TEXT;
    }

    return null;
}

/**
 * Extracts selection data from DOM Selection object
 * @param {Selection} selection - The DOM Selection object
 * @returns {Object|null} Selection data with text, positions, URL and node path OR null (nothing)
 */
function spotFixGetSelectedData(selection) {
    // Prechecks:
    // Selection not provided
    if (!selection) {spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection not provided`'); return null;  }
    // Range not provided
    if (selection.rangeCount === 0) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Range not provided`'); return null; }
    // Several ranges provided
    if (selection.rangeCount > 1) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Several ranges provided`'); return null; }

    const range = selection.getRangeAt(0);
    // Selection must be within a single DOM element.
    if (range.startContainer !== range.endContainer) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection within several tags nodes`'); return null; }

    // FIRST - check selection type
    const selectionType = spotFixGetSelectionType(selection);

    // Selection type not determined
    if (!selectionType) { spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection type not determined`'); return null; }

    // SECOND - generate selectedData for each selectionType
    let selectedText = '';
    let startSelectPosition = 0;
    let endSelectPosition = 0;
    let nodePath = '';
    let imageUrl = '';

    const commonNode = range.commonAncestorContainer;

    switch (selectionType) {
        case SPOTFIX_SELECTION_TYPE_TEXT:
            if (range.toString().trim().length === 0) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection text is empty`');
                return null;
            }
            const commonNodeElement = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            selectedText = range.toString();
            startSelectPosition = range.startOffset;
            endSelectPosition = range.endOffset;
            if ( startSelectPosition === 0 && selectedText.length > endSelectPosition ) {
                endSelectPosition = selectedText.length;
            }
            nodePath = spotFixCalculateNodePath(commonNodeElement);
            break;

        case SPOTFIX_SELECTION_TYPE_IMG:
            const imgElement = range.startContainer;
            const selectedImage = spotFixGetSelectedImage(selection);
            selectedText = `Image (${selectedImage.alt ? selectedImage.alt : 'no description'})`;
            nodePath = spotFixCalculateNodePath(selectedImage);
            // For images, positions represent the image element position in parent
            startSelectPosition = Array.from(imgElement.parentNode.children).indexOf(imgElement);
            endSelectPosition = startSelectPosition + 1;
            break;

        case SPOTFIX_SELECTION_TYPE_ELEMENT:
            const element = commonNode.nodeType === Node.ELEMENT_NODE ? commonNode : commonNode.parentElement;
            if (element.childNodes.length <= 1) {
                spotFixDebugLog('`spotFixGetSelectedData` skip by `Selection have not inner data`');
                return null;
            }
            selectedText = element.textContent || '';
            nodePath = spotFixCalculateNodePath(element);
            // For elements, positions represent the element's position in parent
            startSelectPosition = Array.from(element.parentNode.children).indexOf(element);
            endSelectPosition = startSelectPosition + 1;
            break;
    }

    // Get page URL
    const pageURL = window.location.href;

    return {
        startSelectPosition,
        endSelectPosition,
        selectedText: selectedText.trim(),
        pageURL,
        nodePath,
        selectionType,
        imageUrl: selectionType === SPOTFIX_SELECTION_TYPE_IMG ? imageUrl : ''
    };
}

/**
 * Highlight elements.
 * @param {[object]} spotsToBeHighlighted
 * @param widgetInstance
 */
function spotFixHighlightElements(spotsToBeHighlighted, widgetInstance) {

    if (spotsToBeHighlighted.length === 0) return;

    const elementsMap = new Map();

    // Grouping elements with validation
    spotsToBeHighlighted.forEach(spot => {
        // nodePath validating: is array
        if (!spot?.nodePath || !Array.isArray(spot?.nodePath)) {
            spotFixDebugLog('Invalid spot: missing or invalid nodePath: ' + spot);
            return;
        }

        // nodePath validating: is valid indexes list
        if (!this.spotFixIsValidNodePath(spot.nodePath)) {
            spotFixDebugLog('Invalid nodePath format: ' + spot.nodePath);
            return;
        }

        const element = spotFixRetrieveNodeFromPath(spot.nodePath);
        if (!element) {
            spotFixDebugLog('Element not found for path: ' + spot.nodePath);
            return;
        }

        if ( ! spot.selectionType ) {
            // @ToDo need to apply backward capability here
            // just `spot.selectionType = 'text';` is not able, this opens ability to unauthorized modify website content
            spotFixDebugLog('Selection type is not provided.');
            return;
        }

        // selectionType parameter validating
        if (
            spot.selectionType &&
            ![
                SPOTFIX_SELECTION_TYPE_TEXT,
                SPOTFIX_SELECTION_TYPE_IMG,
                SPOTFIX_SELECTION_TYPE_ELEMENT
            ].includes(spot.selectionType)
        ) {
            spotFixDebugLog('Invalid selection type: ' + spot.selectionType);
            return;
        }

        if (!elementsMap.has(element)) {
            elementsMap.set(element, []);
        }
        elementsMap.get(element).push(spot);
    });

    elementsMap.forEach((spots, element) => {
        const selectionType = spots[0].selectionType;

        // MAIN LOGIC: highlight for the different types
        switch (selectionType) {
            case 'image':
                this.spotFixHighlightImageElement(element);
                break;

            case 'element':
                this.spotFixHighlightNestedElement(element);
                break;

            case 'text':
                this.spotFixHighlightTextInElement(element, spots, widgetInstance);
                break;

            default:
                spotFixDebugLog('Unknown selection type: ' + selectionType);
        }
    });
}

/**
 * Highlight image element by adding class
 * @param {Element} element
 */
function spotFixHighlightImageElement(element) {
    if (element.tagName !== 'IMG') {
        spotFixDebugLog('Expected IMG element for image highlight, got: ' + element.tagName);
        return;
    }
    element.classList.add('doboard_task_widget-image_selection');
}

/**
 * Highlight nested element by adding class
 * @param {Element} element
 */
function spotFixHighlightNestedElement(element) {
    element.classList.add('doboard_task_widget-element_selection');
}

/**
 * Highlight text in element with span wrapping
 * @param {Element} element
 * @param {Array} spots
 * @param widgetInstance
 */
function spotFixHighlightTextInElement(element, spots,widgetInstance) {
    let tooltipTitleText = '';
    if (spots[0].isFixed) {
        tooltipTitleText = `This issue already fixed.`;
    } else {
        tooltipTitleText = `We are already working on this issue.`;
    }

    const tooltip = `<div class="doboard_task_widget-text_selection_tooltip_element">
                            <span class="doboard_task_widget-text_selection_tooltip_icon"></span>
                            <span>
                                <div>${tooltipTitleText}</div>
                                <div>You can see history <span class="doboard_task_widget-see-task doboard_task_widget-see-task__task-id-${spots[0].taskId}">Here</span></div>
                            </span>
                        </div>`;

    const spotfixHighlightOpen = `<span class="doboard_task_widget-text_selection"><span class="doboard_task_widget-text_selection_tooltip">${tooltip}</span>`;
    const spotfixHighlightClose = `</span>`;

    let text = element.textContent;
    const spotSelectedText = spots[0].selectedText;

    // meta.selectedText can not be empty string
    if ( ! spotSelectedText ) {
        spotFixDebugLog('Provided metadata is invalid.');
        return;
    }

    const markers = [];

    // Mark positions for inserting
    spots.forEach(spot => {
        // Validating positions
        const startPos = parseInt(spot.startSelectPosition) || 0;
        const endPos = parseInt(spot.endSelectPosition) || 0;

        if (startPos < 0 || endPos > text.length || startPos > endPos) {
            spotFixDebugLog('Invalid text positions: ' + spot);
            return;
        }

        markers.push({ position: startPos, type: 'start' });
        markers.push({ position: endPos, type: 'end' });
    });

    if (markers.length === 0) return;

    // Sort markers backward
    markers.sort((a, b) => b.position - a.position);

    // Check here that element (from meta.nodePath) contains same inner text as in meta.selectedText
    // Is the `text` in the element equal to the selected text `spotSelectedText`
    if ( text.slice(markers[1].position, markers[0].position) !== spotSelectedText ) {
        spotFixDebugLog('It is not allow to highlight element by provided metadata.');
        return;
    }

    let result = text;
    markers.forEach(marker => {
        const insertText = marker.type === 'start'
            ? spotfixHighlightOpen
            : spotfixHighlightClose;

        result = result.slice(0, marker.position) + insertText + result.slice(marker.position);
    });

    // Safety HTML insert
    try {
        element.innerHTML = ksesFilter(result);
        document.querySelectorAll('.doboard_task_widget-see-task').forEach(link => {
            link.addEventListener('click', (e) => {

                e.preventDefault();
                const classList = link.className.split(' ');
                const idClass = classList.find(cls => cls.includes('__task-id-'));
                let taskId = null;
                if (idClass) {
                    taskId = idClass.split('__task-id-')[1];
                }
                if (taskId) {
                    widgetInstance.currentActiveTaskId = taskId;
                    widgetInstance.showOneTask();
                }
            });
        });
    } catch (error) {
        spotFixDebugLog('Error updating element content: ' + error);
    }
}

/**
 * Scroll to an element by tag, class, and text content
 * @param {array} path - The path to the element
 * @return {boolean} - True if the element was found and scrolled to, false otherwise
 */
function spotFixScrollToNodePath(path) {
    const node = spotFixRetrieveNodeFromPath(path);
    if (node && node.scrollIntoView) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
    }
    return false;
}

function spotFixRemoveHighlights() {
    const textSelectionclassName = 'doboard_task_widget-text_selection';
    const spans = document.querySelectorAll('.' + textSelectionclassName);
    const affectedParents = new Set(); // Track unique parents

    spans.forEach(span => {
        const parent = span.parentNode;
        affectedParents.add(parent); // Mark parent as affected
        const tooltip = span.querySelector('.doboard_task_widget-text_selection_tooltip');
        if (tooltip) tooltip.remove();

        // Move all child nodes out of the span and into the parent
        while (span.firstChild) {
            parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
    });

    // Normalize all affected parents to merge adjacent text nodes
    affectedParents.forEach(parent => parent.normalize());

    const elementSelectionClassName = 'doboard_task_widget-element_selection';
    const elements = document.querySelectorAll(`.${elementSelectionClassName}`);
    elements.forEach(element => {
        element.classList.remove(elementSelectionClassName);
    });
    const imageSelectionClassName = 'doboard_task_widget-image_selection';
    const images = document.querySelectorAll(`.${imageSelectionClassName}`);
    images.forEach(element => {
        element.classList.remove(imageSelectionClassName);
    });
}

/**
 * Validate nodePath as array of indices
 * @param {Array} nodePath
 * @returns {boolean}
 */
function spotFixIsValidNodePath(nodePath) {
    if (!Array.isArray(nodePath)) return false;
    if (nodePath.length === 0) return false;

    return nodePath.every(index => {
        return Number.isInteger(index) && index >= 0 && index < 1000;
    });
}

/**
 * Try to find selected image in selection.
 * @param selection
 * @returns {Node|*|null}
 */
function spotFixGetSelectedImage(selection) {

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return null;
    }

    const range = selection.getRangeAt(0);

    // Is current end container IMG
    if (range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.ELEMENT_NODE &&
        range.startContainer.tagName === 'IMG') {
        return range.startContainer;
    }

    // Get img in the range
    const walker = document.createTreeWalker(
        range.commonAncestorContainer,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: function(node) {
                return node.tagName === 'IMG' &&
                spotFixIsElementInRange(node, range) ?
                    NodeFilter.FILTER_ACCEPT :
                    NodeFilter.FILTER_REJECT;
            }
        }
    );

    let imgNode = walker.nextNode();
    if (imgNode) {
        return imgNode;
    }

    // start/end containers
    const startElement = spotFixGetElementFromNode(range.startContainer);
    const endElement = spotFixGetElementFromNode(range.endContainer);

    // If selection starts on image
    if (startElement && startElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(startElement, range)) {
        return startElement;
    }

    if (endElement && endElement.tagName === 'IMG' &&
        spotFixIsElementPartiallySelected(endElement, range)) {
        return endElement;
    }

    // 4. Get closest IMG
    const nearbyElements = spotFixFindNearbyElements(range);
    for (const element of nearbyElements) {
        if (element.tagName === 'IMG') {
            return element;
        }
    }

    return null;
}

function spotFixIsElementInRange(element, range) {
    const elementRange = document.createRange();
    elementRange.selectNode(element);
    return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
}

function spotFixIsElementPartiallySelected(element, range) {
    const elementRect = element.getBoundingClientRect();
    const rangeRect = range.getBoundingClientRect();

    //  bounding rectangles is crossed
    return !(elementRect.right < rangeRect.left ||
        elementRect.left > rangeRect.right ||
        elementRect.bottom < rangeRect.top ||
        elementRect.top > rangeRect.bottom);
}

function spotFixGetElementFromNode(node) {
    return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
}

/**
 * Find nearby elements in the range.
 * @param range
 * @returns {*[]}
 */
function spotFixFindNearbyElements(range) {
    const elements = [];
    const container = range.commonAncestorContainer;

    // search elements
    const previousElement = container.previousElementSibling;
    const nextElement = container.nextElementSibling;

    if (previousElement) {
        elements.push(previousElement);
    }
    if (nextElement) {
        elements.push(nextElement);
    }

    // Also check child container
    if (container.nodeType === Node.ELEMENT_NODE) {
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            if (spotFixIsElementPartiallySelected(children[i], range)) {
                elements.push(children[i]);
            }
        }
    }

    return elements;
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function spotFixCalculateNodePath(node) {
    let path = [];
    while (node) {
        let index = 0;
        let sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === 1) {
                index++;
            }
            sibling = sibling.previousSibling;
        }
        path.unshift(index);
        node = node.parentNode;
    }

    // Hard fix - need to remove first element to work correctly
    path.shift();

    return path;
}

/**
 * Retrieve a DOM node from a path
 *
 * @param {int[]} path
 * @return {*|null}
 */
function spotFixRetrieveNodeFromPath(path) {
    // @ToDo check if the path is correct
    if ( ! path ) {
        return null;
    }

    let node = document;
    for (let i = 0; i < path.length; i++) {
        node = node.children[path[i]];
        if ( ! node ) {
            return null;
        }
    }
    return node;
}
