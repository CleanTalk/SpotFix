# SpotFix Widget for WordPress

## Description
SpotFix Widget is a WordPress widget that allows you to create and manage tasks directly from your website. The widget integrates with your theme and automatically uses the current theme path to load the required resources.

## Installation

### 1. Copy the widget code snippet
Please, Follow the DoBoard project, call the project settings (drop-down menu at the right of the project title), select `SpotFix` setting. Enable SpotFix and copy the code snippet from `Generate SpotFix Code` section

### 2. Enqueue scripts and styles
Make sure the following code is added to the `functions.php` file of your theme to enqueue the script. For example:

```php
function spotfix_connecting_wrapper() {
	?>
	<script id="spotfix-script-wrapper">
        (function () {
            let apbctScript = document.createElement('script');
            apbctScript.type = 'text/javascript';
            apbctScript.async = 'true';
            apbctScript.type = 'application/javascript';
            apbctScript.src = 'https://cdn.jsdelivr.net/gh/CleanTalk/SpotFix@dev/dist/doboard-widget-bundle.js?projectToken=PROJECT_TOKEN&projectId=PROJECT_ID&accountId=ACCOUNT_ID';
            apbctScript.onerror = function() {
                console.error('Failed to load SpotFix script');
            };
            let firstScriptNode = document.getElementsByTagName('script')[0];
            firstScriptNode.parentNode.insertBefore(apbctScript, firstScriptNode);
        })();
	</script>
	<?php
}
add_action('wp_footer', 'spotfix_connecting_wrapper');
```

### 3. Usage
The widget is automatically displayed on the page and allows you to create tasks.
To modify the widget's behavior, use the methods of the CleanTalkWidgetDoboard class.

### 4. Requirements
WordPress: 5.0 or higher.
WordPress Theme: Must support custom script and style enqueuing.

### Support
If you have any questions or issues, contact the developer or create an issue in the project repository.
