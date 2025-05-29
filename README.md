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
    wp_enqueue_script(
        'spotfix-script', 
        '/spotfix/js/doboard-widget-bundle.min.js',
        array(),
        '1.3.0',
        true
    );
    wp_localize_script('spotfix-script', 'themeData', array(
        'themeUrl' => get_template_directory_uri(),
    ));
}
```

### 3. Usage
The widget is automatically displayed on the page and allows you to create tasks.
To modify the widget's behavior, use the methods of the CleanTalkWidgetDoboard class.

### 4. Requirements
WordPress: 5.0 or higher.
WordPress Theme: Must support custom script and style enqueuing.

### Support
If you have any questions or issues, contact the developer or create an issue in the project repository.