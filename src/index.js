import {spotFixInit, spotFixSelectionOpen} from "./core/main.js";

if( document.readyState !== 'loading' ) {
    document.addEventListener('spotFixLoaded', spotFixInit);
} else {
    document.addEventListener('DOMContentLoaded', spotFixInit);
}

document.addEventListener('selectionchange', function(e) {
    spotFixSelectionOpen(e)
});
