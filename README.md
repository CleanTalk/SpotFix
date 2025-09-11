# SpotFix Widget for WordPress

## Description
SpotFix Widget is a WordPress widget that allows you to create and manage tasks directly from your website. The widget integrates with your theme and automatically uses the current theme path to load the required resources.

## Installation

### 1. Copy the files
Copy the `spotfix` folder to the root of your WordPress site

### 2. Enqueue scripts and styles
Make sure the following code is added to the `functions.php` file of your theme to enqueue the scripts and styles:

```php
add_action( 'wp_enqueue_scripts', 'connecting_spotfix' );
function connecting_spotfix(){
    wp_enqueue_style( 'spotfix-style', '/spotfix/styles/doboard-widget.css');
	$script_src = add_query_arg(array(
		'projectToken' => 'YOUR PROJECT TOKEN',
		'projectId' => 'YOUR PROJECT ID',
		'accountId' => 'YOUR ACCOUNT ID',
	), '/spotfix/js/doboard-widget-bundle.min.js');
	wp_enqueue_script(
		'spotfix-script',
		$script_src,
		array(),
		'1.3.0',
		true
	);
    wp_localize_script('spotfix-script', 'themeData', array(
        'themeUrl' => get_template_directory_uri(),
    ));
}

add_filter('style_loader_tag', function($html, $handle) {
	if ($handle === 'spotfix-style') {
		$html = str_replace("rel='stylesheet'", "rel='preload' as='style' onload=\"this.rel='stylesheet'\"", $html);
	}
	return $html;
}, 10, 2);

add_filter('script_loader_tag', function($tag, $handle) {
	if ($handle === 'spotfix-script') {
		$tag = str_replace(' src', ' defer src', $tag);
	}
	return $tag;
}, 10, 2);
```

### 3. Usage
The widget is automatically displayed on the page and allows you to create tasks.
To modify the widget's behavior, use the methods of the CleanTalkWidgetDoboard class.

### 4. Requirements
WordPress: 5.0 or higher.
WordPress Theme: Must support custom script and style enqueuing.

### Support
If you have any questions or issues, contact the developer or create an issue in the project repository.