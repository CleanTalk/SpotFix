/**
 * Try to find selected image in selection.
 * @param selection
 * @returns {Node|*|null}
 */
function getSelectedImage(selection) {

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
                isElementInRange(node, range) ?
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
    const startElement = getElementFromNode(range.startContainer);
    const endElement = getElementFromNode(range.endContainer);

    // If selection starts on image
    if (startElement && startElement.tagName === 'IMG' &&
        isElementPartiallySelected(startElement, range)) {
        return startElement;
    }

    if (endElement && endElement.tagName === 'IMG' &&
        isElementPartiallySelected(endElement, range)) {
        return endElement;
    }

    // 4. Get closest IMG
    const nearbyElements = findNearbyElements(range);
    for (const element of nearbyElements) {
        if (element.tagName === 'IMG') {
            return element;
        }
    }

    return null;
}


function isElementInRange(element, range) {
    const elementRange = document.createRange();
    elementRange.selectNode(element);
    return range.compareBoundaryPoints(Range.START_TO_START, elementRange) <= 0 &&
        range.compareBoundaryPoints(Range.END_TO_END, elementRange) >= 0;
}

function isElementPartiallySelected(element, range) {
    const elementRect = element.getBoundingClientRect();
    const rangeRect = range.getBoundingClientRect();

    //  bounding rectangles is crossed
    return !(elementRect.right < rangeRect.left ||
        elementRect.left > rangeRect.right ||
        elementRect.bottom < rangeRect.top ||
        elementRect.top > rangeRect.bottom);
}

function getElementFromNode(node) {
    return node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
}

/**
 * Find nearby elements in the range.
 * @param range
 * @returns {*[]}
 */
function findNearbyElements(range) {
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
            if (isElementPartiallySelected(children[i], range)) {
                elements.push(children[i]);
            }
        }
    }

    return elements;
}


/**
 * Extracts selection data from DOM Selection object
 * @param {Selection} selection - The DOM Selection object
 * @returns {Object} Selection data with text, positions, URL and node path
 */
function getSelectedData(selection) {
    const {
        anchorOffset,
        focusOffset,
    } = selection;

    let selectedText = selection.toString();
    let isTagOfImageType = false;
    const selectedImage = getSelectedImage(selection);
    const pageURL = window.location.href;

    if (!selectedText) {
        if (selectedImage === null) {
            return createEmptySelectionData(pageURL);
        } else {
            selectedText = `${selectedImage.tagName.toUpperCase()} ${selection.anchorNode.offsetHeight.toString()} * ${selection.anchorNode.offsetWidth.toString()}`
            isTagOfImageType = selectedImage.tagName;
        }
    }

    const isWholeTagSelected = anchorOffset === 0 &&
        focusOffset === 0 &&
        selectedText.length > 0;

    const targetNode = determineTargetNode(
        selection,
        isWholeTagSelected,
        isTagOfImageType,
        selectedImage
    );

    return {
        startSelectPosition: Math.min(anchorOffset, focusOffset),
        endSelectPosition: Math.max(anchorOffset, focusOffset),
        selectedText: selectedText,
        pageURL: pageURL,
        nodePath: calculateNodePath(targetNode),
        isTagOfImageType: isTagOfImageType,
        isWholeTagSelected: isWholeTagSelected
    };
}

/**
 * Determines the target node for path calculation
 * @param {Selection} selection - DOM Selection object
 * @param {boolean} isWholeTagSelected - is entire tag selected
 * @param {boolean} isTagOfImageType - is tag of image type
 * @param {Node|null} selectedImage - if predefined image node exists
 * @returns {Node} Target DOM node
 */
function determineTargetNode(selection, isWholeTagSelected = false,  isTagOfImageType = false, selectedImage = null) {
    const { focusNode, anchorNode } = selection;

    if (isWholeTagSelected) {
        return anchorNode.parentElement;
    }

    if (isTagOfImageType && selectedImage) {
        return selectedImage;
    }

    return focusNode.nodeName !== '#text' ? focusNode : focusNode.parentNode;
}

/**
 * Calculate the path of a DOM node
 *
 * @param {Node} node
 * @return {int[]}
 */
function calculateNodePath(node) {
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
function retrieveNodeFromPath(path) {
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

/**
 * Creates empty selection data object
 * @param {string} pageURL - Current page URL
 * @returns {Object} Empty selection data
 */
function createEmptySelectionData(pageURL) {
    return {
        startSelectPosition: 0,
        endSelectPosition: 0,
        selectedText: '',
        pageURL: pageURL,
        nodePath: '',
        isWholeTagSelected: false,
        isTagOfImageType: false,
    };
}
