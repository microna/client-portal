<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'SCWORDPRESS-3137376f81');

/** MySQL database username */
define('DB_USER', 'SCWORDPRESS-3137376f81');

/** MySQL database password */
define('DB_PASSWORD', '6ec73c5094dd1959');

/** MySQL hostname */
define('DB_HOST', 'wordpressdb-n.hosting.stackcp.net');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'JsQIhs+yUh9hM8BUKx8mIi3XouVhIklI');
define('SECURE_AUTH_KEY',  'vC/kiqofAhzNFgX/m8RkAE4mUOA25l9u');
define('LOGGED_IN_KEY',    'GomtFdavYvQXw10fUU17kajxcRte26k4');
define('NONCE_KEY',        '+wTS4YMhZzxSgbYX/Xww5a+8PLmcph6y');
define('AUTH_SALT',        '5jcW31057/+WH5h8eGYslSIkMx754vuc');
define('SECURE_AUTH_SALT', 'yN54cbvVuN56RqEseJLhF4KX47W/j4gr');
define('LOGGED_IN_SALT',   'cF7R4Dw1XESGSkKs9e+WjZGvGLgeFOlc');
define('NONCE_SALT',       'tHGF7Na1llpkoZrheIYDV3n8lhRbfwHt');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'd2_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');


@ini_set( 'upload_max_filesize' , '512M' );
@ini_set( 'post_max_size', '512M');
@ini_set( 'memory_limit', '256M' );
@ini_set( 'max_execution_time', '300' );
@ini_set( 'max_input_time', '300' );
